import { Component, Input, OnInit } from "@angular/core";
import { Quiz } from "../../models/quiz";
import { QuizService } from "src/app/services/quiz/quiz.service";
import { Router } from "@angular/router";

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

  constructor(
    public quizService: QuizService, 
    private router: Router)
    {}

  ngOnInit(){
 
    switch (this.class){
      case 'latest':
        default:
          this.title = "Newest Quizzes"
          this.quizService.getLatestQuiz().subscribe(result =>{
            this.quizzes = result;
          })
          break;
      case "byTitle":
          this.title = "Quizzes Alphabetically"
          this.quizService.getByTittleQuiz().subscribe(result =>{
            this.quizzes = result;
          })
          break;
      case "random":
          this.title = "Random Quizzes"
          this.quizService.getRandomQuiz().subscribe(result => {
            this.quizzes = result;
          })
          break;

    }
  }

  onSelect(quiz: Quiz) {
    this.selectedQuiz = quiz;
    console.log("Selected Id quiz" + this.selectedQuiz.id);
    this.router.navigate(["quiz", this.selectedQuiz.id]);
  }
}
