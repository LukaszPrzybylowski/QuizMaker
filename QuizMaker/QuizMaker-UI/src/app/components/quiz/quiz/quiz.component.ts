import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quiz!: Quiz;

  constructor(
    private router: Router,
    private activeRout: ActivatedRoute,
    private quizService: QuizService
  )
  {
      var id = + this.activeRout.snapshot.params["id"];
      console.log(id);
      if(id){
        this.quizService.getQuiz(id).subscribe(result =>{
          this.quiz = result;
        })
      }
      else{
        console.log("Uncorrect Id - Back to Home")
        this.router.navigate(["/home"]);
      }
  }
}
