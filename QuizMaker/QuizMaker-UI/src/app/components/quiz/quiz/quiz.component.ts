import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
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
    private quizService: QuizService,
    public authService: AuthServiceService
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
  
  onEdit(){
    this.router.navigate(["quiz/edit", this.quiz.id]);
  }
  
  onDelete(){
    if(confirm("Do you really want to delete this quiz?")) {
      this.quizService.deleteQuiz(this.quiz.id).subscribe(result => {
        console.log("Quiz " + this.quiz.id + " has been deleted.");
        this.router.navigate(['home'])
      });
    }
  }
}
