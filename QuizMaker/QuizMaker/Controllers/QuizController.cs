using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QuizMakerFree.ViewModels;
using System.Collections.Generic;
using System.Linq;

namespace QuizMakerFree.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {

        [HttpGet("{id}")]
        public IActionResult Get(int id) 
        {
            var v = new QuizViewModel()
            {
                Id= id,
                Title = String.Format("Sample quiz with identity {0}", id),
                Description = "This is not real quiz - it is sample",
                CreatedDate= DateTime.Now,
                LastModifiedDate= DateTime.Now
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
        public IActionResult Latest(int num = 10) 
        {
            var sampleQuizzes = new List<QuizViewModel>();

            sampleQuizzes.Add(new QuizViewModel()
            {
                Id = 1,
                Title = "Which character from Shingeki No Kyojin are You?",
                Description = "Anime-based personality test",
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now,
            });

            for (int i = 2; i <= num; i++)
            {
                sampleQuizzes.Add(new QuizViewModel()
                {
                    Id = i,
                    Title = String.Format("Sample Quiz {0}", i),
                    Description = "This is sample Quiz",
                    CreatedDate = DateTime.Now,
                    LastModifiedDate = DateTime.Now
                });
            }

            return Ok(sampleQuizzes);
        }

        [HttpGet("ByTitle/{num:int?}")]
        public IActionResult ByTitle(int num = 10) 
        {
            var sampleQuizzes = new JsonSerializer();
            
            var result = sampleQuizzes.Deserialize<List<QuizViewModel>>(new JsonReader(new StringReader(Latest(num).ToString()))
            return Ok(
                sampleQuizzes.OrderBy(t => t.Title));
        }

        [HttpGet("Random/{num:int?}")]
        public IActionResult Random(int num = 10)
        {
            var sampleQuizzes = ((JsonResult)Latest(num)).Value as List<QuizViewModel>;

            return new JsonResult(
                sampleQuizzes.OrderBy(t => Guid.NewGuid()),
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented,
                });
        }
    }
}
