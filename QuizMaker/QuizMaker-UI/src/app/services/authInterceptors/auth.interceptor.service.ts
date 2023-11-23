import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Injector } from '@angular/core'
import { Observable } from 'rxjs-compat';
import { AuthServiceService } from '../authService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private injector: Injector) { }

  intercept( request: HttpRequest<any>,
             next: HttpHandler) : Observable<HttpEvent<any>>
  {
    var auth = this.injector.get(AuthServiceService);
    var token = (auth.isLoggedIn())? auth.getAuth()!.token : null;
    if(token){
      request = request.clone({
        setHeaders : {
          Authorization : `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
