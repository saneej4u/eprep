import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserProfile } from 'src/app/shared/models/user-profile';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: string;
  signupForm: FormGroup;
  returnUrl: string;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
  }

  createLoginForm() {
    this.signupForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
      ]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.accountService
      .register(this.signupForm.value)
      .then(result => {
        result.user.updateProfile({
          displayName: this.signupForm.value.firstname
        });
        console.log("User result: " + result.user);
        
        const userProfile: IUserProfile = {
          id: result.user.uid,
          firstName: this.signupForm.value.firstname,
          lastName: this.signupForm.value.lastname
        };

        this.accountService.createUserProfile(userProfile);
        this.router.navigate([this.returnUrl]);
      })
      .catch(err => {
        this.error = err;
      });
  }
}
