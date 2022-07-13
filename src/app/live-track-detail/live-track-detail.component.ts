import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';

@Component({
  selector: 'app-live-track-detail',
  templateUrl: './live-track-detail.component.html',
  styleUrls: ['./live-track-detail.component.scss']
})
export class LiveTrackDetailComponent implements OnInit {
  user_id: any;
  loader: any;
  data_not_found:any = false;
  date:any;
  filter:any;
  constructor(public rout:Router,public route:ActivatedRoute,public serve:DatabaseService) {
    this.route.params.subscribe( params => {
      console.log(params);
      this.user_id = params.id;
      this.date=params.date;
      console.log(this.user_id);
    });
    this.attendance_list();
    
  }
  
  ngOnInit() {
    
  }
  
  attendancelist:any=[];
  
  //  attendancelist:any;
  attendance_list(){
    this.loader=1;
    
    console.log(this.user_id);
    this.serve.fetchData({user_id:this.user_id,date:this.date},"Attendance/live_track_details").subscribe((result=>{
      console.log(result);
      // this.attendancelist = result;
      console.log(result);
      this.attendancelist = result;
      console.log(this.attendancelist);
      console.log('in');
    }))
    setTimeout (() => {
      this.loader='';
    }, 700);
    if(this.attendancelist.length == 0){
      this.data_not_found = true  ;
      
    }
    
  }
  //   filter_checkins(data){
  // console.log(data);
  // console.log(this.data);
  //     this.serve.fetchData({date:moment(this.data.date_created).format('YYYY-MM-DD'),user_name:this.data.user_name},"Attendance/live_track").subscribe((result=>{
  // console.log(result);
  //       // this.attendancelist = result;
  //       this.attendancelist = result;
  //       console.log(this.attendancelist);
  //       console.log('in');
  //     }))
  //   }
}

// 

