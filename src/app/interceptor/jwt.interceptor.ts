import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router :Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("going to intercept in the http request")
    // Intercept and handle the request here
    // You can modify the request or add headers
    // Pass the modified request to the next interceptor or the final HTTP handler

    // Get the JWT token from wherever you have stored it
    const token = localStorage.getItem('jwtToken');
console.log("token",token)
    // Add the token to the request headers
    //In JavaScript, null, undefined, 0, an empty string, and false are considered falsy values.
    if (token) {
      console.log("Token exists, adding to headers");


      //request.clone() creates a clone of the original request object. It is commonly used in interceptors to modify the request before it is sent.

      //The clone() method is called with an object parameter that contains the modifications to be made on the cloned request.
      
      //Inside the object parameter, setHeaders is a property that allows you to set the headers of the cloned request.
      
      //The Authorization header is set using the Authorization: Bearer ${token} syntax. This is a common way to include a JWT token in the request headers, where ${token} is the JWT token value obtained earlier from the local storage.
      
      //The value of the Authorization header is constructed by prefixing the token with the string 'Bearer '. This is a standard convention for JWT authentication, where the word 'Bearer' signifies the type of token being used.
      
      //The modified headers are applied to the cloned request, overwriting any existing Authorization header that might have been present.
      
      //Finally, the cloned request with the updated headers is assigned back to the request variable, effectively replacing the original request with the modified one.

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(request);
    }else{
      console.error("Token does not exist, not making the HTTP call");

      const isLoginApi =  this.isLoginApi(request.url);
      this.router.navigate(['/login']);
      if (!isLoginApi) {
        this.router.navigate(['/login']);
        // Return an empty observable of HttpEvent<unknown>
        return of() as Observable<HttpEvent<unknown>>;
      }
      return next.handle(request);

    }
  }
   // Function to check if the request URL is the login API
   private isLoginApi(url: string): boolean {
    console.info("request route",url)
    return url.includes('/api/v1/login'); // Adjust this URL check as per your API
  }
}