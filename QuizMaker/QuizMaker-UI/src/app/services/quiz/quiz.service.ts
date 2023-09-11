import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/models/quiz';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private http: HttpClient
  ) { }

  getLatestQuiz(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${environment.webApi}/quiz/Latest`);
  }

  getByTittleQuiz():  Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${environment.webApi}/quiz/ByTitle`);
  }

  getRandomQuiz(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${environment.webApi}/quiz/Random`);
  }
  getQuiz(id: number): Observable<Quiz>{
    return this.http.get<Quiz>(`${environment.webApi}/quiz/${id}`);
  } 
  createQuiz(model: Quiz): Observable<Quiz>{
    return this.http.put<Quiz>(`${environment.webApi}/quiz`, model);
  }
  updateQuiz(model: Quiz): Observable<Quiz>{
    return this.http.post<Quiz>(`${environment.webApi}/quiz`, model);
  }
  deleteQuiz(id: number): Observable<number>{
    return this.http.delete<number>(`${environment.webApi}/quiz/${id}`);
  }
}