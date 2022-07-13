import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService'
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog.component';
import * as moment from 'moment';
import { __values } from 'tslib';
import { DailyactivityComponent } from '../dailyactivity/dailyactivity.component';
import { MatDialog } from '@angular/material';
import { ImageModuleComponent } from '../image-module/image-module.component';
import { Location } from '@angular/common';

import { sessionStorage } from '../localstorage.service';
import { JointmodalComponent } from '../jointmodal/jointmodal.component';
import { CheckindocumentComponent } from '../checkindocument/checkindocument.component';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  start_attend_time: string;
  loader: any;
  data_not_found = false;
  data: any = {};
  checkins: any = [];
  jointname:String;
  show_today: boolean = true;
  count_1: any;
  count_2: any;
  count_3: any;
  assign_login_data2: any = [];

  assign_login_data: any = [];
  pagelimit: any = 50;
  skelton: any = {};
  today_date = new Date().toISOString().slice(0,10);
  searchData: any;
  backButton: boolean = false;
  total_page:any;
  pagenumber:any;
  districtAppend: String;

  start:any=0;






  constructor(public serve: DatabaseService, public navparams: ActivatedRoute,public location: Location, public route: Router, public dialog: DialogComponent,public dialog2: MatDialog,public session: sessionStorage) {
    console.log(this.data.user_name)
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;
    console.log(this.assign_login_data);

    console.log(this.assign_login_data2);

    console.log(this.navparams);

    console.log(this.navparams['params']['_value']['selectedUser']);
    this.searchData = (this.navparams['params']['_value']);
    console.log(this.searchData);

    console.log(this.today_date);


    console.log(this.searchData);
    if (this.searchData.selectedUser && this.searchData.selectedDate) {
      this.backButton = true;
      if(this.searchData.selectedDate == this.today_date){
        this.checkins = [];
        // this.data = {};
        this.data.user_name = this.searchData.selectedUser;
        this.distributorList('get_today_checkin_new',1);
    console.log(this.data.user_name);

      }
      else{
        this.checkins = [];
        this.data.user_name = this.searchData.selectedUser;
        this.data.date_created = this.searchData.selectedDate;
        this.distributorList('get_all_checkin_new',2);
      }
      console.log("in navparams");

    }

    if(!this.searchData.selectedUser){
      this.distributorList('get_today_checkin_new',1);
      console.log('hlo')
  }



    console.log('gfvdb');
    this.skelton = new Array(10);
  }

  ngOnInit() {





  }

  refresh(func_name,type,){
    // this.checkins = [];
      this.data = {};
      this.distributorList(func_name,type,)
  }
  distributorList(func_name,type,)
  {

    console.log(this.pagelimit);
    this.loader=1;
    console.log(Object.getOwnPropertyNames(this.data).length);

    if( Object.getOwnPropertyNames(this.data).length != 0)
    {
      console.log("yes");

      // this.pagelimit = 0;
      this.checkins = [];
    }
    if(this.data.date_created)
    {
      this.data.date_created=moment(this.data.date_created).format('YYYY-MM-DD');

    }
    if(this.data.date_from)
    {
      this.data.date_from=moment(this.data.date_from).format('YYYY-MM-DD');
    }
    console.log(this.data.date_to);
    if(this.data.date_to)
    {
      this.data.date_to=moment(this.data.date_to).format('YYYY-MM-DD');
      console.log(this.data.date_to);

    }
    this.serve.fetchData({'user_id':this.assign_login_data2.id,'start':this.start,'pagelimit':this.pagelimit,'search':this.data, 'user_type': this.assign_login_data2.type},"Distributors/"+func_name)
    .subscribe(((result:any)=>{
      console.log(result);
      this.checkins = (result['result']);
      console.log(this.checkins);

      for(let i = 0 ;i<this.checkins.length ;i++){
        this.checkins[i].order_grand_total=parseFloat(this.checkins[i].order_grand_total)
        this.checkins[i].order_grand_total=this.checkins[i].order_grand_total.toFixed(2)
if(this.checkins[i].order_grand_total== "NaN"){
  this.checkins[i].order_grand_total=0;
  console.log(this.checkins[i].order_grand_total);

}
      }
      if(type == 1)
      {
        this.count_1 = this.checkins.length;
        this.count_2 = result.all_count;
        this.show_today = true;
      }
      else
      {
        this.count_3 = result.all_count;
        this.count_2 = this.checkins.length;
        this.show_today = false;
        this.total_page = Math.ceil(this.count_3/this.pagelimit);
        console.log(this.total_page);

         this.pagenumber = Math.ceil(this.start/this.pagelimit)+1;
        console.log(this.total_page);
      }

      console.log(this.checkins);
      if(this.checkins.length ==0){
        this.data_not_found=true;
      } else {
        this.data_not_found=false;
      }
      setTimeout (() => {
        this.loader='';

      }, 100);
    }))
  }

  opendoc(list)
  {

    const dialogRef = this.dialog2.open(CheckindocumentComponent, {
      width: '768px',
      data:{
        list
      }});
      dialogRef.afterClosed().subscribe(result => {

      });

    }


  change_tab(fn_name, type) {
    this.checkins = [];
    this.data = {};
    this.distributorList(fn_name, type);
  }
  excel_data: any = [];
