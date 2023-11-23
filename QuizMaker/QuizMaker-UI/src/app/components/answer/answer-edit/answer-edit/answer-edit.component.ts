import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private serviceAnswer: AnswerService,
    private formBuilder: FormBuilder)
    {
      this.answer = <Answer>{};
      this.createForm();
      var id = +this.activatedRoute.snapshot.params["id"];
      if(id){
        this.editMode = true;
        this.serviceAnswer.getAnswer(id).subscribe(result => {
          this.answer = result;
          this.title = "Edit - " + this.answer.text;
          this.updateForm();
        });     
      }
      else{
        this.editMode = false;
        this.title = "Create a new Answer";
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
        text : ['' , Validators.required],
        value: ['', [Validators.required,
                  Validators.min(-5),
                  Validators.max(5)]]
      });
    }

    updateForm(){
      this.form.setValue({
        text : this.answer.text,
        value : this.answer.value
      })
    }

    onSubmit(){

      var tempAnswer = <Answer>{};
      tempAnswer.text = this.form.value.text;
      tempAnswer.value = this.form.value.value;
      tempAnswer.quizId = this.answer.quizId;

      if(this.editMode){
        this.serviceAnswer.updateAnswer(tempAnswer).subscribe(result =>{
          var v = result;
          console.log("Answer " + v.id + " has been update.");
          this.router.navigate(["/question/edit", tempAnswer.questionId]);
        });
      }
      else{
        this.serviceAnswer.createAnswer(tempAnswer).subscribe(result =>{            
            var q = result;
            console.log("Answer " + q.id + "has been create.");
            this.router.navigate(["/question/edit", tempAnswer.questionId]);
          });
      }
    }

    onBack(){
      this.router.navigate(["question/edit", this.answer.questionId]);
    }
}
