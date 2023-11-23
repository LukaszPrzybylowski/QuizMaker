import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { of , Observable, throwError } from 'rxjs';
import { TokenReponse } from 'src/app/models/token.response';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { TokenRequest } from 'src/app/models/token.request';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authKey: string = "auth";
  clientId: string = "QuizMakerFree";
  token!: string;
  isLogin!: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) { }

  login(username: string, password: string): Observable<TokenReponse>{
    
    var data = new TokenRequest(username, password, this.clientId, "password", "offline_access profile email");
  
    return this.http.post<TokenReponse>(`${environment.webApi}/token/Auth`, data).pipe(map
      ((user: any) =>{
        let token = user && user.token
        if(token){
          this.setAuth(user);
        }

        return user;
      }), catchError( error => {
        return throwError(() => error);
      })
    )
  }

  logout(): boolean{
    this.setAuth(null);
    return true;
  }

  setAuth(auth: TokenReponse | null) : boolean{
    if(isPlatformBrowser(this.platformId)){
      if(auth){
        localStorage.setItem(
          this.authKey,
          JSON.stringify(auth)
        );
      }
      else{
        localStorage.removeItem(this.authKey);
      }
    }
    return true;
  }

  getAuth(): TokenReponse | null {
    if(isPlatformBrowser(this.platformId)){
      var i = localStorage.getItem(this.authKey);
      if(i){
        return JSON.parse(i);
      }
    }
    return null;
  }

  isLoggedIn(): boolean{
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem(this.authKey) != null;
    }
    return false;
  }

  // createToken(model: TokenReponse): Observable<TokenReponse>{
  //   return ;
  // }
}

