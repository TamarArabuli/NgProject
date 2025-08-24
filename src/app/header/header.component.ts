import { CommonModule, NgIf, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [NgIf, CommonModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private viewportScroller: ViewportScroller){

  }
  
  showMobile = false;

  active = "active"

  showHide(){
    this.showMobile == false ? this.showMobile = true : this.showMobile = false
  }

  scrollToFooter(){
    this.viewportScroller.scrollToAnchor('footer')
    // this.viewportScroller.scrollToPosition([0, 100])
  }

}
