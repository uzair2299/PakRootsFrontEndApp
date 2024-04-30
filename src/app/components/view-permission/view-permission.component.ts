import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/const/api.config';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-view-permission',
  templateUrl: './view-permission.component.html',
  styleUrls: ['./view-permission.component.css']
})
export class ViewPermissionComponent {

itemId?:string;
  constructor(private httpService: HttpService,private route:ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      console.log("selected permission id : ",this.itemId);
    this.getPermissionDetailsByIdV1();
  });
  }

  getPermissionDetailsByIdV1() {
    this.httpService.get<any>(`${API_ENDPOINTS.permissionV1}/${this.itemId}`)
    .pipe(
      catchError(error => {
        console.error('Error in POST request:', error);
        // Handle the error here or re-throw it to propagate
        // return throwError(error); // Uncomment this line if you want to propagate the error
        return throwError(() => error); // Or return a new observable with the error
      })
    )
    .subscribe({
      next: response => {
        console.log('Response:', response);
        //console.log('POST request successful:', this.permissions);
      },
      error: error => {
        console.error('Error in POST request:', error);
      }
    });
  }
}

