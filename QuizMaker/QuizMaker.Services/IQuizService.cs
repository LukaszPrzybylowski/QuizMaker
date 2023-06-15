using QuizMakerFree.ViewModels;

namespace QuizMaker.Services
{
    public interface IQuizService
    {
        Task<List<QuizViewModel>> Latest(int num);
    }
}