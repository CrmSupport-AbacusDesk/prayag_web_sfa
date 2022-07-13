import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog.component';
import { ChangeStatusComponent } from '../change-status/change-status.component';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { sessionStorage } from 'src/app/localstorage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {

  leave_list:any=[];
  loader:any;
  search:any={};
  skelton:any={}
  data_not_found = false;
  data:any={};
  today_date:Date;
  user_id:any=[];
  assign_login_data2:any=[]

  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  start:any=0;

  total_page:any;
  pagenumber:any;
  page_limit:any=50;
  count:any=[];


  constructor(public serve:DatabaseService,public dialog:DialogComponent,public navparams: ActivatedRoute, public dialogs: MatDialog,public session: sessionStorage)
  {

    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;


    this.assign_login_data = this.assign_login_data.assignModule;

    console.log(this.assign_login_data);
    console.log(this.assign_login_data2);
    // console.log(this.user_id);

    const index = this.assign_login_data.findIndex(row => row.module_name == 'Leaves');
    console.log(index);

    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;

    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);
    this.skelton = new Array(10);
    this.today_date = new Date();

  }

  ngOnInit()
  {
    this.leaveList();
    this.search = {};
  }

  openDialog(leave_id): void {

    const dialogRef = this.dialogs.open(ChangeStatusComponent, {
      width: '400px', data:{

        id : leave_id,
        reason: ''
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.leaveList();
    });
  }

  leaveList()
  {
    if(this.search.date_created)
    {
      this.search.date_created = moment(this.search.date_created).format('YYYY-MM-DD');

      if(this.search.date_from)
    {
      this.search.date_from= moment(this.search.date_from).format('YYYY-MM-DD');
      console.log(this.search.date_from);

    }


    if(this.search.date_to)
    {
      this.search.date_to = moment(this.search.date_to).format('YYYY-MM-DD');
      console.log( this.search.date_to);
    }
    }
    console.log( this.search.date_to);


    this.loader=true;
    this.serve.fetchData({
      'user_id': this.assign_login_data2.id,'start': this.start,'pagelimit': this.page_limit, filter: this.search,'user_type': this.assign_login_data2.type
},"Leaves/leave_list").subscribe((result=>
    {
      this.loader=false;
      console.log(result);
      this.leave_list = result['data'];
      this.count=result['count']
      console.log(this.count);


      console.log(this.leave_list.length);
      this.total_page = Math.ceil(this.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;


      if(this.leave_list.length == 0)
      {
        this.data_not_found = true;
      }
      else
      {
        this.data_not_found = false;
      }
    }));
  }
  excel_data:any=[];
  exportAsXLSX():void
  {

      for(let i=0;i<this.leave_list.length;i++)
      {
        this.excel_data.push({'Date':this.leave_list[i].date_created,'Created By':this.leave_list[i].created_by_name,'Leave Subject Type':this.leave_list[i].leave_type,'Leave Type':this.leave_list[i].type,'Leave Start Date':this.leave_list[i].leave_start_date,'Leave End Date':this.leave_list[i].leave_end_date,'Total Days':this.leave_list[i].total_days,'Description':this.leave_list[i].description});
      }
      this.serve.exportAsExcelFile(this.excel_data, 'Leave List');
      this.excel_data = [];
      // this.leave_list = [];

  }

}
