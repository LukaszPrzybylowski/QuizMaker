import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css']
})
export class QuizEditComponent {
  title!: string;
  public quiz!: Quiz;
  editMode!: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private quizService: QuizService)
    {
      var id = +this.activatedRoute.snapshot.params["id"];
      if(id){
        this.editMode = true;
        quizService.getQuiz(id).subscribe(result => {
          this.quiz = result;
          this.title = "Edit - " + this.quiz.title;
        }, error => console.error(error));     
      }
      else{
        this.editMode = false;
        this.title = "Create a new Quiz";
      }
    }

    onSubmit(quiz:Quiz){
      if(this.editMode){
        this.quizService.updateQuiz(quiz).subscribe(result =>{
          var v = result;
          console.log("Quiz " + v.id + " has been update.");
          this.router.navigate(["home"]);
        }, error => console.log(error));
      }
      else{
        this.quizService.createQuiz(quiz).subscribe(result =>{
            var q = result;
            console.log("Quiz " + q.id + "has been create.");
            this.router.navigate(["home"]);
          }, error => console.error(error));
      }
    }

    onBack(){
      this.router.navigate(["home"]);
    }
}
