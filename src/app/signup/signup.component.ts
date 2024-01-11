import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication-service.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router // Inject the Router
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.message = '';

    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;

    const username = this.f['username'].value;
    const password = this.f['password'].value;
    const confirmPassword = this.f['confirmPassword'].value;
    const email = this.f['email'].value;
    const firstName = this.f['firstName'].value;
    const lastName = this.f['lastName'].value;
    const address = this.f['address'].value;
    const phoneNumber = this.f['phoneNumber'].value;

    if (password !== confirmPassword) {
      this.error = 'Passwords do not match';
      this.loading = false;
      return;
    }

    this.authenticationService.signup(username, password, email, firstName, lastName, address, phoneNumber)
      .pipe(first())
      .subscribe({
        next: () => {
          this.message = 'Signup successful. Redirecting to login page...';

          setTimeout(() => {
            this.router.navigate(['/login']); // Adjust the route accordingly
          }, 3000);
        },
        error: (error) => {
          this.error = error.error.message;
          this.loading = false;
        }
      });
  }
}
