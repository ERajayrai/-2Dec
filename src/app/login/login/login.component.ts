import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submit:any;
  data:any=[];
   resp:any;
   public loginModel:LoginModel=new LoginModel();
  constructor(private http:HttpClient,private authService:AuthService) { 
    this.submit=new FormGroup({
      "email":new FormControl(null,[Validators.required,Validators.email]),
      "password":new FormControl(null,[Validators.required])
    })
  }

  ngOnInit(): void {
  }
  getEmailPassword(){
    if(this.submit.invalid){
      alert("email and password is required");
    }
    else{
      this.loginModel = this.submit.value;
      this.authService.logInWithEmailPassword(this.loginModel.email,this.loginModel.password);
    }
  }

  get email(){
    return this.submit.get('email');
  }
  get password(){
    return this.submit.get('password');
  }

}

