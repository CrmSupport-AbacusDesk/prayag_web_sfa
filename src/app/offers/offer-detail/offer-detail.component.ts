import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import {MatDialog} from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogService } from 'src/app/dialog.service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {
  offer_id:any;
  offerdetail:any=[];
  loader:any;
  data_not_found:any=false;
  constructor(public alert:DialogComponent, public serve:DatabaseService,public editdialog:DialogService,public dialog: MatDialog,public route:ActivatedRoute,public rout:Router,public toast:ToastrManager) {
    this.route.params.subscribe( params => {
    console.log(params);
    this.offer_id = params.id;
    console.log(this.offer_id);
    if(this.offer_id){
      this.offer_detail();
    }
    });
  
  }

  ngOnInit() {
  }

offer_detail(){
  console.log('test detail offer');
  this.loader=1;
  console.log(this.offer_id);
  this.serve.fetchData({},"Offer/offer_detail/"+this.offer_id).subscribe((result=>{
    console.log(result);
    this.offerdetail = result;  
      setTimeout (() => {
        this.loader='';
        
    }, 700);
  }))
}
}
