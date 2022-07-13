import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { sessionStorage } from 'src/app/localstorage.service';
import * as moment from 'moment';
import { DialogComponent } from '../dialog.component';

@Component({
  selector: 'app-activityreport',
  templateUrl: './activityreport.component.html',
  styleUrls: ['./activityreport.component.scss']
})
export class ActivityreportComponent implements OnInit {

  data_not_found=false;
  skelton:any={};
  add: any = {};
  assign_login_data2: any = [];

  delete: any = {};

  edit: any = {};
  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  constructor(public serve:DatabaseService,public route:Router,public dialog:DialogComponent,public session:sessionStorage) { 
    this.today_date = new Date();
 
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;

    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    
    let flag = 0;
    const index = this.assign_login_data.findIndex(row => row.module_name == 'Distribution Distributors');

  }
  
  ngOnInit() {
    this.User()
    this.search_val = this.serve.directDealerListSearch
    this.skelton = new Array(10);
  }
  value:any={};
  
  activity_list:any=[];
  start:any=0;
  count:any;
  total_page:any; 
  pagenumber:any;
  state_values:any=[];
  exp_loader:any;
  loader:any;
  data:any=[];
  type:any=7
  search_val:any={}
  dr_count:any;
  today_date:Date;
  public onDate(event): void 
  {
    this.search_val.date_created=moment(event.value).format('YYYY-MM-DD');    
    // this.activityList();
  }
  
  activityList()
  {

 
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
    // console.log(this.data.search);
    
    // 
    console.log(this.data.user_id)

    this.loader=true;
    this.serve.fetchData({'date_from':this.data.date_from,'date_to':this.data.date_to,'user_id':this.data.user_id},"lead/activityListReport")
    .subscribe((result=>{
      console.log(result);
      this.activity_list=result['data'];
     
      
    
      
      setTimeout (() => {
        this.loader=false;
        
      }, 500);
      if(this.activity_list.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
        
      }
      this.serve.count_list();
    }))
  }
  systemuserlist:any=[]
  User()
  {
      
        this.serve.fetchData({},"lead/systemUser").subscribe((result=>{
          console.log(result);
          this.systemuserlist=result['data']
          console.log(this.systemuserlist);
          
        }))
      
    }
    refresh()
    {
      this.activityList();
    }
  
    
    
    tmpsearch1:any={};
    excel_data:any=[];
    exp_data:any=[];
    exportAsXLSX():void 
    {
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
      this.exp_loader = true;
      this.serve.FileData({'date_from':this.data.date_from,'date_to':this.data.date_to,'user_id':this.data.user_id},"lead/activityListReport")
      .subscribe(resp=>{
        console.log(resp);
        this.exp_data = resp['data'];
        console.log(this.exp_data);
        
        
        for(let i=0;i<this.exp_data.length;i++){
          this.excel_data.push({'Date Created':this.exp_data[i].date_created,'Created By':this.exp_data[i].created_name,'Company Name':this.exp_data[i].company_name,'Contact No.':this.exp_data[i].mobile,'Activity tYPE':this.exp_data[i].activity_type,'Description':this.exp_data[i].remark,});
        }
        this.exp_loader = false;
        
        this.serve.exportAsExcelFile(this.excel_data, 'ACTIVITY SHEET');
        this.excel_data = [];
        this.exp_data = [];
      })
    }

    id:any;
    state:any;
    tothepage(id,state,type){
    this.route.navigate(['/distribution-detail/'+id],{ queryParams: { state,id,type} });
  
    }
  }
  