using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizMakerFree.ViewModels;

namespace QuizMakerFree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        [HttpGet("All/{questionId}")]
        public IActionResult All(int questionId) 
        {
            var sampleAnswers = new List<AnswerViewModel>();

            sampleAnswers.Add(new AnswerViewModel()
            {
                Id = 1,
                QuestionId= questionId,
                Text = "Friends and Family",
                CreatedDate= DateTime.Now,
                LastModifiedDate= DateTime.Now,
            });

            for(int i = 2; i <= 5; i++)
            {
                sampleAnswers.Add(new AnswerViewModel()
                {
                    Id = i,
                    QuestionId = questionId,
                    Text = String.Format("Sample Answers {0}", i),
                    CreatedDate = DateTime.Now,
                    LastModifiedDate = DateTime.Now,
                });
            }

            return Ok(sampleAnswers);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id) 
        {
            return Content("Not implemented yet!");
        }

        [HttpPut]
        public IActionResult Put(AnswerViewModel model)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult Post(AnswerViewModel model)
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
