import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/interfaces/quiz';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizListService {

  constructor(
    private http: HttpClient
  ) { }

  getLatestQuiz() : Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${environment.webApi}/quiz/latest`);
  }

  getByTittleQuiz() :  Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${environment.webApi}/quiz/ByTitle`);
  }
}