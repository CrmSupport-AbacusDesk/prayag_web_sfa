import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import * as moment from 'moment';
import { SecOrdReportModelComponent } from '../sec-ord-report-model/sec-ord-report-model.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-primary-vs-secondary',
  templateUrl: './primary-vs-secondary.component.html',
  styleUrls: ['./primary-vs-secondary.component.scss']
})
export class PrimaryVsSecondaryComponent implements OnInit {
  
  distributor_list:any=[];
  data:any={};
  distributor_detail:any=[];
  user_assign:any=[];
  product_data:any=[];
  dealer_count:any='';
  dealer_checkin_count:any='';
  data_not_found = false;
  
  constructor(public serve:DatabaseService,public dialog: MatDialog) 
  { 
    this.channel_partner_list();
  }
  
  channel_partner_list()
  {
    this.serve.fetchData('',"DistributionNetwork/distributor_list")
    .subscribe(resp=>
      {
        console.log(resp);
        this.distributor_list = resp['distributor_list'];
        console.log(this.distributor_list);
      });
    }
    
    select_distributor()
    {
      if(this.data.start_date && this.data.end_date)
      {
        this.data.start_date = moment(this.data.start_date).format('YYYY-MM-DD');
        this.data.end_date = moment(this.data.end_date).format('YYYY-MM-DD');
      }
      
      this.serve.fetchData(this.data,"DistributionNetwork/distributor_detail")
      .subscribe(resp=>
        {
          console.log(resp);
          this.distributor_detail = resp['distributor_detail']['data'];
          this.user_assign = resp['distributor_detail']['sales_user'];
          this.product_data = resp['distributor_detail']['primary_data'];
          this.dealer_count = resp['distributor_detail']['dealer_count'];
          this.dealer_checkin_count = resp['distributor_detail']['dealer_checkIn_count'];

          if(resp['distributor_detail'])
          {
            this.data_not_found = true;
          }
          else
          {
            this.data_not_found = false;
          }
        });
      }
      
      ngOnInit() {
        
      }
      
      open_model()
      { 
        const dialogRef = this.dialog.open(SecOrdReportModelComponent, {
          width: '750px',
          data:{
            id:this.data.distributor,
            start_date:this.data.start_date,
            end_date:this.data.end_date
          }});
          dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            console.log('The dialog was closed');
          });
        }
        
      }
      