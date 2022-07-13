import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import {  sessionStorage} from 'src/app/localstorage.service';


@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html'
})
export class StatusModalComponent implements OnInit {
  // data:any={};
  login:any={};
delivery_from:any;
userData: any;
  userId: any;
  userName: any;

  constructor(@Inject(MAT_DIALOG_DATA)public data,public dialog:MatDialog,public serve:DatabaseService, public session: sessionStorage) { 
console.log(this.data);
this.userData = JSON.parse(localStorage.getItem('st_user'));
this.userId=this.userData['data']['id'];
this.userName=this.userData['data']['name'];
console.log(this.data.delivery_from);
this.delivery_from=this.data.delivery_from;
  }

  ngOnInit() {
    this.login=JSON.parse(localStorage.getItem('login'));
    console.log(this.login.data.id);
  }
  reason_reject:any
  order_status_change(reason,status){
    console.log(reason,status);
  
    this.serve.fetchData({'reason':reason,'status':status,'id':this.data.order_id,'action_by':this.login.data.id ,'uid':this.userId,'uname':this.userName},"Order/orderstatus_change").subscribe((result=>{
      console.log(result);
    }))
    this.dialog.closeAll();

    // this.orderDetail();
  }
}
