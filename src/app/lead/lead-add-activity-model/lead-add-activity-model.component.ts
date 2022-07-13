import { Component, Inject, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from 'src/app/dialog.component';

@Component({
  selector: 'app-lead-add-activity-model',
  templateUrl: './lead-add-activity-model.component.html'
})

export class LeadAddActivityModelComponent implements OnInit {

  tmpsearch: any = {};
  activity: any = {};
  userCheck: any = [];
  dr_id: any;
  company_name: any = {};
  asmList: any = [];
  today_date: any = [];
  loader: any;
  logIN_user:any;
  uid:any;
  active: any = {};
  tmp_userList: any = [];

  sales_executive_update: any;
  search: any = {};

  searchUser:any={};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public serve: DatabaseService,
    public rout: Router,
    public dialog: DialogComponent,
    public dialog2: MatDialog


  ) {
    this.logIN_user = JSON.parse(localStorage.getItem('st_user'));
    console.log(this.logIN_user);
    this.uid = this.logIN_user['data']['id'];
    console.log(data);
    console.log(data['type']);
    this.activity.leadType = data['type'];
    this.activity.dr_id = data['id'];
    this.activity.company_name = data['company_name'];
    console.log(this.activity.company_name);
    console.log(this.activity.dr_id);
    this.activity.user_id;
    this.salesUserLIst();
    this.data.user_id;
    this.data.state;
    this.today_date = new Date().toISOString().slice(0, 10);
    console.log(this.today_date);

  }

  ngOnInit() {
  }

  submitActivity() {
    console.log("submit befor api hitfunction");
    this.loader =true;

    // this.userCheck = true;
    if (!this.activity.user_id && this.activity.isFollowup) {
      this.userCheck = true;
      return
    }
    console.log(this.activity);
    this.activity.followUp_date = moment(this.activity.followUp_date).format('MM/DD/YYYY');
    console.log(this.activity.followUp_date);
    this.userCheck = false;
    console.log(this.uid);


    this.serve.fetchData({ 'data': this.activity,'loginId':this.uid }, "Lead/addActivity").subscribe((result => {
      console.log(result);
      if (result['status'] == 'Success') {
        console.log('in success function');
        this.dialog2.closeAll();
        this.dialog2.closeAll();

        setTimeout(() => {
          this.loader = false;
        }, 700);
      }
      else {
        console.log('in failed function');
        console.log(result['error']['message']);
        this.dialog.error(result['error']['message']);
      }
    }))

  }

  user_assign_check(index) {
    this.userCheck = false;

    this.activity.user_id = [];

    console.log(index);
    this.activity.user_id = this.asmList[index]['id'];
    console.log(this.activity.user_id);
    console.log(this.activity.user_id.length);
  }

  user_id: any = [];

  salesUserLIst() {
    console.log(this.search);
    this.serve.fetchData({'search':this.search}, "User/sales_user_list").subscribe((result => {
      console.log(result);
      this.asmList = result['sales_user_list'];
      this.tmp_userList = this.asmList;

      console.log(this.user_id);
    }))

  }


  update_assigned_sales_executive(sales_executive){
    this.sales_executive_update = sales_executive;
    console.log(sales_executive);
    this.salesUserLIst()

  }

  toggleterritory(key,action,state)
  {
    console.log(action);
    console.log(key);
    console.log(state);

    if(action == 'open')
    { this.active[key] = true; }
    if(action == 'close')
    { this.active[key] = false;
    }
    // this.salesUserLIst()

    console.log(this.active);
    this.salesUserLIst()

  }
  getItemsList(search)
  {
    console.log(search);

    this.asmList=[];
    for(var i=0;i<this.tmp_userList.length; i++)
    {
      search=search.toLowerCase();
      search=search;
      this.activity.search=this.tmp_userList[i]['name'].toLowerCase();
      if(this.activity.search.includes(search))
      {
        this.asmList.push(this.tmp_userList[i]);
      }
    }
    console.log(this.asmList);

  }

  // searchSalesUserLIst() {
  //   console.log(this.search);
  //   this.serve.fetchData({'search':this.searchUser}, "User/sales_user_list_for_activity").subscribe((result => {
  //     console.log(result);
  //     this.asmList = result['sales_user_list_for_activity'];
  //     this.tmp_userList = this.asmList;

  //     console.log(this.user_id);
  //   }))

  // }

}
