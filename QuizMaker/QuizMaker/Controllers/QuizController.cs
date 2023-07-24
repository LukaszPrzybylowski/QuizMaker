using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QuizMaker.Model.Data;
using QuizMaker.Services;
using QuizMakerFree.ViewModels;
using System.Collections.Generic;
using System.Linq;

namespace QuizMakerFree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private ApplicationDbContext DbContext;

        public QuizController(ApplicationDbContext context)
        {
            DbContext = context;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<QuizViewModel>> Get(int id)
        {
            var quiz = DbContext.Quizzes.Where(x => x.Id == id).FirstOrDefault();

            return Ok(quiz);
        }

        [HttpPut]
        public IActionResult Put(QuizViewModel model)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult Post(QuizViewModel model)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            throw new NotImplementedException();
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
