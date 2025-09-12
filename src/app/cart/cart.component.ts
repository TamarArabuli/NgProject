import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { cartProduct } from '../models/productInCart';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private http: ApiService) {}

  productArr: cartProduct[] = [];
  cartProduct: cartProduct = new cartProduct();

  ngOnInit() {
    this.http
      .getData('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
      .subscribe((resp: any) => {
        this.productArr = resp;
      });
  }

  plusOne(id: number, quantity: number, price: number) {
    let quantity1 = quantity++;
    this.http
      .updateData(
        'https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket',
        {
          quantity: quantity1,
          price: price,
          productId: id,
        }
      )
      .subscribe((resp: any) => {
        console.log(quantity1);
        this.http
          .getData('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
          .subscribe((resp: any) => {
            this.productArr = resp;
          });
      });
  }

  minusOne(id: number, quantity: number, price: number) {
    let quantity1 = quantity--;
    this.http
      .updateData(
        'https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket',
        {
          quantity: quantity1,
          price: price,
          productId: id,
        }
      )
      .subscribe((resp: any) => {
        console.log(quantity1);
        this.http
          .getData('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
          .subscribe((resp: any) => {
            this.productArr = resp;
          });
      });
  }

  deleteOne(id: number) {
    this.http
      .deleteData(
        `https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`
      )
      .subscribe((resp: any) => {
        this.http
          .getData('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
          .subscribe((resp: any) => {
            this.productArr = resp;
          });
      });
  }
}
