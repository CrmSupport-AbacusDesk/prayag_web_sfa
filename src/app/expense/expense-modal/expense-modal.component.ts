import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import {  sessionStorage} from 'src/app/localstorage.service';


@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.scss']
})
export class ExpenseModalComponent implements OnInit 
{
  userData: any;
  userId: any;
  userName: any;
  constructor(@Inject(MAT_DIALOG_DATA)public data ,
  public serve:DatabaseService,
  public dialog:MatDialog,
  public rout:Router,
  public alert:DialogComponent,
  public toast:ToastrManager) 
  {
    console.log(data);
    this.userData = JSON.parse(localStorage.getItem('st_user'));
    this.userId=this.userData['data']['id'];
    this.userName=this.userData['data']['name'];
  }
  
  ngOnInit() {
  }
  
  update_status()
  {
    
    console.log(this.data);
    if(this.data['approved_amount'] == ''){
      console.log("if approved amount is blank");
      delete this.data.approved_amount;
    }
    else if (this.data['reason'] == ''){
      console.log("if reason is blank");
      delete this.data.reason;
    }
    this.data.uid=this.userId;
    this.data.uname=this.userName;
    console.log(this.data);
    
    this.serve.fetchData(this.data,"Expense/update_status").subscribe((result)=>{
      console.log(result);
      if(result)
      {
        this.toast.successToastr("success");
        this.dialog.closeAll();
      }
    })
  }
  
  
}
