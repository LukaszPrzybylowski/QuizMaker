using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizMaker.Model.Data;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace QuizMaker.Controllers
{
    [Route("api/[controller]")]
    public class BaseApiController : Controller
    {
        public BaseApiController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManger,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration)
        {
            DbContext = context;
            RoleManager = roleManger;
            UserManager = userManager;
            Configuration = configuration;

            JsonSettings = new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented,
            };
        }

        protected JsonSerializerSettings JsonSettings { get; private set;}
        protected RoleManager<IdentityRole> RoleManager { get; private set;}
        protected UserManager<ApplicationUser> UserManager { get; private set;}

        protected IConfiguration Configuration { get; private set;}

        protected ApplicationDbContext DbContext { get;  set; }
    }
}