//   exportAsXLSX(): void {
//     for (let i = 0; i < this.checkins.length; i++) {
// if(this.checkins[i].dr_type == '1')
// {
//   this.checkins[i].dr_type='Distributor'
// }
// if(this.checkins[i].dr_type == '6')
// {
//   this.checkins[i].dr_type='Others'
//   console.log(this.checkins[i].dr_type)
// }
// if(this.checkins[i].dr_type == '5')
// {
//   this.checkins[i].dr_type='End User'
// }
// if(this.checkins[i].dr_type == '9')
// {
//   this.checkins[i].dr_type='Project'
// }
// if(this.checkins[i].dr_type == '3')
// {
//   this.checkins[i].dr_type='Retailer'
// }
// if(this.checkins[i].dr_type == '7')
// {
//   this.checkins[i].dr_type='Direct Dealer'
// }



//       this.excel_data.push({ 'Date': this.checkins[i].activity_date, 'Sales User': this.checkins[i].exec_name, 'Type': this.checkins[i].dr_type , 'Company Name': this.checkins[i].other_name == '' ? this.checkins[i].company_name : this.checkins[i].other_name, 'Check In': this.checkins[i].visit_start, 'Check Out': this.checkins[i].visit_end, 'Remark': this.checkins[i].description,'Order': this.checkins[i].isOrderExist,'Order Amount': this.checkins[i].order_total });

//     }
//     console.log(this.excel_data);
//     this.serve.exportAsExcelFile(this.excel_data, 'Check IN  Sheet');
//   }

