import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: "home",
        loadComponent: () => import('./home/home.component').then(p => p.HomeComponent),
    },
      {
        path: "menu",
        loadComponent: () => import('./menu/menu.component').then(p => p.MenuComponent),
    },
    {
        path: "login",
        loadComponent: () => import('./login/login.component').then(p => p.LoginComponent),
    },
    {
        path: "register",
        loadComponent: () => import('./register/register.component').then(p => p.RegisterComponent),
    },
  {
        path: "cart",
        loadComponent: () => import('./cart/cart.component').then(p => p.CartComponent),
         canActivate: [authGuard]
    },
    {
        path: '**',
        component: ErrorComponent
    }


];
