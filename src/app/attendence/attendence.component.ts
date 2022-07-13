import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService'
import * as moment from 'moment';
import { Router } from '@angular/router';
// import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { DialogComponent } from '../dialog.component';
import { UserEmailModalComponent } from '../user/user-email-modal/user-email-modal.component';
import { MatDialog } from '@angular/material';
import { ImageModuleComponent } from '../image-module/image-module.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { sessionStorage } from '../localstorage.service';
import { AttendancemodalComponent } from '../attendancemodal/attendancemodal.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

// import { log } from 'console';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent implements OnInit {
  data: any = {};
  start_attend_time: string;
  loader: any;
  value: any = {};
  att_temp: any = [];
  data_not_foun: any = false;
  pagelimit: any = 50;
  skelton: any = {};
  data_not_found = false;
  today_date: Date;
  today_day:any;
  show: boolean = false;
  flag: number = 0;
  enableInput: boolean = false;
  newToday_date: string;
  logIN_user:any;
  uid:any;
  uname:any;
  pagenumber:any;
  total_page:any;
  count: any;
  start:any=0;
  page_limit:any=50
  exp_loader:any=false;

  assign_login_data2: any = [];

  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;

  today_and_all_tab:any = 1;










  constructor(public rout: Router, public serve: DatabaseService, public dialog: DialogComponent, public toast: ToastrManager,public dialogs: MatDialog,public dialog2: MatDialog,public session: sessionStorage) {

    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;

    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'Attendance');
    console.log(index);

    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;

    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);


    this.today_date = new Date();
    this.today_day = this.today_date.getDay();
    console.log(this.today_day);
    if(this.today_day == 5){
      this.today_day = 'Friday'
    }


    switch(this.today_day) {
      case 0:{
        this.today_day='Sunday';
        break;
      }
      case 1:{
        this.today_day='Monday';

        break;
      }
      case 2:{
        this.today_day='Tuesday';

        break;
      }
      case 3:{
        this.today_day='Wednesday';

        break;
      }
      case 4:{
        this.today_day='Thursday';

        break;
      }
      case 5:{
        this.today_day='Friday';

        break;
      }
      case 6:{
        this.today_day='Saturday';

        break;
      }
      default:{
        break;
      }
    }

    console.log(this.today_day);


    console.log(this.today_date);
    this.newToday_date = moment(this.today_date).format('YYYY-MM-DD')
    console.log(this.newToday_date);
    this.logIN_user = JSON.parse(localStorage.getItem('st_user'));
    console.log(this.logIN_user);
    this.uid = this.logIN_user['data']['id'];
    this.uname = this.logIN_user['data']['name'];

  }

  ngOnInit() {
    this.attendance_list('getattendance_today', 1);

  }


  attendancelist: any = [];
  show_today: boolean = true;
  count_1: any;
  count_2: any;
  count_3: any;
