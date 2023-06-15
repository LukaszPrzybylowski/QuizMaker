using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        private readonly IQuizService _quizService;

        public QuizController(IQuizService quizService)
        {
            _quizService = quizService;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<QuizViewModel>> Get(int id)
        {
            var v = new QuizViewModel()
            {
                Id = id,
                Title = String.Format("Sample quiz with identity {0}", id),
                Description = "This is not real quiz - it is sample",
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now
            };

            return Ok(v);
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
            var result = await _quizService.Latest(num);

            return Ok(result);

        }

        [HttpGet("ByTitle/{num:int?}")]
        public async Task<ActionResult<List<QuizViewModel>>> ByTitle(int num = 10)
        {
            var sampleQuizzes = await _quizService.Latest(num);

            var sortedQuizzes = sampleQuizzes.OrderBy(x => x.Title).ToList();

            return Ok(sortedQuizzes);
        }

        [HttpGet("Random/{num:int?}")]
        public async Task<ActionResult<List<QuizViewModel>>> Random(int num = 10)
        {
            var sampleQuizzes = await _quizService.Latest(num);

            var randomQuizzes = sampleQuizzes.OrderBy(t => Guid.NewGuid()).ToList();

            return Ok(randomQuizzes);
        }
    }
}
