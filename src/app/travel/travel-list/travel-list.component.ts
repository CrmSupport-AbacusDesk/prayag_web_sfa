import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog.component';
import { TravelStatusModalComponent } from '../travel-status-modal/travel-status-modal.component';
import { addTravelListModal } from '../add-travel-list/add-travel-list-modal.component';
import { sessionStorage } from 'src/app/localstorage.service';
import { UploadFileModalComponent } from 'src/app/upload-file-modal/upload-file-modal.component';
import { ToastrManager } from 'ng6-toastr-notifications';



@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html'
})
export class TravelListComponent implements OnInit {
  travel_list: any = [];
  loader: any = false;
  search: any = {};
  skelton: any;
  data_not_found = false;
  active_tab = 'Pending';
  status: any = {};
  travel_list1: any = [];
  travel_list2: any = [];
  count_list: any = [];

  today_date: Date;
  assign_login_data2: any = [];


  assign_login_data: any = [];
  view_edit: boolean = true;
  view_add: boolean = true;
  view_delete: boolean = true;
  start:any=0;
data:any={}
  total_page:any;
  pagenumber:any;
  page_limit:any=50
tmpsearch:string
  asmList:any=[]
  secondary_lead_list:any=[]
  constructor(public alert: DialogComponent, public serve: DatabaseService, public dialog1:DialogComponent,public alrt: MatDialog, public dialog: MatDialog, public session: sessionStorage, public toast: ToastrManager,) {
    this.skelton = new Array(10);

    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;
    console.log(this.assign_login_data2);



    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'Travel Plan');
    console.log(index);

    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;

    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);


    this.today_date = new Date();


  }

  ngOnInit() {
    // this.getTravelList();
this.salesUserLIst()
    this.travel_list2;
  }
  salesUserLIst() {

   
    
    this.serve.fetchData({}, "User/sales_user_list_for_activity").subscribe((result => {
      console.log(result);
      this.asmList = result['sales_user_list_for_activity'];
      this.secondary_lead_list= result['sales_user_list_for_activity'];

    


     
    }))
  }
  upload_excel() {
    const dialogRef = this.alrt.open(UploadFileModalComponent, {
      width: '500px',
      data: {
        'from': 'travel',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getTravelList();

    });
  }
  filter_dr(dr_name){
    console.log("filter_dr method calls");
    console.log(dr_name);
    this.tmpsearch='';
    this.asmList = [];
    for (var i = 0; i < this.secondary_lead_list.length; i++) {
      dr_name = dr_name.toLowerCase();
      this.tmpsearch = this.secondary_lead_list[i]['name'].toLowerCase();
      if (this.tmpsearch.includes(dr_name)) {
        this.asmList.push(this.secondary_lead_list[i]);
      }
    }
  }
  refresh(){
    this.search={}
    this.data={}
this.travel_list=[]
  }
  getTravelList() {
    // if (action == "refresh") {
    //   this.search = {};
    // }
this.travel_list=[]
    this.loader = true;
    if (this.search.date_to)
      this.search.date_to = moment(this.search.date_to).format('YYYY-MM-DD');

    if (this.search.date_from)
      this.search.date_from = moment(this.search.date_from).format('YYYY-MM-DD');


    this.serve.fetchData({
      'user_id': this.assign_login_data2.id, 'start': this.start, 'pagelimit': this.page_limit, 'data':this.data,'search': this.search, 'user_type': this.assign_login_data2.type
    }, "Travel/travel_list").subscribe((result => {
      console.log(result);
      this.loader = false;
      this.count_list = result;
           console.log(this.count_list);
           console.log(this.count_list.count);


      this.travel_list = result['data'];
      this.travel_list2 = result['data']['travel_plan'];
      console.log(this.travel_list2);
      this.total_page = Math.ceil(this.count_list.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;

      if (this.travel_list.length == 0) {
        this.data_not_found = true;
      }
      else {
        this.data_not_found = false;
      }
    }))
  }

  public onDate(event): void {
    if (this.search.date_created) {
      this.search.travel_date = moment(event.value).format('YYYY-MM-DD');
      console.log(this.search.travel_date);
    }
    if (this.search.date_from) {
      this.search.date_from = moment(this.search.date_from).format('YYYY-MM-DD');
    }
    console.log(this.search.date_to)


    if (this.search.date_to) {
      this.search.date_to = moment(this.search.date_to).format('YYYY-MM-DD');
      console.log(this.search.date_to)
    }

    this.getTravelList();

  }

  statusModal(id,month,year) {


    const dialogRef = this.dialog.open(TravelStatusModalComponent, {
      width: '400px',
      data: {
        id,month,year
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.getTravelList();
    });

  }

  testfunction() {

    for (let i = 0; i < this.travel_list.length; i++) {

      this.districtAppend = '';

      for (let j = 0; j < this.travel_list[i].travel_plan.length; j++) {

        this.districtAppend = this.travel_list[i].travel_plan[j]['district'] + ',' + this.districtAppend;
        this.state4xl = this.travel_list[i].travel_plan[j]['state'] + ',' + this.state4xl
        this.areaexcel = this.travel_list[i].travel_plan[j]['area'] + ',' + this.areaexcel
        this.cityexcel = this.travel_list[i].travel_plan[j]['city'] + ',' + this.cityexcel



      }
      console.log(this.districtAppend);
      console.log(this.state4xl);
      console.log(this.areaexcel);


    }



  }
  districtAppend: String;
  state4xl: String;
  cityexcel: String;

  area: any
  areaexcel: any;
  excel_data: any = [];
  company_name: String;
  exportAsXLSX(): void {
    for (let i = 0; i < this.travel_list.length; i++) {
    



      // if (this.travel_list[i].travel_type != "Distributor Visit") {

        console.log("in if");

  
        this.excel_data.push({ 'Date': this.travel_list[i].date_from,   'ERPCode':this.travel_list[i].executive_erp_id, 'Executive name': this.travel_list[i].name, 'Area\Route Name': this.travel_list[i].city,'Beat Code': this.travel_list[i].beat_code, 'TravelType': this.travel_list[i].travel_type,'Remarks':this.travel_list[i].status_remark,'Status': this.travel_list[i].status,});

      // }
     

      // this.excel_data.push({ 'Date from': this.travel_list[i].date_from, 'Date to': this.travel_list[i].date_to, 'TravelType': this.travel_list[i].travel_type, 'Executive name': this.travel_list[i].name, 'Status': this.travel_list[i].status, 'State': this.state4xl, 'District': this.districtAppend });

    }

    console.log(this.travel_list.length);

    console.log(this.excel_data);
    this.serve.exportAsExcelFile(this.excel_data, 'Travel Plan Sheet');
    this.excel_data = [];

  }
  travel_plan_update(id,month,year){
    this.dialog1.delete('Travel Information!').then((result) => {
      if(result){
        this.serve.fetchData({"user_id":id,'month':month,'year':year},"travel/delete_travel_plan").subscribe((result=>{
          console.log(result);
          this.refresh();
          this.getTravelList();

        }))
      }})
  }
  openEditDialog2(row): void {  
    const dialogRef = this.dialog.open(addTravelListModal,{
        width: '720px', data:{
           row,
           
        }
        
    });
    
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.orderDetail();
        this.getTravelList()

    });
  }
  deletetravel(id)
  {
    this.dialog1.delete('Travel Information!').then((result) => {
      if(result){
        this.serve.fetchData({"travel_id":id},"travel/delete_travel_plan").subscribe((result=>{
          console.log(result);
          this.refresh();
          this.getTravelList();

        }))
      }})




    }
  addTravelPlan() {
    const dialogRef = this.dialog.open(addTravelListModal, {
      width: '720px',
      data: {

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTravelList();
      setTimeout(() => {
        this.loader = '';
      }, 100);

      if (result != false) {
        this.active_tab = 'Approved'
        this.getTravelList();
      }
      else {
        this.active_tab = 'Pending'
        this.getTravelList();
      }

    });


  }

}
