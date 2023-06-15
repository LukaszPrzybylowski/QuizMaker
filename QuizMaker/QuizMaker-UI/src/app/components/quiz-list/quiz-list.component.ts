import { HttpClient } from "@angular/common/http";
import { Component, Inject, Input, OnInit } from "@angular/core";
import { Quiz } from "../../models/quiz";
import { QuizListService } from "src/app/services/quiz/quiz.service";

@Component({
  selector: "quiz-list",
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})

export class QuizListComponent implements OnInit {
  @Input() class!: string;
  title!: string;
  selectedQuiz!: Quiz;
  quizzes!: Quiz[];

  constructor(public quizListService: QuizListService){}

  ngOnInit(){
 
    switch (this.class){
      case 'latest':
        default:
          this.title = "Newest Quizzes"
          this.quizListService.getLatestQuiz().subscribe(result =>{
            this.quizzes = result;
          })
          break;
      case "byTitle":
          this.title = "Quizzes Alphabetically"
          this.quizListService.getByTittleQuiz().subscribe(result =>{
            this.quizzes = result;
          })
          break;
      case "random":
          this.title = "Random Quizzes"
          this.quizListService.getRandomQuiz().subscribe(result => {
            this.quizzes = result;
          })
          break;

    }
  }

  onSelect(quiz: Quiz) {
    this.selectedQuiz = quiz;
    console.log("Selected Id quiz" + this.selectedQuiz.id);
  }
}
