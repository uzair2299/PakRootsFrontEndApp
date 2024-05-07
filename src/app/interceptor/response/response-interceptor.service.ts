import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';



@Injectable()
export class ResponseInterceptorService {

  constructor(private authService: AuthService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Handle successful responses
          console.log('Successful response:', event);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle errors
        console.error('An error occurred:', error);
        if(error.status==401){
          this.authService.logout();
        this.router.navigate(['/login']);
        }
        // Forward the error to the calling code
        return throwError(() => error);
      })
    );
  }
}
