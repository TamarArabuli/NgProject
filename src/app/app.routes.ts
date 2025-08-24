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
        path: 'home',
        component: HomeComponent

    },
    {
        path: 'menu',
        component: MenuComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
      {
        path: 'register',
        component: RegisterComponent
    },
       {
        path: 'cart',
        component: CartComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        component: ErrorComponent
    }


];
