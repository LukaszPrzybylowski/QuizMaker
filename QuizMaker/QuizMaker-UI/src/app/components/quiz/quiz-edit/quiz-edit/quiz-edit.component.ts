import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css']
})
export class QuizEditComponent {
  title!: string;
  public quiz!: Quiz;
  editMode!: boolean;
  form !: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private formBuilder: FormBuilder)
    {
      this.quiz = <Quiz>{};
      this.createForm();
      var id = +this.activatedRoute.snapshot.params["id"];
      if(id){
        this.editMode = true;
        quizService.getQuiz(id).subscribe(result => {
          this.quiz = result;
          this.title = "Edit - " + this.quiz.title;
          this.updateForm();
        });     
      }
      else{
        this.editMode = false;
        this.title = "Create a new Quiz";
      }
    }

    createForm(){
      this.form = this.formBuilder.group({
        title: ['', Validators.required],
        description: '',
        text: ''
      })
    }

    updateForm(){
      this.form.setValue({
        title: this.quiz.title,
        description: this.quiz.description || '',
        text: this.quiz.text || ''
      })
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

    onSubmit(){

      var tempQuiz = <Quiz>{};
      tempQuiz.title = this.form.value.title;
      tempQuiz.description = this.form.value.description;
      tempQuiz.text = this.form.value.text;

      if(this.editMode){
        tempQuiz.id = this.quiz.id;
        this.quizService.updateQuiz(tempQuiz).subscribe(result =>{
          var v = result;
          console.log("Quiz " + v.id + " has been update.");
          this.router.navigate(["home"]);
        });
      }
      else{
        this.quizService.createQuiz(tempQuiz).subscribe(result =>{            
            var q = result;
            console.log("Quiz " + q.id + "has been create.");
            this.router.navigate(["home"]);
          });
      }
    }

    onBack(){
      this.router.navigate(["home"]);
    }
}
