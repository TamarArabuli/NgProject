import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private  http : ApiService, private router : Router){

  }
  password!: string;
  phone!: string;

  logIn(){
    this.http.postData("https://rentcar.stepprojects.ge/api/Users/login", {
     phoneNumber : this.phone,
     password : this.password
    }).subscribe((resp : any) => {
      console.log(resp)
      Swal.fire({
      title: "Logged In Successfuly",
      text: "You can order now",
      icon: "success"});
      localStorage.setItem('token', resp.token)
      this.router.navigateByUrl('/menu')
    })
   
  }

  }

