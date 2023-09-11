import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/models/answer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(
    private http : HttpClient
  ) { }

  getAllAnswer(questionId : number) : Observable<Answer[]>{
    return this.http.get<Answer[]>(`${environment.webApi}/answer/All/${questionId}`);
  }

  getAnswer(id : number) : Observable<Answer>{
    return this.http.get<Answer>(`${environment.webApi}/answer/${id}`);
  }

  createAnswer(model : Answer) : Observable<Answer>{
    return this.http.put<Answer>(`${environment.webApi}/answer`, model);
  }

  updateAnswer(model : Answer) : Observable<Answer>{
    return this.http.post<Answer>(`${environment.webApi}/answer`, model);
  }

  deleteAnswer(id : number) : Observable<number>{
    return this.http.delete<number>(`${environment.webApi}/answer/${id}`);
  }
}
