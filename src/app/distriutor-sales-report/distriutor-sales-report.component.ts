import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { DatabaseService } from 'src/_services/DatabaseService'
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-distriutor-sales-report',
  templateUrl: './distriutor-sales-report.component.html',
  styleUrls: ['./distriutor-sales-report.component.scss']
})
export class DistriutorSalesReportComponent implements OnInit {
  
  loader:any=false;
  currentYear:any;
  futureYear:any;
  order_data:any = [];
  skelton:any={}

  @ViewChild('table') table: ElementRef;
  
  constructor(public db:DatabaseService) 
  { 
    this.skelton = new Array(10);
    this.currentYear  =Date.now();
    this.currentYear = moment(this.currentYear).format('YYYY');
    this.futureYear = new Date().getFullYear() + 1;
    
    this.getOrderReportData();
  }
  
  getOrderReportData()
  {
    this.loader=true;
    
    this.db.fetchData({},'DistributionNetwork/getOrderReportData').subscribe((result)=>{
      console.log(result);
      this.order_data = result['getOrderReportData'];
      this.loader=false;
    });
  }
  
  ExportToExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb,'Channel-partner-wise-sales-report.xlsx');
  }
  
  ngOnInit() {
  }
  
}
