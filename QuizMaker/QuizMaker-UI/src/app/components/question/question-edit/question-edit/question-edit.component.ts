import { getLocaleDateTimeFormat } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/quiz/question/question.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent {
  title!: string;
  question!: Question;
  editMode!: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private serviceQuestion : QuestionService
  ){
    this.question = <Question>{};

    var id = +this.activatedRoute.snapshot.params["id"];

    this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");

    if(this.editMode){
    this.serviceQuestion.getQuestion(id).subscribe(result => {
        this.question = result;
        this.title = "Edit - " + this.question.text;
      });
    }
    else{
      this.question.quizId = id;
      this.title = "Create a new Question";
    }
  }

  onSubmit(question : Question){
    if(this.editMode){
      this.serviceQuestion.updateQuestion(question).subscribe(res => {
        var v = res;
        console.log("Question " + v.id + " has been updated.");
        this.router.navigate(["quiz/edit", v.quizId]);
      });
    }
    else{
      this.serviceQuestion.createQuestion(question).subscribe(res => {
        var v = res;
        console.log("Question " + v.id + " has been created.");
        this.router.navigate(["quiz/edit", v.quizId]);
      });
    }
  }

  onBack(){
    this.router.navigate(["quiz/edit", this.question.quizId]);
  }
}
