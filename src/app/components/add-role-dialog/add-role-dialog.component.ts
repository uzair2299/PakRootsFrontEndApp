import { Component,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.css']
})
export class AddRoleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
  addEditRoleForm = new FormGroup({
    roleName : new FormControl('testing',Validators.required),
   // password : new FormControl('asdfghA1',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
  });

  ngOnInit(): void {
    console.log("Selected item for edit",this.data.roleData) ;
  }

  submitForm() {
    if(this.addEditRoleForm.valid){
      console.log(this.addEditRoleForm.value);
    }   
    else{
      console.error("Invalid form check user input",this.addEditRoleForm.value);
    }

  }
}
