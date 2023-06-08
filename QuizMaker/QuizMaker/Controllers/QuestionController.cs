using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizMakerFree.ViewModels;

namespace QuizMakerFree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {

        [HttpGet("All/{quizId}")]
        public IActionResult All(int quizId) 
        {
            var sampleQuestions = new List<QuestionViewModel>();

            sampleQuestions.Add(new QuestionViewModel()
            {
                Id = 1,
                QuizId = quizId,
                Text = "What do you value most in your life?",
                CreatedDate= DateTime.Now,
                LastModifiedDate= DateTime.Now,
            });

            for(int i = 2; i < 5; i++)
            {
                sampleQuestions.Add(new QuestionViewModel()
                {
                    Id = i,
                    QuizId = quizId,
                    Text = String.Format("Sample Question {0}", i),
                    CreatedDate = DateTime.Now,
                    LastModifiedDate = DateTime.Now,
                });
            }

            return Ok(sampleQuestions);
            
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Content("Not implemented yet!");
        }

        [HttpPut]
        public IActionResult Put(QuestionViewModel model)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult Post(QuestionViewModel model)
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
