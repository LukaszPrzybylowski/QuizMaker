import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { Result } from 'src/app/models/result';
import { QuestionService } from 'src/app/services/quiz/question/question.service';
import { ResultService } from 'src/app/services/result/result.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnChanges {
  @Input() quiz!: Quiz;
  results!: Result[];
  title!: string;

  constructor(
    private serviceResult : ResultService,
    private router: Router
  ){
    this.results = [];
  }

  ngOnChanges(changes: SimpleChanges){
    if(typeof changes['quiz'] !== "undefined"){

      var change = changes['quiz'];

      if(!change.isFirstChange()){
        this.loadData();
      }
    }
  }

  loadData(){
    this.serviceResult.getAllResults(this.quiz.id).subscribe( res =>{
      this.results = res;
    });
  }

  onCreate(){
    this.router.navigate(["/result/create", this.quiz.id]);
  }

  onEdit(result : Result){
    this.router.navigate(["/result/edit", result.id]);
  }

  onDelete(result : Result){
    if(confirm("Do you really want to delete this result?")) {
      this.serviceResult.deleteResult(result.id).subscribe( res =>{
        console.log("Result " + result.id + "has been deleted.")

        this.loadData();
      });
    }
  }
}
 