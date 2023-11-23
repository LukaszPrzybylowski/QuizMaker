import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  public isCollapsed = true;

  constructor(
    private router: Router,
    public authService : AuthServiceService
  ){}

  home(){
    this.router.navigate(["/home"]);
  }

  about(){
    this.router.navigate(["/about"]);
  }

  login(){
    this.router.navigate(["/login"]);
  }

  createQuiz(){
    this.router.navigate(["/quiz/create"]);
  }

  logout() : boolean {
    if(this.authService.logout()){
      this.router.navigate([""]);
    }
    return false;
  }
}
