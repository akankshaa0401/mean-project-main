import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading = false;
  signupForm: FormGroup;
  constructor(public authService:AuthService){}
  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] }),
     
    });
  }
  onSubmit(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value); 
      this.authService.createUser(this.signupForm.value.email,this.signupForm.value.password)
    }
    
  }
}
