using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizMakerFree.ViewModels;
using static System.Net.Mime.MediaTypeNames;

namespace QuizMakerFree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultController : ControllerBase
    {
        [HttpGet("All/{quizId}")]
        public IActionResult All(int quizId)
        {
            var sampleResult = new List<ResultViewModel>();

            sampleResult.Add(new ResultViewModel()
            {
                Id = 1,
                QuizId= quizId,
                Text = "What do you value most in your life?",
                CreatedDate= DateTime.Now,
                LastModifiedDate= DateTime.Now
            });

            for(int i = 2; i <= 5; i++)
            {
                sampleResult.Add(new ResultViewModel()
                {
                    Id = i,
                    QuizId = quizId,
                    Text = String.Format("Sample Result {0}", 1),
                    CreatedDate = DateTime.Now,
                    LastModifiedDate = DateTime.Now
                });

            }

            return Ok(sampleResult);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Content("Not implemented yet!");
        }

        [HttpPut]
        public IActionResult Put(ResultViewModel model)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult Post(ResultViewModel model)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
