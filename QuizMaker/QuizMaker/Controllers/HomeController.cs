using Microsoft.AspNetCore.Mvc;

namespace QuizMaker.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
