import { Route } from '@angular/compiler/src/core';
import {PageEvent} from '@angular/material/paginator';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { ContractorMeetStatusModalComponent } from '../contractor-meet-status-modal/contractor-meet-status-modal.component';
import { DialogComponent } from 'src/app/dialog.component';

import * as moment from 'moment';
import { LoginComponent } from 'src/app/login/login.component';
// import { ContractorMeetViewDetailsComponent } from 'src/app/contractor-meet-view-details/contractor-meet-view-details.component';
import { sessionStorage } from 'src/app/localstorage.service';
import { Location } from '@angular/common'


@Component({
  selector: 'app-contractor-meet-list',
  templateUrl: './contractor-meet-list.component.html'
})
export class ContractorMeetListComponent implements OnInit {
  tabActiveType:any={};
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  length=0;
  start=0;
  end=10;
  inc=0;
  pageEvent: PageEvent;
  companyType:any;
  login_data:any={};
  today_date:Date;
  searchData: any;
  backButton: boolean = false;
  data:any=[];
  allCount : any = [];
  contractorMeetListDetail : any = [];
  sendData : any = [];


  assign_login_data: any = [];
  assign_login_data2: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;


  constructor(public route:ActivatedRoute,public dialog: MatDialog,public location: Location, public dialog1:DialogComponent,public session:sessionStorage, public serve: DatabaseService,public rout:Router) {


    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    this.assign_login_data2 = this.assign_login_data.data;

    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'Event');
    console.log(index);

    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;

    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);



    this.login_data = this.session.getSession();

    console.log();
    this.today_date = new Date();


    this.login_data = this.login_data.value;
    this.login_data = this.login_data.data;
    console.log(this.login_data);

    this.searchData = (this.route['params']['_value']);
    console.log(this.searchData);


    if(this.searchData.selectedUser && this.searchData.selectedDate){
      this.backButton = true;
      console.log("in navparams");
      this.data.date_from = this.searchData.selectedDate;
      this.data.created_by = this.searchData.selectedUser;
      this.tabActive('tab0');
        this.getContractorMeetList();
    }

    else{

      if(this.login_data.id)
      {
        this.tabActive('tab0');
        this.getContractorMeetList();
      }
    }


  }
  ngOnInit() {

  }

  selectType(type){
    console.log(type);
    this.companyType=type;
    this.getContractorMeetList();



  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      console.log(this.pageSizeOptions);

    }
  }

  status:any;
  tabstatus: any='tab0';
  tabActive(tab:any)
  {
    this.tabstatus=tab;
    // alert(tab);
    this.tabActiveType = {};
    this.tabActiveType[tab] = true;
    this.start = 0 ;
    this.end = 10;
    if(tab=='tab0'){
      this.status="";
    }
    if(tab=='tab1'){
      // alert('pend');
      this.status="pending";
    }
    if(tab=='tab2'){
      this.status="approved";
    }
    if(tab=='tab3'){
      this.status="completed";
    }
    if(tab=='tab4'){
      this.status="rejected";
    }
    this.getContractorMeetList();
  }






  delete(id){


    this.serve.get_rqst2({id:id}, "Contractor/delete_meeting").subscribe((result) =>{
this.getContractorMeetList();
    })
  }


  open(){
    this.rout.navigate(['/contractor-meet-detail']);
  }

  public DateOfMeeting(event): void{

    this.data.dom_from=moment(event.value).format('YYYY-MM-DD');
    this.getContractorMeetList();
  }


  public onDate(event): void
  {
    this.data.date_from=moment(event.value).format('YYYY-MM-DD');
    this.getContractorMeetList();
  }


  getContractorMeetList(action:any='')
   {


    if(action == "refresh")
    {
      this.data = {};
      this.contractorMeetListDetail = [];

    }
    this.sendData = {
      user_id: this.login_data.id,
      created_by_user :this.data.created_by,
      created_by_mobile:this.data.mobile_number,
      created_by_user_email:this.data.email,
      company_name:this.data.company_name,
      date_from: this.data.date_from,
      dom_from: this.data.dom_from,
      type:this.companyType,

      start:this.start,
      page_size:this.pageSize,
      end:this.end,



      status:this.status,
    };


    // this.rout.navigate(['/product-list']);




    // console.log(this.sendData);


    this.serve.get_rqst2(this.sendData, "Contractor/filterMeetingData").subscribe((result) => {

      console.log(result);
      this.allCount = result['all_cont'];
      console.log(result.result.length);
      this.length = result.result.length;

      this.contractorMeetListDetail = result.result

      console.log(this.allCount);
      console.log((this.contractorMeetListDetail));

      console.log(this.login_data);

      if(this.tabstatus=='tab0'){
        this.length=this.allCount[0].all_cnt;
      }
      if(this.tabstatus=='tab1'){
        this.length=this.allCount[0].pend_cnt;
      }
      if(this.tabstatus=='tab2'){
        this.length=this.allCount[0].approved_cnt;
      }
      if(this.tabstatus=='tab3'){
        this.length=this.allCount[0].completed_cnt;
      }
      if(this.tabstatus=='tab4'){
        this.length=this.allCount[0].reject_cnt;
      }


    })

  }


  // statusModal1(id,status){
  //   console.log(id);
  //   console.log(status);
  //   const dialogRef = this.dialog.open(ContractorMeetViewDetailsComponent, {
  //     width:'400px',
  //     data:{
  //       data: id,
  //       status: status

  //     }});
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log(result);
  //     console.log('The dialog was closed');
  //     this.getContractorMeetList();
  //     });
  //   }




  statusModal(id,status){
    console.log(id);
    console.log(status);
    const dialogRef = this.dialog.open(ContractorMeetStatusModalComponent, {
      width:'400px',
      data:{
        data: id,
        status: status

      }});
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        console.log('The dialog was closed');
        this.getContractorMeetList();
      });
    }

    public getServerData(event:PageEvent){
      this.sendData = {
        date_created: this.data.date_created,

        created_by_user :this.data.created_by,
        created_by_mobile:this.data.mobile_number,
        created_by_user_email:this.data.email,
        company_name:this.data.company_name,
        start:this.start,
        page_size:this.pageSize,
        end:this.end,
      };
      if(event.pageIndex != 0){
        this.inc =1;

      }
      else{
        this.inc =0;
      }

     // alert(event.pageIndex);
      this.start = event.pageIndex*10 ;
      this.end = (event.pageIndex+1)*10;
      this.getContractorMeetList();
    }

    back(): void {
      console.log("in location back method");
      console.log(this.location);
      this.location.back()
    }


  }
