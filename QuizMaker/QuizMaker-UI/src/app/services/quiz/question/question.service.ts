import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http : HttpClient
  ) { }

  getAllQuestion(quizId : number) : Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.webApi}/question/All/${quizId}`);
  }

  getQuestion(id : number) : Observable<Question>{
    return this.http.get<Question>(`${environment.webApi}/question/${id}`)
  }

  createQuestion(model : Question) : Observable<Question>{
    return this.http.put<Question>(`${environment.webApi}/question`, model)
  }

  updateQuestion(model : Question) : Observable<Question>{
    return this.http.post<Question>(`${environment.webApi}/question`, model)
  }

  deleteQuestion(id : number) : Observable<number>{
    return this.http.delete<number>(`${environment.webApi}/question/${id}`)
  }
}
