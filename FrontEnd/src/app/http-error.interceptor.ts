import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';


@Injectable()

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router, ) { }

  // Catches errors from API/Server for custom messaging to user.  

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {

          if (error instanceof HttpErrorResponse) {

            this.onError(error);
          }

          return throwError(error);
        })
      )
  }



  private onError(response: HttpErrorResponse): void {
    const status: number = response.status;
    const serverErrorMessage = response.error;

    switch (status) {
      // 400 is "Bad Request" from API 
      case 400:

        swal.fire({
          title: 'There was a problem.',
          text: 'It may be because... no assignments were located in the database (400).'
        });
        break;  

      case 404:
        // 404 is "Not Found" from API 

        swal.fire({
          title: 'There was a problem.',
          text: 'It may be because... there is an issue with the assignment you are updating in the database (404).'
        });
        break;

      case 409:
        // 409 is "Conflict" from API

        swal.fire({
          title: 'There was a problem.',
          text: 'It may be because... an assignment chosen is already active (409).'
        });
        break;

      default:
        // Catching any other errors, 401
        swal.fire({
          title: 'There was a problem.',
          text: 'Please reload the webpage and try again.'
        });
        console.log("I am the error default from switch statement in http-intercepter.");

    }
  }




}