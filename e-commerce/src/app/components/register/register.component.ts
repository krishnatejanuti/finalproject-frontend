// import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit
{
  registerForm: any;
 
  constructor(
    private fb: FormBuilder,          // Inject FormBuilder to create form
    private registerService: RegisterService  // Inject the RegisterService
  ) { }
 
  ngOnInit(): void
   {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', Validators.required],
      address: ['', [Validators.required]]
    });
  }
 
  onSubmit(): void {
    if (this.registerForm.valid) {
      // Call the register service method to send form data to the backend
      this.registerService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          alert('Registration successful') ;
          this.registerForm.reset();
          // Perform any action on success, e.g., redirect
        },
        error => {
          console.error('Registration failed', error);
          alert('Registration Failed') ;
          // Handle errors, display messages
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}