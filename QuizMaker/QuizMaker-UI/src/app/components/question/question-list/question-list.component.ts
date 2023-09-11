import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { QuestionService } from 'src/app/services/quiz/question/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnChanges{
  @Input() quiz!: Quiz;
  questions!: Question[];
  title!: string;

  constructor(
    private serviceQuestion : QuestionService,
    private router: Router
  ){
    this.questions = [];
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
    this.serviceQuestion.getAllQuestion(this.quiz.id).subscribe( result =>{
      this.questions = result;
    });
  }

  onCreate(){
    this.router.navigate(["/question/create", this.quiz.id]);
  }

  onEdit(question : Question){
    this.router.navigate(["/question/edit", question.id]);
  }

  onDelete(question : Question){
    if(confirm("Do you really want to delete this question?")) {
      this.serviceQuestion.deleteQuestion(question.id).subscribe( result =>{
        console.log("Question " + question.id + "has been deleted.")

        this.loadData();
      });
    }
  }
}
