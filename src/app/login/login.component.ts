import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private  http : ApiService){

  }
  password!: string;
  phone!: string;

  logIn(){
    this.http.postData("https://rentcar.stepprojects.ge/api/Users/register", {
     phoneNumber : this.phone,
     password : this.password
    }).subscribe((resp : any) => {
      console.log(resp)
    })
    localStorage.setItem('token', 'token')
  }

  }