absent:boolean=true;
active_present_absent: boolean = true;
attendence_type : any ='Present';

  change_tab(fn_name, type) {
    this.attendancelist = [];
    this.data={}
    this.attendence_type = 'Present';
    this.attendance_list(fn_name, type);

  }
  change_attendence_type_tab(fn_name , type ,attendenceType){

    this.attendence_type = attendenceType;

    this.attendancelist = [];
    this.data={};

    this.attendance_list(fn_name , type);

  }
  sales:any=[];
    refresh(func_name, type){
    this.data = '';
    this.attendance_list(func_name, type);
    }
  attendance_list(func_name, type) {
    this.exp_loader = true;
    
    this.loader = 1;
    if (Object.getOwnPropertyNames(this.data).length != 0) {
      // this.pagelimit = 0;
      this.attendancelist = [];
    }
    if(type == 1){
      this.today_and_all_tab = 1;
    }else if(type == 2){
      this.today_and_all_tab = 2;
    }
    if (this.data.date_created)
    this.data.date_created = moment(this.data.date_created).format('YYYY-MM-DD');
    if (this.data.date_from)
    this.data.date_from = moment(this.data.date_from).format('YYYY-MM-DD');
    if (this.data.date_to)
    this.data.date_to = moment(this.data.date_to).format('YYYY-MM-DD');



    this.serve.fetchData({ 'user_id': this.assign_login_data2.id, 'start': this.start, 'pagelimit': this.pagelimit, 'search': this.data, 'user_type': this.assign_login_data2.type, 'attendence_type':this.attendence_type }, "Attendance/" + func_name)
    .subscribe(((result: any) => {
      console.log(result);
      console.log(result);
      this.exp_loader = false;

      if(type==1){
      this.attendancelist = result;
      }
      if(type==2){
        this.attendancelist = result['attendence_data'];
        }
      console.log(this.attendancelist);

      // console.log(this.attendancelist[0]['date_created']);

      // console.log(tmpDay);

      for(let i = 0; i < this.attendancelist.length; i++){
        console.log(this.attendancelist[i].today_primary_sales);

        this.attendancelist[i].date_created_day = moment(this.attendancelist[i].date_created,'YYYY.MM.DD').format("dddd");

        this.attendancelist[i].today_primary_sales = parseFloat(this.attendancelist[i].today_primary_sales)
        // this.sales=(parseInt(this.sales)).toFixed(2)
        this.attendancelist[i].today_primary_sales=this.attendancelist[i].today_primary_sales.toFixed(2)
        console.log(this.sales);


      }



      for (let i = 0; i < this.attendancelist.length; i++) {
        for(let j = 0; j < this.attendancelist[i].length; j++){
          if( this.attendancelist[i][j].stop_reading == "") {
            this.attendancelist[i][j].start_reading=parseInt(this.attendancelist[i][j].start_reading);
          }
          else{
            this.attendancelist[i][j].stop_reading=parseInt(this.attendancelist[i][j].stop_reading);
            this.attendancelist[i][j].start_reading=parseInt(this.attendancelist[i][j].start_reading);
          }
        }
      }
      console.log(this.attendancelist);

      this.att_temp = result;
      if (type == 1) {
        this.count_1 = this.attendancelist.length;
        this.count_2 = result.count;
        this.show_today = true;
        this.absent = false;

      }
      else {
        this.count_3 = result.total_no_of_attendence;

        this.count_1 = result.count;
        this.count_2 = this.attendancelist.length;
        this.show_today = false;
        this.absent = false;

        this.count = result['count'];
        this.total_page = Math.ceil(this.count_3/this.page_limit);
        this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
      }
      if(this.attendence_type=='Present'){

        this.active_present_absent = true;

      }else if(this.attendence_type=='Absent'){

        this.active_present_absent = false;

      }
      console.log(this.attendancelist);
      console.log('in');
      if (this.attendancelist.length== 0) {
        this.data_not_found = true;
        console.log( this.data_not_found)

      }
      else{
        this.data_not_found = false;
        console.log( this.data_not_found)


      }
      setTimeout(() => {
        this.loader = '';

      }, 100);


    }))




  }
  absent3(){
      this.serve.fetchData({ }, 'Attendance/today_absent')
      .subscribe(res => {
        console.log(res);
        this.attendance_list('getattendance_today', 1);
        this.dialog.success_att('Reset Done', 'Attendance has been updated.');
      }, err => {
        console.log(err);
        this.dialog.error('Something went wrong! Try Again ...');
      });

  }
  reset_attendance(id: any) {
    var value = this.dialog.reset_att().then((result) => {
      console.log(result);
      if (result) {
        this.serve.fetchData({ 'id': id }, 'Attendance/update_attendance')
        .subscribe(res => {
          console.log(res);
          this.attendance_list('getattendance_today', 1);
          this.dialog.success_att('Reset Done', 'Attendance has been updated.');
        }, err => {
          console.log(err);
          this.dialog.error('Something went wrong! Try Again ...');
        });
      }
    });
  }
leave:any
  excel_data: any = [];
  attendancelist1:any=[]
  leave_type:any
  description:any

