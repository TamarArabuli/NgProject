import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {

  let router = inject(Router)

  let token =localStorage.getItem('token')

  if(token){
        return true
  }
else {

  router.navigateByUrl("/login")
  Swal.fire({
  title: 'Error!',
  text: 'You need to log in first',
  icon: 'error',
  confirmButtonText: 'OK'
})
  return false;
}

}
