import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private http : ApiService){

  }

  password!: string;
  phone!: string;

  register(){
    this.http.postData("https://rentcar.stepprojects.ge/api/Users/register", {
     phoneNumber : this.phone,
     password : this.password
    }).subscribe((resp : any) => {
      console.log(resp)
    })
    localStorage.setItem('token', 'token')
  }
}


  // "phoneNumber": "string",
  // "password": "string",
  // "email": "string",
  // "firstName": "string",
  // "lastName": "string",
  // "role": "string"