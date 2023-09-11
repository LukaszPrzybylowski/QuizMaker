import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(
    private http: HttpClient
  ) { }

  getAllResults(quizId : number) : Observable<Result[]>{
    return this.http.get<Result[]>(`${environment.webApi}/result/All/${quizId}`);
  }

  getResult(id : number) : Observable<Result>{
    return this.http.get<Result>(`${environment.webApi}/result/${id}`);
  }

  createResult(model : Result) : Observable<Result>{
    return this.http.put<Result>(`${environment.webApi}/result`, model);
  }

  updateResult(model : Result) : Observable<Result>{
    return this.http.post<Result>(`${environment.webApi}/result`, model);
  }

  deleteResult(id : number) : Observable<number> {
    return this.http.delete<number>(`${environment.webApi}/result/${id}`);
  }
}
