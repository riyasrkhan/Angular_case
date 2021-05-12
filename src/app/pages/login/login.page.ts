import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import *  as global  from '../../global/globalservice.json';
import { DatePipe } from '@angular/common'
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  emailPattern = "[a-zA-Z0-9_.+-,;]+@(?:(?:[a-zA-Z0-9-]+\.,;)?[a-zA-Z]+\.,;)?(homedepot)\.com";
  logInfo:any;
  constructor(public formBuilder: FormBuilder,public util:UtilityService,private toaster: ToastrService,private router: Router,private dp: DatePipe) {
    this.logInfo = global.logInfo;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required,Validators.minLength(6)]]
        });

  }

  ngOnInit() {
    let myDate = new Date()
    let newDate = this.dp.transform(myDate, 'MMMM-dd-yyyy HH:mm', 'es-ES');

  }
  get speak_part() { 
    return this.loginForm.controls; 
  }
  login(){
       
    var username = this.loginForm.get('email').value;
    window.localStorage.setItem("username",username); 
    var password = this.loginForm.get('password').value;
    console.log(username,password)
    if( password == "123456" ){
      this.router.navigate(['/dashboard']);
    }else{
    this.util.logging("login","user enter wrong password","Warning");
    this.toaster.warning('Please check your password', 'Hello '+this.capitalizeFirstLetter(username),{closeButton:true,positionClass:'toast-top-center'});
    }
  }
  capitalizeFirstLetter(username) {
    var usernameStr = username.split('@').shift()
    return usernameStr.charAt(0).toUpperCase() + usernameStr.slice(1);
  }

}
