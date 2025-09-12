import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Category } from '../models/category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../models/Product';
import { find } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [FormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(private http: ApiService) {}

  ngOnInit() {
    this.http
      .getData('https://restaurant.stepprojects.ge/api/Categories/GetAll')
      .subscribe((resp: any) => {
        console.log(resp);
        this.categoryArr = resp;
      });

    this.http
      .getData('https://restaurant.stepprojects.ge/api/Products/GetAll')
      .subscribe((resp: any) => {
        this.productArr = resp;
      });
  }

  categoryArr: Category[] = [];
  productArr: Product[] = [];
  spa = 0;
  nuts = false;
  veg = false;
  isThereId!: boolean;

  filterByCategory(id: number) {
    this.http
      .getData(
        `https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`
      )
      .subscribe((resp: any) => {
        this.productArr = resp.products;
        console.log(resp);
      });
  }

  resetFilter() {
    this.http
      .getData('https://restaurant.stepprojects.ge/api/Products/GetAll')
      .subscribe((resp: any) => {
        this.productArr = resp;
      });
  }

  applyFilter() {
    this.http
      .getData(
        `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${this.veg}&nuts=${this.nuts}&spiciness=${this.spa}`
      )
      .subscribe((resp: any) => {
        this.productArr = resp;
      });
  }

  // isThere() {
  //   this.http
  //     .getData('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
  //     .subscribe(
  //       (resp: any) => console.log(resp),
  //       (this.isThereId = resp.find())
  //     );
  // }

  add(id: number, quantity: number, price: number) {
    this.http
      .postData('https://restaurant.stepprojects.ge/api/Baskets/AddToBasket', {
        quantity: quantity,
        price: price,
        productId: id,
      })
      .subscribe((resp: any) => {
        console.log(resp);
      });
  }
}
