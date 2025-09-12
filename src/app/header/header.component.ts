import { CommonModule, NgIf, ViewportScroller } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [NgIf, CommonModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private viewportScroller: ViewportScroller,
    private auth: AuthService
  ) {
    this.isAuthorised = computed(() => this.auth.isAuth());
  }

  isAuthorised!: any;

  token = localStorage.getItem('token');
  showMobile = false;

  active = 'active';

  logOut() {
    localStorage.removeItem('token')
    this.auth.logOut();
  }
  showHide() {
    this.showMobile == false
      ? (this.showMobile = true)
      : (this.showMobile = false);
  }

  scrollToFooter() {
    this.viewportScroller.scrollToAnchor('footer');
    // this.viewportScroller.scrollToPosition([0, 100])
  }
}
