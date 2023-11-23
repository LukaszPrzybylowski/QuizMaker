using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QuizMaker.Controllers;
using QuizMaker.Model.Data;
using QuizMaker.Services;
using QuizMakerFree.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace QuizMakerFree.Controllers
{
    public class QuizController : BaseApiController
    {
        public QuizController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration) : base(context, roleManager, userManager, configuration) {}

        [HttpGet("{id}")]
        public async Task<ActionResult<QuizViewModel>> Get(int id)
        {
            var quiz = DbContext.Quizzes.Where(x => x.Id == id).FirstOrDefault();

            if(quiz == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Quiz ID {0} has not been found", id)
                });
            }

            return Ok(quiz);
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<QuizViewModel>> Put([FromBody]QuizViewModel model)
        {
            if (model == null) return new StatusCodeResult(510);

            var quiz = new Quiz();

            quiz.Title = model.Title;
            quiz.Description = model.Description;
            quiz.Text = model.Text;
            quiz.Notes = model.Notes;
            quiz.CreatedDate = DateTime.Now;
            quiz.LastModifiedDate = DateTime.Now;

            quiz.UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            DbContext.Quizzes.Add(quiz);
            DbContext.SaveChanges();

            return Ok(quiz);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<QuizViewModel>> Post([FromBody]QuizViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            var quiz = DbContext.Quizzes.Where(q => q.Id == model.Id).FirstOrDefault();

            if(quiz == null)
            {
                quiz = new Quiz();
                quiz.Title = model.Title;
                quiz.Description = model.Description;
                quiz.Text = model.Text;
                quiz.Notes = model.Notes;
                quiz.CreatedDate = DateTime.Now;
                quiz.LastModifiedDate = DateTime.Now;

                quiz.UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

                DbContext.Quizzes.Add(quiz);
                DbContext.SaveChanges();
            }
            else
            {
                quiz.Title = model.Title;
                quiz.Description = model.Description;
                quiz.Text = model.Text;
                quiz.Notes = model.Notes;

                quiz.LastModifiedDate = DateTime.Now;

                DbContext.SaveChanges();
            }

            return Ok(quiz);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<QuizViewModel>> Delete(int id)
        {
            var quiz = DbContext.Quizzes.Where(q => q.Id == id).FirstOrDefault();

            if (quiz == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Quiz ID {0} has not been found", id)
                });
            }

            DbContext.Quizzes.Remove(quiz);
            DbContext.SaveChanges();

            return new NoContentResult();
        }

        [HttpGet("Latest/{num?}")]
        public async Task<ActionResult<List<QuizViewModel>>> Latest(int num = 10)
        {
            var latest = DbContext.Quizzes.OrderByDescending(q => q.CreatedDate).Take(num).ToArray();

            return Ok(latest);

        }

        [HttpGet("ByTitle/{num:int?}")]
        public async Task<ActionResult<List<QuizViewModel>>> ByTitle(int num = 10)
        {
            var byTitle = DbContext.Quizzes.OrderBy(q => q.Title).Take(num).ToArray();

            return Ok(byTitle);
        }

        [HttpGet("Random/{num:int?}")]
        public async Task<ActionResult<List<QuizViewModel>>> Random(int num = 10)
        {
            var random = DbContext.Quizzes.OrderBy(q => Guid.NewGuid()).Take(num).ToArray();

            return Ok(random);
        }
    }
}
