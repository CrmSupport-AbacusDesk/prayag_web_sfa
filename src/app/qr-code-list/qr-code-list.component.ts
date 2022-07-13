import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { DialogComponent } from '../dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-qr-code-list',
  templateUrl: './qr-code-list.component.html',
  styleUrls: ['./qr-code-list.component.scss']
})
export class QrCodeListComponent implements OnInit {
  data:any={};
  loader:any;
  qr_code_list:any=[];
  today_count:any=0;
  all_count:any=0;
  show_today:boolean=true;
  data_not_found:boolean=false;

  constructor(public rout:Router, public serve:DatabaseService, public dialog:DialogComponent) 
  { 
    this.qrcode_list(1);
  }
  
  ngOnInit() {
  }
  
  change_tab(type)
  {
    console.log(type);
    this.qrcode_list(type);
  } 
  
  qrcode_list(type)
  {
    this.loader=1;
    
    if(this.data.date_created)
      this.data.date_created = moment(this.data.date_created).format('YYYY-MM-DD');
    
    this.serve.fetchData({type:type, search:this.data},"product/qrcode_list")
    .subscribe(((result:any)=>{
      console.log(result);
      this.qr_code_list = result['data'];
      this.today_count = result['today_scan_count'];
      this.all_count = result['all_scan_count'];

      if(this.qr_code_list.length == '0')
      {
        this.data_not_found=true;
      }
      else
      {
        this.data_not_found=false;
      }

      if(type == '1')
      {
        this.show_today = true;
      }
      else
      {
        this.show_today = false;
      }
  
      setTimeout (() => {
        this.loader='';
        
      }, 700);
    }))
    
    
  }
}