exportAsXLSX() {
  this.loader = 1;
  if (Object.getOwnPropertyNames(this.data).length != 0) {
    // this.pagelimit = 0;
    this.attendancelist = [];
  }

  if (this.data.date_created)
  this.data.date_created = moment(this.data.date_created).format('YYYY-MM-DD');
  if (this.data.date_from)
  this.data.date_from = moment(this.data.date_from).format('YYYY-MM-DD');
  if (this.data.date_to)
  this.data.date_to = moment(this.data.date_to).format('YYYY-MM-DD');



  this.serve.fetchData({
    'user_id': this.assign_login_data2.id, 'search': this.data, 'user_type': this.assign_login_data2.type
 ,'attendence_type':this.attendence_type}, "Attendance/getattendance_today_list_for_excel")
  .subscribe(((result: any) => {
    console.log(result);
    console.log(result);

    this.attendancelist1 = result;

    console.log(this.attendancelist1);


    // console.log(tmpDay);


    for (let i = 0; i < this.attendancelist1.length; i++) {
      if(this.attendancelist1[i].leave){
        this.leave='Yes'
        this.leave_type=(this.attendancelist1[i].leave['leave_type'])
        this.description=(this.attendancelist1[i].leave['description'])

console.log(this.leave_type);

      
      this.excel_data.push({ 'Date': this.attendancelist1[i].attend_date, 'Employe Code': this.attendancelist1[i].employee_id,'User Name': this.attendancelist1[i].name, 'Leave':this.leave,'Leavee Type': this.leave_type,'Description':this.description,
    });
  }
  else{
 

  
  this.excel_data.push({ 'Date': this.attendancelist1[i].attend_date, 'Employe Code': this.attendancelist1[i].employee_id,'User Name': this.attendancelist1[i].name, 'Start Time': this.attendancelist1[i].start_time, 'Start Location': this.attendancelist1[i].start_address, 'Stop Time': this.attendancelist1[i].stop_time, 'Stop Location': this.attendancelist1[i].stop_address,
});
}
  }
  this.serve.exportAsExcelFile(this.excel_data, 'Attendance Sheet');


    console.log(this.attendancelist);

    this.att_temp = result;


    console.log(this.attendancelist);
    console.log('in');



  }))




}
exportAsXLSX1() {
  this.loader = 1;
  if (Object.getOwnPropertyNames(this.data).length != 0) {
    // this.pagelimit = 0;
  }

  if (this.data.date_created)
  this.data.date_created = moment(this.data.date_created).format('YYYY-MM-DD');
  if (this.data.date_from)
  this.data.date_from = moment(this.data.date_from).format('YYYY-MM-DD');
  if (this.data.date_to)
  this.data.date_to = moment(this.data.date_to).format('YYYY-MM-DD');



  this.serve.fetchData({
    'user_id': this.assign_login_data2.id, 'search': this.data, 'user_type': this.assign_login_data2.type,'attendence_type':this.attendence_type}, "Attendance/get_all_attendance_list_for_excel")
  .subscribe(((result: any) => {
    console.log(result);
    console.log(result);

    this.attendancelist1 = result



    // console.log(tmpDay);

//     for (let k= 0; k < this.attendancelist1[i].user_attendence_data[j].leave.length; k++) {
   
//       this.leave='Yes'
//       this.leave_type=(this.attendancelist1[i].user_attendence_data[j].leave['leave_type'])
//       this.description=(this.attendancelist1[i].user_attendence_data[j].leave['description'])


// this.excel_data.push({ 'Date': this.attendancelist1[i].attend_date, 'Employe Code': this.attendancelist1[i].user_attendence_data[j].employee_id,'User Name': this.attendancelist1[i].user_attendence_data[j].name,'Leave':this.leave,'Leavee Type': this.leave_type,'Description':this.description,
// });
// }
    for (let i = 0; i < this.attendancelist1.length; i++) {

      for (let j = 0; j < this.attendancelist1[i].user_attendence_data.length; j++) {
       if(this.attendancelist1[i].user_attendence_data[j].leave){
        this.leave='Yes'

        this.leave_type=(this.attendancelist1[i].user_attendence_data[j].leave['leave_type'])
        this.description=(this.attendancelist1[i].user_attendence_data[j].leave['description'])

console.log(this.leave_type);

      
      this.excel_data.push({ 'Date': this.attendancelist1[i].date,  'Employee Code': this.attendancelist1[i].user_attendence_data[j].employee_id,'User Name': this.attendancelist1[i].user_attendence_data[j].name, 'Leave':this.leave,'Leavee Type': this.leave_type,'Description':this.description,
    });
       }
else{

this.excel_data.push({ 'Date': this.attendancelist1[i].date, 'Employee Code': this.attendancelist1[i].user_attendence_data[j].employee_id,'User Name': this.attendancelist1[i].user_attendence_data[j].name, 'Start Time': this.attendancelist1[i].user_attendence_data[j].start_time, 'Start Location': this.attendancelist1[i].user_attendence_data[j].start_address, 'Stop Time': this.attendancelist1[i].user_attendence_data[j].stop_time, 'Stop Location': this.attendancelist1[i].user_attendence_data[j].stop_address,'Weekly Off': this.attendancelist1[i].user_attendence_data[j].weekly_off,
});}}}
  this.serve.exportAsExcelFile(this.excel_data, 'Attendance Sheet');


    console.log(this.attendancelist);

    this.att_temp = result;


    console.log(this.attendancelist);
    console.log('in');
this.excel_data=[]


  }))




}
getOrders(){

}
filter_attendance(data) {
  console.log(data);
  console.log(this.data);
  this.serve.fetchData({ data: this.data.name, date: moment(this.data.date_created).format('YYYY-MM-DD') }, "Attendance/getAttendance")
  .subscribe((result => {
    console.log(result);

    // this.attendancelist = result;
    console.log(result);
    this.attendancelist = result;
    console.log(this.attendancelist);
    //     for (let i = 0; i < this.attendancelist.length; i++) {
    // this.attendence[i]

    //     }
    console.log('in');
    if (this.data.name == '') {
      this.attendance_list('getAttendance', 2);
    }
  }))
}
getItemsList(search) {
  console.log(search);
  this.attendancelist = [];


  for (var i = 0; i < this.att_temp.length; i++) {
    search = search.toLowerCase();
    this.tmpsearch1 = this.att_temp[i]['name'].toLowerCase();
    if (this.tmpsearch1.includes(search)) {
      // console.log(this.orderlist);
      console.log(search);

      this.attendancelist.push(this.att_temp[i]);
    }

  }



  console.log(this.attendancelist);

}
tmpsearch1: any = {};


