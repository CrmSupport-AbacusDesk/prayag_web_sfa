import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  data_not_found=false;
  loader:any;
  offerlist:any=[];
  pagenumber:any=0;
  page_limit:any=0;
  total_page:any=0;
  start:any=0;
  count:any=0;
  subCategory:any='';
  constructor(public matdialog: MatDialog,public dialog:DialogComponent,public serve:DatabaseService,public rout:Router,public toast:ToastrManager) 
    {
      this.offer_list();
     }

  ngOnInit() {
  }
offer_list(){
  this.loader=1;
  this.serve.fetchData({},"Offer/offer_list").subscribe((result)=>{
      console.log(result);
      this.offerlist = result;
         setTimeout (() => {
        this.loader='';
    }, 700);
    if(this.offerlist.length ==0){
      this.data_not_found=true;
    }else{
      this.data_not_found=false;

    }
  })
}
}
