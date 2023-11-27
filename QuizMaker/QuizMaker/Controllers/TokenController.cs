using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMaker.Model.Data;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;
using System;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using QuizMaker.Model.ViewModel;
using JwtRegisteredClaimNames = System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames;
using QuizMaker.Data.Migrations;
using QuizMaker.Data;
using System.Reflection.Metadata;

namespace QuizMaker.Controllers
{
    public class TokenController : BaseApiController
    {

        public TokenController(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration) : base(context, roleManager, userManager, configuration) { }

        [HttpPost("Auth")]
        public async Task<ActionResult<TokenResponseViewModel>> Auth([FromBody]TokenRequestViewModel model)
        {
            
            
            if (model == null) return new StatusCodeResult(500);

            switch (model.Grant_type)
            {
                case "Password":
                    return await GetToken(model);
                case "Refresh_Token":
                    return await RefreshToken(model);
                default:
                    return new UnauthorizedResult();
            }
        }

        private async Task<ActionResult<TokenResponseViewModel>> GetToken(TokenRequestViewModel model)
        {
            try
            {
                var user = await UserManager.FindByNameAsync(model.Username);

                if (user == null && model.Username.Contains('@'))
                {
                    user = await UserManager.FindByEmailAsync(model.Username);
                }

                if (user == null || !await UserManager.CheckPasswordAsync(user, model.Password))
                {
                    return new UnauthorizedResult();
                }

                var rt = CreateRefreshToken(model.Client_Id, user.Id);

                DbContext.Tokens.Add(rt);
                DbContext.SaveChanges();

                var t = CreateAccessToken(user.Id, rt.Value);


                return t;
            }
            catch (Exception ex)
            {
                return new UnauthorizedResult();
            }
        }

        private async Task<ActionResult> RefreshToken(TokenRequestViewModel model)
        {
            try
            {
                var rt = DbContext.Tokens.FirstOrDefault(t => t.ClientId == model.Client_Id
                    && t.Value == model.Refresh_Token);

                if(rt == null)
                {
                    return new UnauthorizedResult();
                }

                var user = await UserManager.FindByIdAsync(rt.UserId);

                if(user == null)
                {
                    return new UnauthorizedResult();
                }

                var rtNew = CreateRefreshToken(rt.ClientId, rt.UserId);

                DbContext.Tokens.Remove(rt);

                DbContext.Tokens.Add(rtNew);

                DbContext.SaveChanges();

                var response = CreateAccessToken(rtNew.UserId, rtNew.Value);

                return response;
            }
            catch (Exception ex)
            {
                return new UnauthorizedResult();
            }
        }

        private Token CreateRefreshToken(string clientId, string userId)
        {
            return new Token()
            {
                ClientId = clientId,
                UserId = userId,
                Type = 0,
                Value = Guid.NewGuid().ToString("N"),
                CreatedDate = DateTime.UtcNow,
            };
        }

        private TokenResponseViewModel CreateAccessToken(string userId, string refreshToken)
        {
            DateTime now = DateTime.UtcNow;

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString())
            };

            var tokenExpirationMins = Configuration.GetValue<int>("Auth:Jwt:TokenExpirationInMinutes");
            var issuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Auth:Jwt:Key"]));

            var token = new JwtSecurityToken(
                issuer: Configuration["Auth:Jwt:Issuer"],
                audience: Configuration["Auth:Jwt:Audience"],
                claims: claims,
                notBefore: now,
                expires: now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                signingCredentials: new SigningCredentials(issuerSigningKey, SecurityAlgorithms.HmacSha256));

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return new TokenResponseViewModel()
            {
                Token = encodedToken,
                Expiration = tokenExpirationMins,
                Refresh_Token = refreshToken,
            };
        }
    }

}
