import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams ,HttpEvent, HttpRequest,HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  // Function for making POST requests
  post<T>(url: string, body: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.http.post<T>(url, body, options);
  }

  // Function for making POST requests
  put<T>(url: string, body: any, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.http.put<T>(url, body, options);
  }

   // Function for making GET requests
   get<T>(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.http.get<T>(url, options);
  }

     // Function for making GET requests
     get_<T>(url: string, options?: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      responseType?: 'json';
      withCredentials?: boolean;
    }): Observable<HttpResponse<T>> {
      return this.http.get<T>(url, { ...options, observe: 'response' });
    }

   // Function for making DELETE requests
   delete<T>(url: string, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    params?: HttpParams | { [param: string]: string | string[] };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.http.delete<T>(url, options);
  }


  // Function for making other HTTP requests
  request<T>(method: string, url: string, options?: {
    body?: any;
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    return this.http.request<T>(method, url, options);
  }
  }
