using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizMaker.Controllers;
using QuizMaker.Model.Data;
using QuizMakerFree.ViewModels;

namespace QuizMakerFree.Controllers
{
    [ApiController]
    public class QuestionController : BaseApiController
    {
        public QuestionController(ApplicationDbContext dbContext) : base(dbContext) { }

        [HttpGet("All/{quizId}")]
        public async Task<ActionResult<List<QuestionViewModel>>> All(int quizId) 
        {
            var questions = DbContext.Questions.Where(q => q.QuizId == quizId).ToArray();

            return Ok(questions);      
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionViewModel>> Get(int id)
        {
            var question = DbContext.Questions.Where(i => i.Id == id).FirstOrDefault();

            if(question == null) return NotFound(new
            {
                Error = String.Format("Question ID {0} has not been found", id)
            });

            return Ok(question);
        }

        [HttpPut]
        public async Task<ActionResult<QuestionViewModel>> Put(QuestionViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            var question = model.Adapt<Question>();

            question.CreatedDate= DateTime.Now;
            question.LastModifiedDate = question.CreatedDate;

            DbContext.Questions.Add(question);
            DbContext.SaveChanges();

            return Ok(question);
        }

        [HttpPost]
        public async Task<ActionResult<QuestionViewModel>> Post(QuestionViewModel model)
        {
            if(model == null) return new StatusCodeResult(500);

            var question = DbContext.Questions.Where(i => i.Id == model.Id).FirstOrDefault();

            if (question == null) return NotFound(new
            {
                Error = String.Format("Question ID {0} has not been found", model.Id)
            });

            question.QuizId = model.QuizId;
            question.Text = model.Text;
            question.Notes= model.Notes;

            question.LastModifiedDate= DateTime.Now;

            DbContext.SaveChanges();

            return Ok(question);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var question = DbContext.Questions.Where(i => i.Id == id).FirstOrDefault();

            if (question == null) return NotFound(new
            {
                Error = String.Format("Question ID {0} has not been found", id)
            });

            DbContext.Questions.Remove(question);
            DbContext.SaveChanges();

            return new NoContentResult();
        }
    }
}
