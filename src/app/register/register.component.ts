import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../userService/user.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private fb : FormBuilder, private userService: UserService, private router : Router) {
  }
  errorWhenRegistering: boolean = false;
  registerForm = this.fb.group(
    {
      email: new FormControl('', {validators: [Validators.required, Validators.email],nonNullable: true}),
      username : new FormControl('', {validators: [Validators.required, Validators.minLength(6)],nonNullable: true}),
      password : new FormControl('', {validators: [Validators.required, Validators.minLength(6)],nonNullable: true}),
      checkbox : new FormControl('', [Validators.requiredTrue]),
    }
  )
  onSubmit(){
    const controls = this.registerForm.controls;
      this.userService.register(controls.email.value, controls.username.value, controls.password.value).subscribe(
        res=> {
          this.errorWhenRegistering= false;
          this.router.navigate(["/login"])

        },
        error => {
          this.errorWhenRegistering= true;
        }
      );

  }
}
