import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { QuizSearchComponent } from './components/quiz/quiz-search/quiz-search/quiz-search.component';
import { AuthServiceService } from './services/authService/auth-service.service';
import { AuthInterceptorService } from './services/authInterceptors/auth.interceptor.service';


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
    ResultEditComponent,
    QuizSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthServiceService, 
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
