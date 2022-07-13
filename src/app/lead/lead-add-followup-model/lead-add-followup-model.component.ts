import { Component, Inject, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import * as moment from 'moment';
import { DialogComponent } from 'src/app/dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-lead-add-followup-model',
  templateUrl: './lead-add-followup-model.component.html'
})
export class LeadAddFollowupModelComponent implements OnInit {

  userCheck: any = [];
  dr_id: any;
  company_name: any = {};
  asmList: any = [];
  followUp: any = {};
  today_date: any = {};
  loader: any;
  followup_types: any=[];
  active:any={};


  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public serve: DatabaseService,
    public dialog: DialogComponent,
    public dialog2: MatDialog

    ) {
      console.log(data);
      console.log(data['type']);
      this.followUp.leadType = data['type'];
      this.followUp.dr_id = data['id'];
      this.followUp.company_name = data['company_name'];
      this.followUp.state = data['state'];
      console.log(this.followUp.state);


      console.log(this.followUp.company_name);
      console.log(this.followUp.dr_id);
      this.followUp.user_id;
      this.salesUserLIst();
      this.data.user_id;

      this.today_date = new Date().toISOString().slice(0, 10);
      console.log(this.today_date);
    }

    ngOnInit() {
      this.get_followup_types()
    }

    submitFollowUp() {
      this.loader = true;
      if (!this.followUp.user_id) {
        this.userCheck = true;
        return
      }
      console.log(this.followUp);
      this.followUp.next_followup_date = moment(this.followUp.next_followup_date).format('YYYY-MM-DD');
      console.log(this.followUp.next_followup_date);
      this.userCheck = false;

      this.serve.fetchData({ 'data': this.followUp }, "Lead/addFollowup/").subscribe((result => {
        console.log(result);
        if (result['status'] == 'Success') {
          console.log('in success function');
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

      this.followUp.user_id = [];

      console.log(index);
      this.followUp.user_id = this.asmList[index]['id'];
      console.log(this.followUp.user_id);
      console.log(this.followUp.user_id.length);
    }

    user_id: any = [];
    tmp_userList:any = [];

    salesUserLIst() {
      this.serve.fetchData({'search':this.followUp.search}, "User/sales_user_list").subscribe((result => {
        console.log(result);
        this.asmList = result['sales_user_list'];
        this.tmp_userList = this.asmList;

        console.log(this.user_id);
      }))

    }


    get_followup_types(){
      console.log("get_followup_types method calls");
      this.serve.fetchData({}, "Distributors/followup_type_master_list").subscribe((result) => {
        console.log(result);
        this.followup_types = result['followup_type_master_list']
        console.log(this.followup_types);
      })


    }
    toggleterritory(key,action)
    {
      console.log(action);
      console.log(key);
      // console.log(state);

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
        this.followUp.search=this.tmp_userList[i]['name'].toLowerCase();
        if(this.followUp.search.includes(search))
        {
          this.asmList.push(this.tmp_userList[i]);
        }
      }
      console.log(this.asmList);

    }

  }
