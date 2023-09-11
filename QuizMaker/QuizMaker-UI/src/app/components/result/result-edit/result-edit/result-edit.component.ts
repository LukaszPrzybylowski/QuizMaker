import { Component } from '@angular/core';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private serviceResult : ResultService
  ){
    this.result = <Result>{};

    var id = +this.activatedRoute.snapshot.params["id"];

    this.editMode = (this.activatedRoute.snapshot.url[1].path === "edit");

    if(this.editMode){
    this.serviceResult.getResult(id).subscribe(res => {
        this.result = res;
        this.title = "Edit - " + this.result.text;
      });
    }
    else{
      this.result.quizId = id;
      this.title = "Create a new Result";
    }
  }

  onSubmit(result : Result){
    if(this.editMode){
      this.serviceResult.updateResult(result).subscribe(res => {
        var v = res;
        console.log("Result " + v.id + " has been updated.");
        this.router.navigate(["quiz/edit", v.quizId]);
      });
    }
    else{
      this.serviceResult.createResult(result).subscribe(res => {
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