test(){
  console.log("in test function ");

}

updateReading(stopReading, attendenceID) {
  console.log(stopReading);
  console.log(attendenceID);


  this.serve.fetchData({ 'id': attendenceID, "stop_reading": stopReading,'uid':this.uid,'name':this.uname }, "/Attendance/update_stop_reading").subscribe((result) => {
    console.log(result);
  });


  this.show = false;
  this.flag = 0
  this.attendance_list('getAttendance', 2)

}



goTo(SendName,SendDate,type) {
  console.log(SendName,SendDate);

  if (type == 'checkin') {
    this.rout.navigate(['/checkin', { selectedUser: SendName,selectedDate: SendDate }]);
  }

  else if (type == 'primary_sale') {
    this.rout.navigate(['/order-list', { selectedUser: SendName,selectedDate: SendDate,'from':'attendence' }]);
  }

  else if (type == 'secondary_sale') {
    this.rout.navigate(['/secondary-order-list', { selectedUser: SendName,selectedDate: SendDate,'from':'attendence' }]);
  }

  else if (type == 'contractor_meet') {
    this.rout.navigate(['/contractor-meet', { selectedUser: SendName,selectedDate: SendDate }]);
  }

  else if (type == 'Expense') {
    console.log(SendName);
    console.log(SendDate);

    this.rout.navigate(['/expense-list', { selectedUser: SendName,selectedDate: SendDate }]);
  }

  else {

  }

}
imageModel(start_meter_image, stop_meter_image)
{
  const dialogRef = this.dialogs.open( ImageModuleComponent, {
    // width: '500px',
    data:{
      start_meter_image,
      stop_meter_image,
    }});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');

    });

  }

  conInt(val : any){
    return val = parseFloat(val).toFixed(2);  //function convert data into float then number
  }


  conInt2(val : any){
    return val = parseInt(val)                // function convert dataa into int
  }


  enable_error() {
    console.log("error function call");
    console.log(this.data);

    this.toast.errorToastr("Stop reading must be greater than Start reading");

  }
  attendancemodal(p)
  {

    const dialogRef = this.dialog2.open(AttendancemodalComponent, {
      panelClass:'rightmodal',
      data:{
       p
      }});
      dialogRef.afterClosed().subscribe(result => {

      });

  }
}