jointname2:any= [];
  exportAsXLSX()
  {



    if(this.data.date_created)
    {
      this.data.date_created=moment(this.data.date_created).format('YYYY-MM-DD');
      if(this.data.date_from)
      {
        this.data.date_from=moment(this.data.date_from).format('YYYY-MM-DD');
      }
      console.log(this.data.date_to);
      if(this.data.date_to)
      {
        this.data.date_to=moment(this.data.date_to).format('YYYY-MM-DD');
        console.log(this.data.date_to);

      }
    }

    this.serve.fetchData({ 'user_id': this.assign_login_data2.id, 'search': this.data, 'user_type': this.assign_login_data2.type
},"Distributors/get_today_checkin_new")
    .subscribe(((result:any)=>{
      console.log(result);
      this.checkins = (result['result']);

      console.log(this.checkins);

      for (let i = 0; i < this.checkins.length; i++) {
        // this.districtAppend='';

        if(this.checkins[i].dr_type == '1')
        {
          this.checkins[i].dr_type='Distributor'
        }
        if(this.checkins[i].dr_type == '6')
        {
          this.checkins[i].dr_type='Others'
          console.log(this.checkins[i].dr_type)
        }
        if(this.checkins[i].dr_type == '5')
        {
          this.checkins[i].dr_type='End User'
        }
        if(this.checkins[i].dr_type == '9')
        {
          this.checkins[i].dr_type='Project'
        }
        if(this.checkins[i].dr_type == '3')
        {
          this.checkins[i].dr_type='Retailer'
        }
        if(this.checkins[i].dr_type == '7')
        {
          this.checkins[i].dr_type='Direct Dealer'
        }






              this.excel_data.push({ 'Date': this.checkins[i].activity_date, 'Sales User': this.checkins[i].exec_name, 'Type': this.checkins[i].dr_type , 'Company Name': this.checkins[i].other_name == '' ? this.checkins[i].company_name : this.checkins[i].other_name, 'Check In': this.checkins[i].visit_start, 'Check Out': this.checkins[i].visit_end, 'Remark': this.checkins[i].description, });

            }


    


            console.log(this.excel_data);
            this.serve.exportAsExcelFile(this.excel_data, 'Check IN  Sheet');
this.excel_data=[]



      console.log(this.checkins);
      console.log(this.jointname);



    }))
  }

  jointname1: any=[];
  exportAsXLSX1()
  {



    if(this.data.date_created)
    {
      this.data.date_created=moment(this.data.date_created).format('YYYY-MM-DD');
      if(this.data.date_from)
      {
        this.data.date_from=moment(this.data.date_from).format('YYYY-MM-DD');
      }
      console.log(this.data.date_to);
      if(this.data.date_to)
      {
        this.data.date_to=moment(this.data.date_to).format('YYYY-MM-DD');
        console.log(this.data.date_to);

      }
    }

    this.serve.fetchData({ 'user_id': this.assign_login_data2.id, 'search': this.data, 'user_type': this.assign_login_data2.type
},"Distributors/get_all_checkin_new")
    .subscribe(((result:any)=>{
      console.log(result);
      this.checkins = (result['result']);
      console.log(this.checkins);
      for (let i = 0; i < this.checkins.length; i++) {
        if(this.checkins[i].dr_type == '1')
        {
          this.checkins[i].dr_type='Distributor'
        }
        if(this.checkins[i].dr_type == '6')
        {
          this.checkins[i].dr_type='Others'
          console.log(this.checkins[i].dr_type)
        }
        if(this.checkins[i].dr_type == '5')
        {
          this.checkins[i].dr_type='End User'
        }
        if(this.checkins[i].dr_type == '9')
        {
          this.checkins[i].dr_type='Project'
        }
        if(this.checkins[i].dr_type == '3')
        {
          this.checkins[i].dr_type='Retailer'
        }
        if(this.checkins[i].dr_type == '7')
        {
          this.checkins[i].dr_type='Direct Dealer'
        }
        for (let j = 0; j < this.checkins[i].joiner.length; j++) {
          console.log('hlooo');

          // console.log(this.checkins[i].joiner);

         this.jointname= (this.checkins[i].joiner[j].name).toString()
      //  this.jointname1 = this.checkins[i].joiner[j]['name']
         console.log(this.checkins[i].joiner);
         console.log(this.jointname);
         this.jointname1.push(this.jointname);
         console.log(this.jointname1);




        }




              this.excel_data.push({ 'Date': this.checkins[i].activity_date, 'Sales User': this.checkins[i].exec_name, 'Type': this.checkins[i].dr_type , 'Company Name': this.checkins[i].other_name == '' ? this.checkins[i].company_name : this.checkins[i].other_name, 'Check In': this.checkins[i].visit_start, 'Check Out': this.checkins[i].visit_end, 'Remark': this.checkins[i].description, });

            }
            console.log(this.excel_data);
            this.serve.exportAsExcelFile(this.excel_data, 'Check IN  Sheet');
this.excel_data=[]



      console.log(this.checkins);


    }))
  }
  dailyModal(list)
  {

    const dialogRef = this.dialog2.open(DailyactivityComponent, {
      width: '768px',
      data:{
        list
      }});
      dialogRef.afterClosed().subscribe(result => {

      });

    }
    openjoint(list)
  {

    const dialogRef = this.dialog2.open(JointmodalComponent, {
      width: '500px',
      data:{
        list
      }});
      dialogRef.afterClosed().subscribe(result => {

      });

    }


    imageModel(start_meter_image)
    {
      const dialogRef = this.dialog2.open( ImageModuleComponent, {
        // width: '500px',
        data:{
          start_meter_image,
          // stop_meter_image,
        }});
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          console.log('The dialog was closed');

        });

      }



      back(): void {
        console.log("location back method calss");
        console.log(this.location);
        this.location.back()
      }
open(lat,lng){
window.open("http://www.google.com/maps/place/"+lat+'/'+lng)
}

      goTo( exec_name,company_name,activity_date,type ){
        console.log(exec_name);
        console.log(company_name);
        console.log(activity_date);
        console.log(type);

        if (type == 'primary_sale') {
          this.route.navigate(['/order-list', { 'selectedUser': exec_name,'selectedDate': activity_date,'company_name': company_name,'from':'checkin'}]);
        }

        else if (type == 'secondary_sale') {
          this.route.navigate(['/secondary-order-list', { 'selectedUser': exec_name,'selectedDate': activity_date,'company_name': company_name,'from':'checkin'}]);
        }

        else{

        }



      }

    }
