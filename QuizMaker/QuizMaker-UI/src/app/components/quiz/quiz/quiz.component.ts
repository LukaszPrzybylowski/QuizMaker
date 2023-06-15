import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quiz!: Quiz;

  constructor(
    private rout: Router,
    private activeRout: ActivatedRoute,
    private http: HttpClient
  )
  {
      var id = + this.activeRout.snapshot.params["id"];
      console.log(id);
      if(id){

      }
      else{
        console.log("Uncorrect Id - Back to Home")
        this.rout.navigate(["/home"]);
      }
  }
}
