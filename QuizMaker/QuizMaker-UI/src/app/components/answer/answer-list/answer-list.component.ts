import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Answer } from 'src/app/models/answer';
import { Question } from 'src/app/models/question';
import { AnswerService } from 'src/app/services/answer/answer.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent  implements OnChanges{
  @Input() question!: Question;
  answers !: Answer[];
  title !: string; 

  constructor(
    private router : Router,
    private serviceAnswer: AnswerService
  ){
    this.answers = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(typeof changes[`question`] !== "undefined"){
      var change = changes[`question`];

      if(!change.isFirstChange()){
        this.loadData();
      }
    }
  }

  loadData(){
    this.serviceAnswer.getAllAnswer(this.question.id).subscribe(result =>{
      this.answers = result;
    })
  }

  onCreate(){
    this.router.navigate(["/answer/create", this.question.id]);
  }

  onEdit(answer: Answer){
    this.router.navigate(["/answer/edit", answer.id]);
  }

  onDelete(answer: Answer){
    if(confirm("Do you really want to delete this answer?")){
      this.serviceAnswer.deleteAnswer(answer.id).subscribe(res => {
        console.log("Answer " + answer.id + " has been deleted.")
        this.loadData();
      })
    }
  }
}
