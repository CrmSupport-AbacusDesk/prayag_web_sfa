import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-distribution-legder-model',
  templateUrl: './distribution-legder-model.component.html',
  styleUrls: ['./distribution-legder-model.component.scss']
})
export class DistributionLegderModelComponent implements OnInit {
  
  type:any;
  dr_id:any;
  form:any={};
  
  constructor(@Inject(MAT_DIALOG_DATA)public data,public serve:DatabaseService,public rout:Router,public dialog2:MatDialog) 
  { 
    console.log(data);
    this.type = data.type;
    this.dr_id = data.id;
  }
  
  ngOnInit() {
  }
  
  submit()
  {
    this.form.dr_id = this.dr_id;
    this.form.cheque_date = moment(this.form.cheque_date).format('YYYY-MM-DD');
    
    this.serve.fetchData(this.form,"DistributionNetwork/add_ledger_data").subscribe(resp=>
      {
        console.log(resp);
        this.dialog2.closeAll();
      });
    }
  }
  