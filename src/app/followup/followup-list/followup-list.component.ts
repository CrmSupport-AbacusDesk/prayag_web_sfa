import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import * as moment from 'moment';
import { DialogComponent } from 'src/app/dialog.component';
import { MatDialog } from '@angular/material';
import { sessionStorage } from 'src/app/localstorage.service';


@Component({
  selector: 'app-followup-list',
  templateUrl: './followup-list.component.html',
  // styleUrls: ['./followup-list.component.scss'],
  animations: [slideToTop()]

})
export class FollowupListComponent implements OnInit {

  followup_list:any=[];
  pagelimit:any=50;
  search:any={};
  active_tab = 'pending';
  loader:any;
  data_not_found=false;
  skelton:any={}
  excel_data: any=[];
count_list:any=[];
  assign_login_data: any = [];
  assign_login_data2: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  start:any=0;
  constructor(public serve:DatabaseService,public alert: DialogComponent,public dialog:MatDialog,public session: sessionStorage)
  {
    this.skelton = new Array(10);

    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;

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


  }

  ngOnInit()
  {
    this.followUpList();
    // this.count()
  }

  followUpList(action:any='')
  {
    if(action == "refresh")
    {
      this.search = {};
    }
    console.log(this.active_tab);
    if(this.search.followup_date)
    {
      this.search.followup_date=moment(this.search.followup_date).format('YYYY-MM-DD');
      console.log(this.search.followup_date);
    }

    if(this.search.date_from)
    {
      this.search.date_from=moment(this.search.date_from).format('YYYY-MM-DD');
      console.log(this.search.date_from)
    }
    console.log(this.search.date_to);

    if(this.search.date_to)
    {
      this.search.date_to=moment(this.search.date_to).format('YYYY-MM-DD');
      console.log(this.search.date_to);


    }



    this.loader=1;

    this.serve.fetchData({
      'user_id': this.assign_login_data2.id, 'start': this.start, 'pagelimit': this.pagelimit, 'search': this.search, 'active_tab': this.active_tab, 'user_type': this.assign_login_data2.type},"Distributors/followup_list").subscribe((result=>
      {
        console.log(result);
        this.followup_list=result['followup_list'];
        this.count_list=result['followup_list']['data'];


        if(this.count_list.length ==0)
        {
          this.data_not_found=true;
        }
        else
        {
          this.data_not_found=false;
        }

        setTimeout (() => {
          this.loader='';

        }, 100);
      }))
    }
   

    delete_followup(followup_id){
      console.log("delete_followup method calls");
      console.log(followup_id);

      this.alert.delete('Followup !').then((result) => {
        if (result) {

          this.serve.fetchData({'followup_id':followup_id}, "Distributors/delete_followup").subscribe((result) => {
            console.log(result);
            if (result['msg'] == 'Deleted Successfully') {
              console.log('in success function');
              this.alert.success("Follow Up Detail","Update Successfully");
              this.followUpList()

            }
            else {
              console.log('in failed function');
              this.alert.error("Something Went Wrong Please Try Again !");
            }
          })
        }
      });


    }


    exportAsXLSX():void {

      for(let i=0;i<this.followup_list.length;i++){
        this.excel_data.push({'Date Created':this.followup_list[i].date_created,'Created By':this.followup_list[i].name,'Company Name':this.followup_list[i].company_name,'Followup Type':this.followup_list[i].next_follow_type,'Followup Date':this.followup_list[i].next_follow_date,'Assigned To':this.followup_list[i].assigned_to_name && this.followup_list[i].assigned_to_name !=''? this.followup_list[i].assigned_to_name : '-','Description':this.followup_list[i].description,'Activity Remarks':this.followup_list[i].activity_remarks});
      }
      this.serve.exportAsExcelFile(this.excel_data,'Follow Up SHEET');
      this.excel_data = [];

    }

  }
