import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
// import { PearlService } from 'src/app/pearl.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { sessionStorage } from 'src/app/localstorage.service';



import { PopGiftIssueModalComponent } from '../pop-gift-issue-modal/pop-gift-issue-modal.component';

@Component({
  selector: 'app-pop-gift-detail',
  templateUrl: './pop-gift-detail.component.html'
})
export class PopGiftDetailComponent implements OnInit {
  skelton:any={};
  id:any={};
  popData:any={};
  loader:any;
  data_not_found=false;
  incoming_data_not_found=false;
  logIN_user: any;

  
  constructor(public dialog: MatDialog, public session: sessionStorage ,public serve: DatabaseService,public route:Router,public routes:ActivatedRoute) {
    this.skelton = new Array(10);

    this.routes.params.subscribe( params => {
      console.log(params);
      this.id = params.id;
      console.log(this.id);
       this.logIN_user = JSON.parse(localStorage.getItem('user'));

    
    });

   }

  ngOnInit() 
  {
    this.gift_detail();
  }


  popModal(type)
  {
    const dialogRef = this.dialog.open(PopGiftIssueModalComponent, {
      width:'768px',
      data:{
      type,
      id:this.id
      }});
      dialogRef.afterClosed().subscribe(result => {
        this.gift_detail()
      });
      
    }

    gift_detail()
    {
      this.loader=1;

      this.serve.fetchData({"id":this.id},"/PopGift/popDetail").subscribe((result=>{
        console.log(result);
        this.popData=result;
        console.log(this.popData);

        if(this.popData.incoming.length ==0 && this.popData.outgoing.length ==0){
          this.data_not_found=true;
          this.incoming_data_not_found==true
        }else{
          this.data_not_found=false;
          this.incoming_data_not_found==false
          
        }

      }))
      this.loader='';

    }

}
