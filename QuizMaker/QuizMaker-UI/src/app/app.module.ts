import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { QuizComponent } from './components/quiz/quiz/quiz.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about/about.component';
import { LoginComponent } from './components/login/login/login.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound/pagenotfound.component';
import { NavMenuComponent } from './components/navmenu/nav-menu/nav-menu.component';
import { QuizEditComponent } from './components/quiz/quiz-edit/quiz-edit/quiz-edit.component';
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { QuestionEditComponent } from './components/question/question-edit/question-edit/question-edit.component';
import { AnswerListComponent } from './components/answer/answer-list/answer-list.component';
import { AnswerEditComponent } from './components/answer/answer-edit/answer-edit/answer-edit.component';
import { ResultListComponent } from './components/result/result-list/result-list/result-list.component';
import { ResultEditComponent } from './components/result/result-edit/result-edit/result-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavMenuComponent,
    QuizEditComponent,
    QuestionListComponent,
    QuestionEditComponent,
    AnswerListComponent,
    AnswerEditComponent,
    ResultListComponent,
    ResultEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
