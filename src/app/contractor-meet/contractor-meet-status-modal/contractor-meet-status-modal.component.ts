import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { sessionStorage } from 'src/app/localstorage.service';

@Component({
  selector: 'app-contractor-meet-status-modal',
  templateUrl: './contractor-meet-status-modal.component.html'
})
export class ContractorMeetStatusModalComponent implements OnInit {

  statusdata:any={};
  data1:any;
  login_data:any={};

  constructor(@Inject(MAT_DIALOG_DATA) public data,public session:sessionStorage,public serve: DatabaseService, public dialog: MatDialog, public rout: Router, public alert: DialogComponent, public toast: ToastrManager) { 
    console.log(data);
    console.log(data.data);
    this.data1=data.data;

    this.login_data = this.session.getSession();
    console.log();
    
    this.login_data = this.login_data.value;
    this.login_data = this.login_data.data;
    console.log(this.login_data);

  

  }

  ngOnInit() {
  }


  selectedStatus: any;
  showReason : Boolean =false;

  selectChangeHandler(status) {
    
    console.log(status);
    

    if(status=='rejected')
    {
      this.statusdata.status_changed_by= this.login_data.id;

      // this.statusdata= this.login_data.id;
      this.showReason = true;
      this.statusdata.status = status;
      this.statusdata.id=this.data1;
 
    }

    else{

      this.showReason = false;
      this.statusdata.status_changed_by= this.login_data.id;
      this.statusdata.id=this.data1;
      this.statusdata.status = status;
    }
  }


  updateDetails(){

    console.log(this.statusdata);
    this.serve.fetchData(this.statusdata, "Contractor/status_change").subscribe((result => {
      
      this.dialog.closeAll();

    }))



  }



}
