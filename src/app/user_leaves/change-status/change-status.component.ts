import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import {  sessionStorage} from 'src/app/localstorage.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnInit {
  userData: any;
  userId: any;
  userName: any;
  constructor(@Inject(MAT_DIALOG_DATA)public data,public dialog:MatDialog, public session: sessionStorage,public serve:DatabaseService,public toast:ToastrManager)
  {
    console.log(this.data);

    this.userData = JSON.parse(localStorage.getItem('st_user'));
    this.userId=this.userData['data']['id'];
    this.userName=this.userData['data']['name'];
  }

  ngOnInit()
  {
  }

  changeStatus()
  {

    this.serve.fetchData({'reason':this.data.reason,'status':this.data.status,'id':this.data.id,'uid':this.userId,'uname':this.userName},"Leaves/statusChange").subscribe((result=>{
      console.log(result);
      if(result)
      {
        this.toast.successToastr("success");
        this.dialog.closeAll();
        // this.deleteUser();



      }
    }))
    this.dialog.closeAll();

  }

}
