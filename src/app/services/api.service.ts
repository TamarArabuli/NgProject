import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }


  getData(url : string){
    return this.http.get(url).pipe(
       catchError(this.errorHandling)
    )
  }


  postData(url : string, obj : any){
    return this.http.post(url, obj).pipe(
       catchError(this.errorHandling)
    )
  }

   updateData(url : string, obj : any){
    return this.http.put(url, obj).pipe(
       catchError(this.errorHandling)
    )
  }

    deleteData(url : string){
    return this.http.delete(url).pipe(
       catchError(this.errorHandling)
    )
  }


private errorHandling (err : HttpErrorResponse) {
  return throwError(() => {
    Error('Something went wrong, Try later')
    Swal.fire({
    title: 'Error! Something went wrong, Try later',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
})

  })
}
}
