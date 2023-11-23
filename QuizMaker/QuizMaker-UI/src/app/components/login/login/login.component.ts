import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, delay, throwError } from 'rxjs';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title!: string;
  form!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthServiceService){
      
      this.title = "User Login"
      this.createForm();
    }

    createForm(){
      this.form = this.fb.group({
        Username: ['', Validators.required],
        Password: ['', Validators.required]
      });
    }

    onSubmit(){
      var username = this.form.value.Username;
      var password = this.form.value.Password;

      this.authService.login(username, password).subscribe(res => {
        if(res.token){          
            this.router.navigate(['home']);
        }}, err =>{
          console.log(err);
          this.form.setErrors({
            "auth" : "Incorrect username or password"
          });
        });
    }

    onBack(){
      this.router.navigate(['home']);
    }

    getFormControl(name : string){
      return this.form.get(name);
    }

    isValid(name: string){
      var e = this.getFormControl(name);
      return e && e.valid;
    }

    isChaned(name: string){
      var e = this.getFormControl(name);
      return e && (e.dirty || e.touched);
    }

    hasError(name: string){
      var e = this.getFormControl(name);
      return e && (e.dirty || e.touched) && !e.valid;
    }
}
