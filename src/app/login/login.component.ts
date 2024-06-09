import { Component } from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from "../userService/user.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private fb : FormBuilder, private userService: UserService, private router : Router) {}
  errorWhenLogin: boolean = false;
  loginForm = this.fb.group({
    email: new FormControl('',{validators: [Validators.required,Validators.email],nonNullable: true}),
    password: new FormControl('',{validators: [Validators.required, Validators.minLength(6)],nonNullable: true})
  });
  onSubmit(){
    this.userService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(
      res => {
        this.errorWhenLogin= false;
        this.router.navigate(["/home"])
      },
      err => this.errorWhenLogin = true
    );
  }
}
