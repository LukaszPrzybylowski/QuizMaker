using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizMaker.Controllers;
using QuizMaker.Model.Data;
using QuizMakerFree.ViewModels;

namespace QuizMakerFree.Controllers
{
    [ApiController]
    public class AnswerController : BaseApiController
    {
        public AnswerController(ApplicationDbContext dbContext) : base(dbContext) { }

        [HttpGet("All/{questionId}")]
        public async Task<ActionResult<List<AnswerViewModel>>> All(int questionId) 
        {
            var answers = DbContext.Answers.Where(q => q.QuestionId == questionId).ToArray();

            return Ok(answers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AnswerViewModel>> Get(int id) 
        {
            var answer = DbContext.Answers.Where(i => i.Id == id).FirstOrDefault();

            if(answer == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Answer ID {0} has not been found", id)
                });
            }

            return Ok(answer);
        }

        [HttpPut]
        public async Task<ActionResult<AnswerViewModel>> Put(AnswerViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            var answer = model.Adapt<Answer>();

            answer.CreatedDate = DateTime.Now;
            answer.LastModifiedDate = answer.CreatedDate;

            DbContext.Answers.Add(answer);
            DbContext.SaveChanges();

            return Ok(answer);
        }

        [HttpPost]
        public async Task<ActionResult<AnswerViewModel>> Post(AnswerViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            var answer = DbContext.Answers.Where(i => i.Id == model.Id).FirstOrDefault();

            if(answer == null)
            {
                return NotFound(new
                {
                    Erorr = String.Format("Answer ID {0} has not been found", model.Id)
                });
            }

            answer.QuestionId = model.QuestionId;
            answer.Text = model.Text;
            answer.Value = model.Value;
            answer.Notes = model.Notes;
            
            answer.LastModifiedDate = DateTime.Now;

            DbContext.SaveChanges();

            return Ok(answer);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var answer = DbContext.Answers.Where(i => i.Id == id).FirstOrDefault();

            if(answer == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Answer ID {0} has not been found", id)
                });
            }

            DbContext.Answers.Remove(answer);
            DbContext.SaveChanges();

            return new NoContentResult();
        }
    }
}
