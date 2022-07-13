import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-target-report',
  templateUrl: './target-report.component.html',
})
export class TargetReportComponent implements OnInit {
  yearList:any=[];
  orderType:any;
  loader:any=false;
  orderReportData:any=[];
  date:any=new Date();
  currentYear:any;
  @ViewChild('table') table: ElementRef;
  
  orderDataArray:any=[];
  futureYear:any;
  skelton:any={}
  
  constructor(public db:DatabaseService,public route:ActivatedRoute) {
    this.skelton = new Array(10);
    this.currentYear  =Date.now();
    this.currentYear = moment(this.currentYear).format('YYYY');
    this.futureYear = new Date().getFullYear() + 1;
    
    this.route.params.subscribe( params => {
      console.log(params);
      this.orderType = params.type;
      console.log(this.orderType);
      if(this.orderType)
      {
        this.getOrderReportData();
      }
    });
  }
  
  ngOnInit() {
  }
  year:any;
  
  getOrderReportData()
  {
    
    this.loader=true;
    let url:any;
    
    if(this.orderType==1)
    {
      url='User/userTargetReport'
    }
    else
    {
      url="User/userTargetReportSecondary"
    }
    this.db.fetchData({year:this.year},url).subscribe((result)=>{
      console.log(result);
      this.orderDataArray=result['id'];
      
      for(var i=0; i<this.orderDataArray.length; i++)
      {
        for(var j=0; j<this.orderDataArray[i]['month_data'].length; j++)
        {
          this.orderDataArray[i]['month_data'][j]['target'] = Math.round(this.orderDataArray[i]['month_data'][j]['target']);
          this.orderDataArray[i]['month_data'][j]['balance'] = Math.round(this.orderDataArray[i]['month_data'][j]['balance']);
          this.orderDataArray[i]['month_data'][j]['achivement'] = Math.round(this.orderDataArray[i]['month_data'][j]['achivement']);
        }
      }
      this.loader=false;
    });
  }
  
  ExportToExcel()
  {
    console.log(this.table.nativeElement);
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    XLSX.writeFile(wb, this.orderType==1?'Primary Order Report.xlsx':'Secondry OrderReport.xlsx');
    
  }
  
}
