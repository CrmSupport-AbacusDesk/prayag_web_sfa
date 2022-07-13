import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import { UserEmailModalComponent } from 'src/app/user/user-email-modal/user-email-modal.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogService } from 'src/app/dialog.service';
import { MatDialog } from '@angular/material';
import { TravelStatusModalComponent } from '../travel-status-modal/travel-status-modal.component';
import { TravelListComponent } from '../travel-list/travel-list.component';
import { addTravelListModal } from '../add-travel-list/add-travel-list-modal.component';




@Component({
  selector: 'app-travel-plan-detail',
  templateUrl: './travel-plan-detail.component.html',
  styleUrls: ['./travel-plan-detail.component.scss']
})
export class TravelPlanDetailComponent implements OnInit {

  travellist:any;
  traveldistributor:any;
  travelarea:any;
  check_in_data:any=[]
  constructor(public alert:DialogComponent, public serve:DatabaseService, public dialog: MatDialog, public rout: Router, public route:ActivatedRoute,private _location: Location ) { 
    console.log(route);
    console.log(rout);

    console.log(route.params['_value']);
    this.serve.fetchData({'travelId':route.params['_value'].id},"Travel/travelDetail").subscribe((result=>
      {
        console.log(result);
        this.travellist=result['travel'];
        this.traveldistributor=result['travel']['area_dealer_list'];
        this.travelarea=result['travel']['travel_list'];
        this.check_in_data=result['travel']['check_in_data']
        console.log(this.traveldistributor);
        
        console.log(this.travellist);
        
      }))
    
  }

  ngOnInit() {

    
  }

  openEditDialog(traveldata): void {  
    const dialogRef = this.dialog.open(addTravelListModal,{
        width: '720px', data:{
            'travel': this.travellist,
           
        }
        
    });
    
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.orderDetail();
        
    });
}

openEditDialog2(areadata): void {  
  const dialogRef = this.dialog.open(addTravelListModal,{
      width: '720px', data:{
        'travel': this.travellist,
         
      }
      
  });
  
  dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.orderDetail();
      
  });
}
  backToList() {
    this._location.back();
  }


  
}
