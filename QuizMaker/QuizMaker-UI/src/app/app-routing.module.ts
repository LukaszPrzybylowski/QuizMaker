import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz/quiz.component';
import { AboutComponent } from './components/about/about/about.component';
import { LoginComponent } from './components/login/login/login.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound/pagenotfound.component';
import { QuizEditComponent } from './components/quiz/quiz-edit/quiz-edit/quiz-edit.component';
import { QuestionEditComponent } from './components/question/question-edit/question-edit/question-edit.component';
import { AnswerEditComponent } from './components/answer/answer-edit/answer-edit/answer-edit.component';
import { ResultEditComponent } from './components/result/result-edit/result-edit/result-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'quiz/create', component: QuizEditComponent}, 
  {path: 'quiz/edit/:id', component: QuizEditComponent},
  {path: 'quiz/:id', component: QuizComponent},
  {path: 'question/create/:id', component : QuestionEditComponent},
  {path: 'question/edit/:id', component : QuestionEditComponent},
  {path: 'answer/create/:id', component : AnswerEditComponent},
  {path: 'answer/edit/:id', component : AnswerEditComponent},
  {path: 'result/create/:id', component : ResultEditComponent},
  {path: 'result/edit/:id', component : ResultEditComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
