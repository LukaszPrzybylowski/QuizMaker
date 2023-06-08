import { HttpClient } from "@angular/common/http";
import { Component, Inject, Input } from "@angular/core";
import { Quiz } from "../../interfaces/quiz";
import { QuizListService } from "src/app/services/quiz/quiz-list.service";

@Component({
  selector: "quiz-list",
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})

export class QuizListComponent {
  @Input() class!: string;
  title: string;
  selectedQuiz!: Quiz;
  quizzes!: Quiz[];
  quizListService!: QuizListService;
  result!: any;


  constructor(quizListService: QuizListService)
  {
    switch (this.class){
      case 'latest':
        default:
          this.title = "Newest Quizzes"
          this.result = this.quizListService.getLatestQuiz().subscribe(result =>{
            this.quizzes = result;
          }, error => console.error(error));
          break;
      case "byTitle":
          this.title = "Quizzes Alphabetically"
          this.result = this.quizListService.getLatestQuiz().subscribe(result =>{
            this.quizzes = result;
          }, error => console.error(error));
          break;
      case "byTitle":
          this.title = "Random Quizzes"
          url += "Random/"
          break;
    }

    this.result.sunscribe(result => {
      this.quizzes = result;
    }, error => console.error(error));
    ;
  }

  onSelect(quiz: Quiz) {
    this.selectedQuiz = quiz;
    console.log("Selected Id quiz" + this.selectedQuiz.id);
  }
}
