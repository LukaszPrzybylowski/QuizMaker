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
                case "password":
                    return await GetToken(model);
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

                DateTime now = DateTime.UtcNow;

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString())
                };

                var tokenExpirationMins = Configuration.GetValue<int>("Auth:Jwt:TokenExpirationInMinutes");
                var issuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Auth:Jwt:Key"]));

                var token = new JwtSecurityToken(issuer: Configuration["Auth:Jwt:Issuer"],
                                                  audience: Configuration["Auth:Jwt:Audience"],
                                                  claims: claims,
                                                  notBefore: now,
                                                  expires: now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                                                  signingCredentials: new SigningCredentials(issuerSigningKey, SecurityAlgorithms.HmacSha256)
                                                  );
                var encodeToken = new JwtSecurityTokenHandler().WriteToken(token);

                var response = new TokenResponseViewModel()
                {
                    Token = encodeToken,
                    Expiration = tokenExpirationMins
                };

                return response;
            }
            catch (Exception ex)
            {
                return new UnauthorizedResult();
            }
        }
    }

}
