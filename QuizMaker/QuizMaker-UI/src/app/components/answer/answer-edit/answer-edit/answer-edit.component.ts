import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Answer } from 'src/app/models/answer';
import { AnswerService } from 'src/app/services/answer/answer.service';


@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.css']
})
export class AnswerEditComponent {
  title!: string;
  answer!: Answer;
  editMode!: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private serviceAnswer: AnswerService)
    {
      this.answer = <Answer>{};
      var id = +this.activatedRoute.snapshot.params["id"];
      if(id){
        this.editMode = true;
        this.serviceAnswer.getAnswer(id).subscribe(result => {
          this.answer = result;
          this.title = "Edit - " + this.answer.text;
        });     
      }
      else{
        this.editMode = false;
        this.title = "Create a new Answer";
      }
    }

    onSubmit(answer: Answer){
      if(this.editMode){
        this.serviceAnswer.updateAnswer(answer).subscribe(result =>{
          var v = result;
          console.log("Answer " + v.id + " has been update.");
          this.router.navigate(["/question/edit", answer.questionId]);
        });
      }
      else{
        this.serviceAnswer.createAnswer(answer).subscribe(result =>{            
            var q = result;
            console.log("Answer " + q.id + "has been create.");
            this.router.navigate(["/question/edit", answer.questionId]);
          });
      }
    }

    onBack(){
      this.router.navigate(["quiz/edit", this.answer.quizId]);
    }
}
