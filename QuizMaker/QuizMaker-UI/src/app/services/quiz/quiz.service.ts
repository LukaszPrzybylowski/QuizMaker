import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/models/quiz';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizListService {

  constructor(
    private http: HttpClient
  ) { }

  getLatestQuiz() : Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${environment.webApi}/quiz/Latest`);
  }

  getByTittleQuiz() :  Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${environment.webApi}/quiz/ByTitle`);
  }

  getRandomQuiz() : Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${environment.webApi}/quiz/Random`);
  }
  getQuiz(id: number): Observable<Quiz>{
    return this.http.get<Quiz>(`${environment.webApi}/quiz/${id}`)
  }
}