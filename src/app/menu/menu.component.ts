import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Category } from '../models/category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../models/Product';
import { find } from 'rxjs';
import Swal from 'sweetalert2';

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

  selectedCategory = 0;
  categoryArr: Category[] = [];
  productArr: Product[] = [];
  spa = 0;
  nuts = false;
  veg = false;
  isThereId!: boolean;

  filterByCategory(id: number) {
    this.selectedCategory = id;
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

  // isThere(id: number) {
  //   this.http
  //     .getData('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
  //     .subscribe((resp: any) => {
  //       if (resp.length > 0) {
  //         debugger;
  //         return resp.find((el: any) => el.product.id == id);
  //       } else {
  //         return undefined;
  //       }
  //     });
  // }

  add(id: number, quantity: number, price: number) {
    this.http
      .getData('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
      .subscribe((resp: any) => {
        let item = resp.find((el: any) => el.product.id == id);

        if (!item) {
          this.http
            .postData(
              'https://restaurant.stepprojects.ge/api/Baskets/AddToBasket',
              {
                quantity: quantity,
                price: price,
                productId: id,
              }
            )
            .subscribe((res: any) => {
              console.log(res);
              Swal.fire({
                title: 'Product added sucessfully!',
                text: 'Do you want to continue',
                icon: 'success',
                confirmButtonText: 'Cool',
              });
            });
        } else {
          this.http
            .updateData(
              'https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket',
              {
                quantity: item.quantity + 1,
                price: (item.quantity + 1) * item.product.price,
                productId: id,
              }
            )
            .subscribe((res: any) => {
              console.log(res);
              Swal.fire({
                title: 'Product changed sucessfully!',
                text: 'Do you want to continue',
                icon: 'success',
                confirmButtonText: 'Cool',
              });
            });
        }
      });
  }
}
