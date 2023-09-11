using Microsoft.AspNetCore.Mvc;
using QuizMaker.Model.Data;

namespace QuizMaker.Controllers
{
    [Route("api/[controller]")]
    public class BaseApiController : Controller
    {
        public BaseApiController(ApplicationDbContext context)
        {
            DbContext = context;
        }

        protected ApplicationDbContext DbContext { get;  set; }
    }
}
