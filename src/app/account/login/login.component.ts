import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private  accountService: AccountService) { }

  ngOnInit(): void {
  }

  login()
  {
    this.accountService.login("test@test.com","test12345");
  }

}
