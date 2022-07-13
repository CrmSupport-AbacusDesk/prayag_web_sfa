import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-visiting-card-status-modal',
  templateUrl: './visiting-card-status-modal.component.html'
})
export class VisitingCardStatusModalComponent implements OnInit {

  
  statusdata:any={};
  visitingCardData:any={};

  constructor(@Inject(MAT_DIALOG_DATA) public data,public serve: DatabaseService, public dialog: MatDialog, public rout: Router, public alert: DialogComponent, public toast: ToastrManager) {
    console.log(data);

    console.log(data.data);
    // updatedStatus
    this.visitingCardData = JSON.parse(JSON.stringify(data.data));

    console.log(this.visitingCardData);
    

  }


  ngOnInit() {
  }


  selectedStatus: any;


  showReason : Boolean =false;
  selectChangeHandler(status) {
    
    console.log(status);
    

    // if(status=='reject')
    // {
    //   this.showReason = true;
    //   this.statusdata.status = status;
    //   this.statusdata.id=this.data1;
 
    // }

    // else{
    //   this.showReason = false;
    //   this.statusdata.id=this.data1;
    //   this.statusdata.status = status;
    // }


    
    
    //update the ui
    // this.selectedStatus = event.target.value;
    // console.log(this.selectedStatus);


  }


  updateDetails()
  {

    console.log(this.visitingCardData);

    let data = {
      'total_cards': this.visitingCardData.total_cards,
      'description': this.visitingCardData.remarks,
      'status': this.visitingCardData.status,
      'remarks': this.visitingCardData.reason,
      'status_cahnged_by': 1,
      'id': this.visitingCardData.id
    }
    
    console.log(data);
    
    // return;

    this.serve.fetchData2(data, "distributors/change_status").subscribe((result => {
      
      this.dialog.closeAll();
    //  this.getVisitingCardList();
      // window.location.reload();
      // this.rout.navigate(['/visiting-card']);

    }))



  }

}
