import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import * as moment from 'moment';

import {  Router } from '@angular/router';

@Component({
  selector: 'app-attendence',
  templateUrl: './live-track.component.html',
  styleUrls: ['./live-track.component.scss']
})
export class LiveTrackComponent implements OnInit {
  data:any={};
  data_not_found=false;
  loader:any;
  count_1:any;
  count_2:any;
  show_today:boolean=true;
  pagelimit:any=50;
  filter:any=false;
  skelton:any={}
user_data:any=[];

  constructor(public rout:Router,public serve:DatabaseService) {
    this.skelton = new Array(10);
  }
  
  ngOnInit() 
  {
    this.user_list();
  }
  
  attendancelist:any=[];

  user_list()
  {
    this.serve.fetchData('',"Attendance/sales_user_data").subscribe((result:any)=>
    {
      console.log(result);
      this.user_data = result;
    });
  }
  
  attendance_list()
  {
    this.loader=1;
    if( Object.getOwnPropertyNames(this.data).length != 0)
    {
      this.pagelimit = 0;
      this.attendancelist = [];
    }
    if(this.data.start_date && this.data.end_date)
    {
      this.data.start_date = moment(this.data.start_date).format('YYYY-MM-DD');
      this.data.end_date = moment(this.data.end_date).format('YYYY-MM-DD');
    }
    
    this.serve.fetchData({'start':this.attendancelist.length,'pagelimit':this.pagelimit,'search':this.data},"Attendance/live_track_today")
    .subscribe(((result:any)=>{
      console.log(result);
      this.attendancelist = this.attendancelist.concat(result['result']);
      console.log(this.attendancelist);
      
      if(this.attendancelist.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
        
      }
      
      setTimeout (() => {
        this.loader='';
        
      }, 700);
    }))
    
  }

  // change_tab(fn_name,type)
  // {
  //   this.attendancelist = [];
  //   this.data = {};
  //   this.attendance_list(fn_name,type);
  // }

  clear_filter(){
    this.data.user_name='';
    this.data.date_created=undefined;
    var func_name;
    var type;
    if(this.show_today == true)
    {
      func_name = 'live_track_today';
      type = 1;
    }
    else
    {
      func_name = 'live_track_new';
      type = 2;
    }
    // this.attendance_list(func_name,type);
    
  }
}
