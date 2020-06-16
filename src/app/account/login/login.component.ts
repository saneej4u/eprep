import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private  accountService: AccountService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }


  createLoginForm()
  {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit()
  {
    this.accountService.login(this.loginForm.value.email, this.loginForm.value.password);
    
  }

}