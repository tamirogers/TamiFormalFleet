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

  // Catches 3 errors from API/Server.  404 errors (2)... 1)on logout, an ID entered that has not checked in.  2)on Login, enters bad student ID
  // 400 error... on Teacher search, enters a check-out date before the check-in date/time.

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
          text: 'It may be because... you entered a check-out date/time BEFORE the check-in date/time.  Even if you revise the check-in time, the check-out time must always be after the original check-in.  In this situation, start over on the check-in page.  Please try again. (400)'
        });
        break;

         // 401 is "Unathorized" from API
      case 401:

        swal.fire({
          title: 'There was a problem.',
          text: 'It may be because... you entered a staff ID that is NOT a Resource Teacher or EA in munis.  Please try again. (401)'
        });
        break;

      case 404:
        // 404 is "Not Found" from API

        swal.fire({
          title: 'There was a problem.',
          text: 'It may be because... the student ID entered is not valid, the student has not checked in today, or did NOT check out on a previous day. (404)'
        });
        break;

      case 409:
        // 409 is "Conflict" from API

        swal.fire({
          title: 'There was a problem.',
          text: 'It may be because... an assignment chosen is already active. (409)'
        });
        break;

      default:
        // Catching any other errors, 401.  Can occur if enter time over 24 hours
        swal.fire({
          title: 'There was a problem.',
          text: 'Please reload the webpage and try again.'
        });
        console.log("I am the error default from switch statement in http-intercepter.");

    }
  }




}