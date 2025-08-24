import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private http : ApiService, private router : Router){

  }

  password!: string;
  phone!: string;

  register(){
    this.http.postData("https://rentcar.stepprojects.ge/api/Users/register", {
     phoneNumber : this.phone,
     password : this.password
    }).subscribe((resp : any) => {
      console.log(resp)
      Swal.fire({
            title: "Registered Successfuly",
            text: "You can log in now",
            icon: "Success"});
            this.router.navigateByUrl("/login")
    })
  
  }
}
