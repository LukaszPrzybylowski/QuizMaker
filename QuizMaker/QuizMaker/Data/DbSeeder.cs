using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.IdentityModel.Tokens;
using QuizMaker.Model.Data;
using System.Threading.Tasks;

namespace QuizMaker.Data
{
    public class DbSeeder
    {
        #region Metody publiczne
        public static void Seed(ApplicationDbContext dbContext, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
            {
            if (!dbContext.Users.Any()) CreateUsers(dbContext, roleManager, userManager).GetAwaiter().GetResult();

            if (!dbContext.Quizzes.Any()) CreateQuizzes(dbContext);
        }
        #endregion

        #region Metody generujące
        private static async Task CreateUsers(ApplicationDbContext dbContext, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            // zmienne lokalne
            DateTime createdDate = new DateTime(2016, 03, 01, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;

            string role_Administrator = "Administrator";
            string role_RegisteredUser = "RegisteredUser";

            if (!await roleManager.RoleExistsAsync(role_Administrator))
            {
                await roleManager.CreateAsync(new
                IdentityRole(role_Administrator));
            }
            if (!await roleManager.RoleExistsAsync(role_RegisteredUser))
            {
                await roleManager.CreateAsync(new
                IdentityRole(role_RegisteredUser));
            }

            var user_Admin = new ApplicationUser()
            {
                SecurityStamp= Guid.NewGuid().ToString(),
                UserName = "Admin",
                Email = "admin@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            if(await userManager.FindByNameAsync(user_Admin.UserName) == null)
            {
                await userManager.CreateAsync(user_Admin, "Pass4Admin");
                await userManager.AddToRoleAsync(user_Admin, role_RegisteredUser);
                await userManager.AddToRoleAsync(user_Admin, role_Administrator);

                user_Admin.EmailConfirmed= true;
                user_Admin.LockoutEnabled= false;
            }

#if DEBUG
            // Utwórz przykładowe konta zarejestrowanych użytkowników (jeśli jeszcze nie istnieją)
            var user_Ryan = new ApplicationUser()
            {
                SecurityStamp= Guid.NewGuid().ToString(),
                UserName = "Ryan",
                Email = "ryan@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            var user_Solice = new ApplicationUser()
            {
                SecurityStamp= Guid.NewGuid().ToString(),
                UserName = "Solice",
                Email = "solice@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            var user_Vodan = new ApplicationUser()
            {
                SecurityStamp= Guid.NewGuid().ToString(),
                UserName = "Vodan",
                Email = "vodan@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

           if(await userManager.FindByNameAsync(user_Ryan.UserName) == null)
            {
                await userManager.CreateAsync(user_Ryan, "Pass4Ryan");
                await userManager.AddToRoleAsync(user_Ryan, role_RegisteredUser);

                user_Ryan.EmailConfirmed= true;
                user_Ryan.LockoutEnabled= false;
            }
           if(await userManager.FindByNameAsync(user_Solice.UserName) == null)
            {
                await userManager.CreateAsync(user_Solice, "Pass4Solice");
                await userManager.AddToRoleAsync(user_Solice, role_RegisteredUser);

                user_Solice.EmailConfirmed = true;
                user_Solice.LockoutEnabled = false;
            }
            if (await userManager.FindByNameAsync(user_Vodan.UserName) == null)
            {
                await userManager.CreateAsync(user_Vodan, "Pass4Vodan");
                await userManager.AddToRoleAsync(user_Vodan, role_RegisteredUser);

                user_Vodan.EmailConfirmed = true;
                user_Vodan.LockoutEnabled = false;
            }

#endif
            await dbContext.SaveChangesAsync();
        }

        private static void CreateQuizzes(ApplicationDbContext dbContext)
        {
            
            DateTime createdDate = new DateTime(2017, 08, 08, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;

            var authorId = dbContext.Users
                .Where(u => u.UserName == "Admin")
                .FirstOrDefault()
                .Id;

#if DEBUG

            var num = 47;
            for (int i = 1; i <= num; i++)
            {
                CreateSampleQuiz(
                    dbContext,
                    i,
                    authorId,
                    num - i,
                    3,
                    3,
                    3,
                    createdDate.AddDays(-num));
            }
#endif

            // Utwórz jeszcze 3 quizy z lepszymi danymi opisowymi
            // (pytania, odpowiedzi i wyniki dodamy później)
            EntityEntry<Quiz> e1 = dbContext.Quizzes.Add(new Quiz()
            {
                UserId = authorId,
                Title = "Jesteś po Jasnej czy po Ciemnej stronie Mocy?",
                Description = "Test osobowości bazujący na Gwiezdnych wojnach",
                Text = @"Mądrze wybrać musisz, młody padawanie: " +
                        "ten test sprawdzi, czy twoja wola jest na tyle silna, " +
                        "aby pasować do zasad Jasnej strony Mocy, czy też " +
                        "jesteś skazany na skuszenie się na Ciemną stronę. " +
                        "Jeśli chcesz zostać prawdziwym JEDI, nie możesz pominąć takiej szansy!",
                ViewCount = 2343,
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            });

            EntityEntry<Quiz> e2 = dbContext.Quizzes.Add(new Quiz()
            {
                UserId = authorId,
                Title = "Pokolenie X, Y czy Z?",
                Description = "Dowiedz się, do której dekady najlepiej pasujesz",
                Text = @"Czy czujesz się dobrze w swoim pokoleniu? " +
                        "W którym roku powinieneś się urodzić?" +
                        "Oto kilka pytań, które pozwolą Ci się tego dowiedzieć!",
                ViewCount = 4180,
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            });

            EntityEntry<Quiz> e3 = dbContext.Quizzes.Add(new Quiz()
            {
                UserId = authorId,
                Title = "Którą postacią z Shingeki No Kyojin jesteś?",
                Description = "Test osobowości bazujący na Ataku tytanów",
                Text = @"Czy niestrudzenie szukasz zemsty jak Eren? " +
                        "Czy będziesz się narażać, aby chronić swoich przyjaciół jak Mikasa? " +
                        "Czy ufasz swoim umiejętnościom walki jak Levi, " +
                        "czy raczej wolisz polegać na strategiach i taktyce jak Arwin? " +
                        "Odkryj prawdziwego siebie dzięki temu testowi osobowości bazującemu na Ataku tytanów!",
                ViewCount = 5203,
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            });

            // Zapisz zmiany w bazie danych
            dbContext.SaveChanges();
        }
        #endregion

        #region Metody pomocnicze
        /// <summary>
        /// Tworzy przykładowy quiz i dodaje go do bazy danych
        /// razem z przykładowym zestawem pytań, odpowiedzi i wyników
        /// </summary>
        /// <param name="userId">identyfikator autora</param>
        /// <param name="id">identyfikator quizu</param>
        /// <param name="createdDate">data utworzenia quizu</param>
        private static void CreateSampleQuiz(
            ApplicationDbContext dbContext,
            int num,
            string authorId,
            int viewCount,
            int numberOfQuestions,
            int numberOfAnswersPerQuestion,
            int numberOfResults,
            DateTime createdDate)
        {
            var quiz = new Quiz()
            {
                UserId = authorId,
                Title = String.Format("Tytuł quizu {0}", num),
                Description = String.Format("To jest przykładowy opis quizu {0}.", num),
                Text = "To jest przykładowy quiz utworzony przez klasę DbSeeder w celach testowych. " +
                        "Wszystkie pytania, odpowiedzi i wyniki również zostały wygenerowane automatycznie.",
                ViewCount = viewCount,
                CreatedDate = createdDate,
                LastModifiedDate = createdDate
            };
            dbContext.Quizzes.Add(quiz);
            dbContext.SaveChanges();

            for (int i = 0; i < numberOfQuestions; i++)
            {
                var question = new Question()
                {
                    QuizId = quiz.Id,
                    Text = "To jest przykładowe pytanie utworzone przez klasę DbSeeder w celach testowych. " +
                        "Wszystkie odpowiedzi do pytania również są wygenerowane automatycznie.",
                    CreatedDate = createdDate,
                    LastModifiedDate = createdDate
                };
                dbContext.Questions.Add(question);
                dbContext.SaveChanges();

                for (int i2 = 0; i2 < numberOfAnswersPerQuestion; i2++)
                {
                    var e2 = dbContext.Answers.Add(new Answer()
                    {
                        QuestionId = question.Id,
                        Text = "To jest przykładowa odpowiedź utworzona przez klasę DbSeeder w celach testowych. ",
                        Value = i2,
                        CreatedDate = createdDate,
                        LastModifiedDate = createdDate
                    });
                }
            }

            for (int i = 0; i < numberOfResults; i++)
            {
                dbContext.Results.Add(new Result()
                {
                    QuizId = quiz.Id,
                    Text = "To jest przykładowy wynik utworzony przez klasę DbSeeder w celach testowych. ",
                    MinValue = 0,
                    MaxValue = numberOfAnswersPerQuestion * 2,
                    CreatedDate = createdDate,
                    LastModifiedDate = createdDate
                });
            }
            dbContext.SaveChanges();
        }
        #endregion
    }
}
