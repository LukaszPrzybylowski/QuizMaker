using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMaker.Controllers;
using QuizMaker.Model.Data;
using QuizMakerFree.ViewModels;
using static System.Net.Mime.MediaTypeNames;

namespace QuizMakerFree.Controllers
{
    [ApiController]
    public class ResultController : BaseApiController
    {
        public ResultController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration) : base(context, roleManager, userManager, configuration) { }

        [HttpGet("All/{quizId}")]
        public async Task<ActionResult<List<ResultViewModel>>> All(int quizId)
        {
            var results = DbContext.Results.Where(i => i.QuizId == quizId).ToArray();

            return Ok(results);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResultViewModel>> Get(int id)
        {
            var result = DbContext.Results.Where(i => i.Id == id).FirstOrDefault();

            if(result == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Result ID {0} has not been found", id)
                });
            }

            return Ok(result);
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<ResultViewModel>> Put(ResultViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            var result = model.Adapt<Result>();

            result.CreatedDate = DateTime.Now;
            result.LastModifiedDate = result.CreatedDate;

            DbContext.Results.Add(result);

            DbContext.SaveChanges();

            return Ok(result);

        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ResultViewModel>> Post(ResultViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            var result = DbContext.Results.Where(q => q.Id == model.Id).FirstOrDefault();
            
            if(result == null) 
            {
                return NotFound(new
                {
                    Error = String.Format("Result ID {0} has not been found", model.Id)
                });
            }

            result.QuizId = model.QuizId;
            result.Text = model.Text;
            result.MinValue = model.MinValue;
            result.MaxValue = model.MaxValue; 
            result.Notes = model.Notes;

            result.LastModifiedDate = DateTime.Now;

            DbContext.SaveChanges();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var result = DbContext.Results.Where(i => i.Id == id).FirstOrDefault();

            if (result == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Result ID {0} has not been found", id)
                });
            }

            DbContext.Results.Remove(result);

            DbContext.SaveChanges();

            return new NoContentResult();
        }
    }
}
