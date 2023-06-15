import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] }),
     
    });
  }
  onSubmit(){
    console.log(this.loginForm.value);
    
  }
}
