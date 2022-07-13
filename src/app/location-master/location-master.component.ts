import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import { MatDialog } from '@angular/material';
import { UserEmailModalComponent } from 'src/app/user/user-email-modal/user-email-modal.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogService } from 'src/app/dialog.service';
import * as XLSX from 'xlsx';
import { ExportexcelService } from 'src/app/service/exportexcel.service';
import { sessionStorage } from '../localstorage.service';
import { TravelStatusModalComponent } from '../travel/travel-status-modal/travel-status-modal.component'
import { UploadFileModalComponent } from '../upload-file-modal/upload-file-modal.component';


@Component({
  selector: 'app-location-master',
  templateUrl: './location-master.component.html',
  styleUrls: ['./location-master.component.scss']
})
export class LocationMasterComponent implements OnInit {

  data: any = {};
  search:any={};
  state_list: any = [];
  district_list: any = [];
  city_list: any = [];
  createdby: any;
  areaFlag:any=0;
  showSave:boolean=false;
  editLocation:any=0;
  arealist: any;
  loader:any = '';
  userData: any;
  userId: any;
  excel_data:any=[];

  userName: any;
  
  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;



  constructor(public alert: DialogComponent, public serve: DatabaseService, 
    public editdialog: DialogService, public dialog: MatDialog, public route: ActivatedRoute, public rout: Router, public toast: ToastrManager, public session: sessionStorage) {
   
   
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'Follow Up');
    console.log(index);
    
    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;
    
    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);
    this.userData = JSON.parse(localStorage.getItem('st_user'));
    this.userId=this.userData['data']['id'];
    this.userName=this.userData['data']['name'];
   
   
   
    console.log(serve);
    console.log(route);
    console.log(rout);
    console.log(toast);
    console.log(alert);
    console.log(session);
    this.createdby = session.st_user.data.username;
    console.log(this.createdby);

    this.getStateList();
    this.area_list();
    this.data.state = true;

  }

  ngOnInit() {
  }


  getStateList() {
    this.serve.fetchData(0, "User/state_user_list").subscribe((response => {
      console.log(response);
      this.state_list = response['query']['state_name'];
    }));
  }


  getDistrict(state) {
    this.data.state = state;
    this.serve.fetchData(this.data.state, "User/district_user_list").subscribe((response => {
      console.log(response);
      this.district_list = response['query']['district_name'];
    }));
  }

  submit_area() {

    this.loader=1;
    this.data.uid=this.userId;
    this.data.uname=this.userName;

    console.log(this.data);
    this.data.created_by = this.createdby;
    this.serve.fetchData(this.data, "User/submit_area").subscribe((response => {
      console.log(response);
 if(response['msg'] == 'Area Exist'){
        this.alert.error( "Area with this name already exist. Please enter diffrent Area Name");
        
         setTimeout (() => {
        this.loader='';
        
      }, 700);
      }
      else if (response['msg'] == 'Success'){
        this.toast.successToastr("Area Add in Location Master");
         this.area_list();
      this.data.state='';
      this.data.distirct='';
      this.data.area='';
      this.data.area_description='';
         setTimeout (() => {
        this.loader='';
        
      }, 700);
      }
      else{
        this.alert.error( "Something Went Wrong Please Try Again" );
         this.area_list();
      this.data.state='';
      this.data.distirct='';
      this.data.area='';
      this.data.area_description='';
         setTimeout (() => {
        this.loader='';
        
      }, 700);
      }



     
    }))
    

  }



  area_list() 
  {

    console.log(this.search);
    this.arealist=[]
    this.serve.fetchData({'search':this.search}, "User/area_list").subscribe((response => {
      console.log(response);
      this.arealist = response['area_list'];
      console.log(this.arealist);

    }))

  }


  delete_area(id) {
    this.alert.delete('Data !').then((result) => {
      if(result){
        console.log(id);
        this.serve.fetchData({ 'id': id }, "User/delete_area").subscribe((response => {
          console.log(response);
          this.area_list();
        }))
    }
    });
  }


  assignArea(id,area){
    console.log(id);
    const dialogRef = this.dialog.open(TravelStatusModalComponent, {
      width: '400px',
         data:{
          'deleteAreaId' : id,
          'deleteAreaName' : area,
          from : 'location-master'
         }});
        dialogRef.afterClosed().subscribe(result => {

          console.log("after Close");
          this.getStateList();
          this.area_list();
          
    });

  }



  check_area() {
  this.areaFlag = 0
    for (let x = 0; x < this.arealist.length; x++) {

      if (this.data.state == this.arealist[x].state) {
        if (this.data.distirct == this.arealist[x].distirct) {
          if (this.data.area == this.arealist[x].area) {
            console.log("exist");
            this.toast.errorToastr("Area Name Already Exist");
            this.areaFlag++;
            break;
          }
          else {
            console.log("not exist");
          }
        }
      }
    }

  }

  upload_excel() {
    const dialogRef = this.dialog.open(UploadFileModalComponent, {
      width: '500px',
      data: {
        'from': 'beat',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getTravelList();

    });
  }
  deletetbeat(id)
  {
    this.alert.delete('Beat Code!').then((result) => {
      if(result){
        this.serve.fetchData({"travel_id":id},"travel/delete_travel_plan").subscribe((result=>{
          console.log(result);
          // this.refresh();
          this.area_list();

        }))
      }})




    }
  updateData(location_maste_id,area,description){
    console.log(area);
    console.log(description);
    console.log(location_maste_id);
    this.serve.fetchData({'beat_code' : area,'description' : description,'id' : location_maste_id}, "User/update_area").subscribe((response => {
      console.log(response);
      if(response['msg'] == 'already exist'){
        this.alert.error( "Area with this name already exist");
      }
      else if (response['msg'] == 'fill details'){
        this.alert.error( "Fill All The Details" );


      }
      else if (response['msg'] == 'failed'){
        this.alert.error( "Something Went Wrong" );
      }
      else{
        this.toast.successToastr("Beat Code Updated");
      }

    }))
    this.area_list();
  }


  exp_data:any=[];

  exportAsXLSX():void {
    this.serve.FileData({'user_id':this.userId,'search':this.search,},"User/area_list")
    .subscribe(resp=>{
      console.log(resp);
      this.exp_data = resp['area_list'];
      console.log(this.exp_data);
      for(let i=0;i<this.exp_data.length;i++)
      {
        this.excel_data.push({'State':this.exp_data[i].state,'District':this.exp_data[i].distirct,'Area Name':this.exp_data[i].area,'Beat Code':this.exp_data[i].beat_code,});
      }

      this.serve.exportAsExcelFile(this.excel_data, 'BEAT MASTER SHEET');
      this.excel_data = [];
      this.exp_data = [];

    })


  }

}