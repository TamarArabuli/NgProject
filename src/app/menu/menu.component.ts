import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Category } from '../models/category';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Product } from '../models/Product';

@Component({
  selector: 'app-menu',
  imports: [FormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  constructor(private http : ApiService,){

  }

  ngOnInit(){
      this.http.getData("https://restaurant.stepprojects.ge/api/Categories/GetAll")
    .subscribe((resp : any) => {
      console.log(resp)
      this.categoryArr = resp
    })

    this.http.getData('https://restaurant.stepprojects.ge/api/Products/GetAll')
    .subscribe((resp :any) =>{
      this.productArr = resp
    })


  }

  categoryArr : Category[] = [];
  productArr : Product[] = [];

}
