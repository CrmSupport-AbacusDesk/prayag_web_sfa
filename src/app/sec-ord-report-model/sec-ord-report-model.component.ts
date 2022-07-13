import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sec-ord-report-model',
  templateUrl: './sec-ord-report-model.component.html',
  styleUrls: ['./sec-ord-report-model.component.scss']
})
export class SecOrdReportModelComponent implements OnInit {

  val:any={};
  dealer_data:any=[];
  
  constructor(@Inject(MAT_DIALOG_DATA)public data,public serve:DatabaseService,public rout:Router,public dialog2:MatDialog)
  {
    console.log(data);
    this.val = data;

    this.get_dealer_list();
  }
  
  ngOnInit() {
  }
  
  get_dealer_list()
  {
    console.log(this.val);
    
    this.serve.fetchData(this.val,"DistributionNetwork/get_dealer_list")
    .subscribe(resp=>
      {
        console.log(resp);
        this.dealer_data = resp['get_dealer_list'];

        for(var i=0; i<this.dealer_data.length; i++)
        {
          this.dealer_data[i]['amount'] = parseInt(this.dealer_data[i]['amount']);
        }
      });
    }
  }
  