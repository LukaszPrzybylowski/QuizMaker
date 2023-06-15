using QuizMakerFree.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuizMaker.Services
{
    public class QuizService : IQuizService
    {
        public async Task<List<QuizViewModel>> Latest(int num)
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

            return sampleQuizzes;


        }
    }
}
