import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/app/models/result';
import { ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-result-edit',
  templateUrl: './result-edit.component.html',
  styleUrls: ['./result-edit.component.css']
})
export class ResultEditComponent {

  title!: string;
  result!: Result;
  editMode!: boolean;
  form !: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private serviceResult : ResultService,
    private formBuilder: FormBuilder
  ){
    this.result = <Result>{};

    var id = +this.activatedRoute.snapshot.params["id"];
    this.createForm();
    this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");

    if(this.editMode){
    this.serviceResult.getResult(id).subscribe(res => {
        this.result = res;
        this.title = "Edit - " + this.result.text;
        this.updateForm();
      });
    }
    else{
      this.result.quizId = id;
      this.title = "Create a new Result";
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
      minValue: ['', [Validators.pattern(/^\d*$/)]],
      maxValue: ['', [Validators.pattern(/^\d*$/)]]
    });
  }

  updateForm(){
    this.form.setValue({
      text : this.result.text,
      minValue : this.result.minValue,
      maxValue : this.result.maxValue
    })
  }

  onSubmit( ){
    var tempResult = <Result>{};
    tempResult.text = this.form.value.text;
    tempResult.minValue = this.form.value.minValue;
    tempResult.maxValue = this.form.value.maxValue;

    if(this.editMode){
      tempResult.quizId = this.result.quizId;
      this.serviceResult.updateResult(tempResult).subscribe(res => {
        var v = res;
        console.log("Result " + v.id + " has been updated.");
        this.router.navigate(["quiz/edit", v.quizId]);
      });
    }
    else{
      this.serviceResult.createResult(tempResult).subscribe(res => {
        var v = res;
        console.log("Result " + v.id + " has been created.");
        this.router.navigate(["quiz/edit", v.quizId]);
      });
    }
  }

  onBack(){
    this.router.navigate(["quiz/edit", this.result.quizId]);
  }
}
