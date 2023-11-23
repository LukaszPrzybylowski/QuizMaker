import { getLocaleDateTimeFormat } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup
  activityLog!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private serviceQuestion : QuestionService,
    private formBuilder: FormBuilder
  ){
    this.question = <Question>{};

    this.createForm();

    var id = +this.activatedRoute.snapshot.params["id"];

    this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");

    if(this.editMode){
    this.serviceQuestion.getQuestion(id).subscribe(result => {
        this.question = result;
        this.title = "Edit - " + this.question.text;
        this.updateForm();
      });
    }
    else{
      this.question.quizId = id;
      this.title = "Create a new Question";
    }
  }

  getFormControl(name : string){
    return this.form.get(name);
  }

  isValid(name : string){
    var e = this.getFormControl(name);
    return e && e.valid;
  }

  isChanged(name : string){
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched);
  }

  hasError(name : string){
    var e = this.getFormControl(name);
    return e && (e.dirty || e.touched) && !e.valid;
  }

  

  createForm(){
    this.form = this.formBuilder.group({
      text: ['', Validators.required]
    })

    this.activityLog = '';
    this.log("Form has been initialized.");

    this.form.valueChanges.subscribe(val => {
      if(!this.form.dirty){
        this.log("Form Model has been loaded.");
      }
      else{
        this.log("Form was updated by the user.");
      }
    });

    this.form.get("text")!.valueChanges.subscribe( val => {
      if(!this.form.dirty){
        this.log("Text control has been loaded with initial values.")
      }
      else{
        this.log("Text control was updated by the user.");
      }
    });
  }

  log(str: string){
    this.activityLog += "[" + new Date().toLocaleString() + ']' + str + "<br />";
  }

  updateForm(){
    this.form.setValue({
      text  : this.question.text,
    })
  }

  onBack(){
    this.router.navigate(["quiz/edit", this.question.quizId]);
  }

  onSubmit(){

    var tempQuestion = <Question>{};
    tempQuestion.text = this.form.value.text;
    tempQuestion.quizId = this.question.quizId;

    if(this.editMode){
      this.serviceQuestion.updateQuestion(tempQuestion).subscribe(res => {
        var v = res;
        console.log("Question " + v.id + " has been updated.");
        this.router.navigate(["quiz/edit", v.quizId]);
      });
    }
    else{
      this.serviceQuestion.createQuestion(tempQuestion).subscribe(res => {
        var v = res;
        console.log("Question " + v.id + " has been created.");
        this.router.navigate(["quiz/edit", v.quizId]);
      });
    }
  }
}
