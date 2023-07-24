import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { QuizComponent } from './components/quiz/quiz/quiz.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about/about.component';
import { LoginComponent } from './components/login/login/login.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound/pagenotfound.component';
import { NavMenuComponent } from './components/navmenu/nav-menu/nav-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
