import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import * as moment from 'moment';

@Component({
  selector: 'app-monthly-dwr',
  templateUrl: './monthly-dwr.component.html',
  styleUrls: ['./monthly-dwr.component.scss']
})
export class MonthlyDwrComponent implements OnInit {
  skelton:any={}
  constructor(public db:DatabaseService) { 
    this.skelton = new Array(10);
  }
  
  ngOnInit() 
  {
    
  }
  date:any=new Date();
  loader:any=false;
  report_data:any=[];
  data:any={};
  search_val:any={};
  total_data:any=[];
  
  get_report_data()
  {
    if(this.data.start_date && this.data.end_date)
    {
      this.data.start_date = moment(this.data.start_date).format('YYYY-MM-DD');
      this.data.end_date = moment(this.data.end_date).format('YYYY-MM-DD');
    }
    
    this.loader = true;
    
    this.db.fetchData({"data":this.data, "search":this.search_val},"Dwr/monthly_work_report_data")
    .subscribe(resp=>{
      console.log(resp);
      this.report_data = resp['user_list'];
      this.total_data = resp['all_count'];
      
      for(var i=0; i<this.report_data.length; i++)
      {
        if(this.report_data[i].order != null)
        {
          this.report_data[i].order.total_secondary_order_amount = Math.round(this.report_data[i].order.total_secondary_order_amount);
        }
        
        if(this.report_data[i].order != null)
        {
          this.report_data[i].order.total_primary_order_amount = Math.round(this.report_data[i].order.total_primary_order_amount);
        }
      }
      
      this.loader = false;
    })
  }
  
  excel_data:any=[];
  exportAsXLSX():void 
  {
    this.loader = true;
    this.excel_data = [];
    for(let i=0;i<this.report_data.length;i++){
      this.excel_data.push({'Sales Executive':this.report_data[i].name, 'Reporting Manager':this.report_data[i].reporting_manager,'Attendance Start':this.report_data[i].attendance ? this.report_data[i].attendance.start_time : 'N.A','Attendance Stop':this.report_data[i].attendance ? this.report_data[i].attendance.stop_time : 'N.A','Dealer Check-In':this.report_data[i].activity ? this.report_data[i].activity.total_dealer : 'N.A','Direct Dealer Check-In':this.report_data[i].activity ? this.report_data[i].activity.total_direct_dealer : 'N.A','Channel Partner Check-In':this.report_data[i].activity ? this.report_data[i].activity.total_channel_partner : 'N.A','Primery Order':this.report_data[i].order ? 'Rs. '+this.report_data[i].order.total_primary_order_amount : 'N.A','Secondary Order':this.report_data[i].order ? 'Rs. '+this.report_data[i].order.total_secondary_order_amount : 'N.A','New Lead':this.report_data[i].dr ? this.report_data[i].dr.total_dr : 'N.A'});
    }
    console.log(this.excel_data);
    this.db.exportAsExcelFile(this.excel_data, moment(this.date).format('D MMM Y')+' Work Report');
    this.loader = false;
  }
}