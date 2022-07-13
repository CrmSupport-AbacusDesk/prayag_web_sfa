import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { sessionStorage } from 'src/app/localstorage.service';
import * as moment from 'moment';
import { Location } from '@angular/common'
import { MatDialog } from '@angular/material';
import { OrderdetailsComponent } from 'src/app/orderdetails/orderdetails.component';


@Component({
  selector: 'app-secondary-order-list',
  templateUrl: './secondary-order-list.component.html',
  styleUrls: ['./secondary-order-list.component.scss']
})
export class SecondaryOrderListComponent implements OnInit {

  view_tab: any = 'all';
  tabStatus: any = 'all';
  orderlist: any = [];
  tmp_orderlist: any = [];
  start: any = 0;
  count: any;
  total_page: any;
  pagenumber: any;
  page_limit: any 
  loader: any;
  tmp_list: any = [];
  data: any = [];
  value: any = {};
  search_val: any = {}
  data_not_found: any = false;
  login_data: any = [];
  login_dr_id: any;
  skelton: any = {};
  secorder_list: any;
  today_date: Date;
  searchData: any;
  backButton: boolean = false;

  assign_login_data: any = [];
  assign_login_data2: any = [];

  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;



  constructor(public serve: DatabaseService,public dialog1: MatDialog, public location: Location,public navparams: ActivatedRoute, public route: Router, public dialog: DialogComponent, public session: sessionStorage) {

    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;

    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'Secondary Orders');
    console.log(index);

    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;

    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);


    this.today_date = new Date();
    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value.data;
    this.skelton = new Array(10);

    this.searchData = (this.navparams['params']['_value']);
    console.log(this.searchData);

    if (this.searchData.selectedUser && this.searchData.selectedDate && this.searchData.from == 'attendence') {
      this.backButton = true;
      console.log("in navparams");
      console.log("from attendence");
      this.search_val.created_by = this.searchData.selectedUser;
      this.search_val.date_created = this.searchData.selectedDate;
      this.orderList();
    }

    else if(this.searchData.selectedUser && this.searchData.selectedDate && this.searchData.company_name && this.searchData.from == 'checkin'){
      console.log("from checkin");
      this.backButton = true;
      this.search_val.created_by = this.searchData.selectedUser;
      this.search_val.date_created = this.searchData.selectedDate;
      this.search_val.company_name = this.searchData.company_name;
      this.orderList();
    }


    else {

      if (this.login_data.access_level != '1') {
        this.login_dr_id = this.login_data.id;
      }
      this.search_val = this.serve.orderFilterSecondary;
      this.orderList();
    }




  }

  ngOnInit() {
  }

  orderList(action: any = '') {
    console.log(this.search_val);

    if (action == "refresh") {
      this.search_val = {};
      this.orderlist = [];

    }
    this.loader = 1;
    console.log(this.data.search);
    if (Object.getOwnPropertyNames(this.search_val).length != 0) {
      this.page_limit = 0;
      this.orderlist = [];
    }
    this.serve.fetchData({ 'user_id': this.assign_login_data2.id, 'user_type': this.assign_login_data2.type,'start': this.orderlist.length, 'pagelimit': this.page_limit, 'search': this.search_val, 'login_user': this.login_dr_id }, "Order/secondary_order_list")
      .subscribe((result => {

        console.log(result);
        this.tmp_orderlist = result['order_list']['result'];
        this.count = result['order_list']['data'];

        // this.orderlist = this.orderlist.concat(result['order_list']['result']);
        this.filter_order_data(this.tabStatus);


        setTimeout(() => {
          this.loader = '';

        }, 700);
        if (this.orderlist.length == 0) {
          this.data_not_found = true;
        } else {
          this.data_not_found = false;

        }

      }))
    this.serve.count_list();
  }
  opendoc(c)
  {

    const dialogRef = this.dialog1.open(OrderdetailsComponent, {
      width: '500px',
      data:{
        c
      }});
      dialogRef.afterClosed().subscribe(result => {

      });

  }

  filter_order_data(status) {

    console.log(status);
    this.tabStatus = status;

    this.view_tab = status;
    // if(status!='all'){
    //   this.orderlist=[];
    //   for(var i=0;i<this.tmp_orderlist.length; i++)
    //   {
    //     // status=status.toLowerCase();
    //     this.search_val=this.tmp_orderlist[i]['order_status'] ;

    //     if(this.search_val.includes(status))
    //     {
    //       // console.log(this.orderlist);

    //       this.orderlist.push(this.tmp_orderlist[i]);
    //     }


    //   }
    //   console.log(this.orderlist);
    // }
    if (status == 'Partial Dispatch') {
      this.orderlist = this.tmp_orderlist;
      this.secorder_list = this.orderlist.filter(row => row.order_status == 'Partial Dispatch');
      this.orderlist = this.secorder_list;
      console.log(this.secorder_list);
    }
    if (status == 'Dispatch') {
      this.orderlist = this.tmp_orderlist;
      this.secorder_list = this.orderlist.filter(row => row.order_status == 'Dispatch');
      this.orderlist = this.secorder_list;
      console.log(this.secorder_list);
    }
    else if (this.view_tab == 'Pending') {
      this.orderlist = this.tmp_orderlist;
      this.secorder_list = this.orderlist.filter(row => row.order_status == 'Pending');
      this.orderlist = this.secorder_list;
      console.log(this.secorder_list);

    }

    else if (status == 'all') {
      this.orderlist = this.tmp_orderlist;
    }

    else if (status == 'Modified') {
      console.log("in modified");
      this.orderlist = this.tmp_orderlist;
      this.secorder_list = this.orderlist.filter(row => row.flag == '1');
      this.orderlist = this.secorder_list;
      console.log(this.secorder_list);

    }
  }
  // order(status){
  //   this.view_tab=status;

  //   if(this.tmp_orderlist.flag==1){
  //     this.view_tab=='Modified'
  //   }
  // }
  refresh() {
    this.orderList();
  }

  detailOrder(id) {
    this.serve.orderFilterSecondary = this.search_val;

    this.route.navigate(['/order-detail/' + id]);
  }

  deleteOrder(id) {
    this.dialog.delete('Order Data !').then((result) => {
      if (result) {
        console.log("order deleted");

        this.serve.fetchData({ 'order_id': id }, "Order/order_delete").subscribe((result => {
          console.log(result);
          if (result) {
            this.orderList();
          }
        }))
      }
    });
  }
  getItemsList(index, search) {
    console.log(search);
    this.orderlist = [];
    for (var i = 0; i < this.tmp_orderlist.length; i++) {
      search = search.toLowerCase();
      this.tmpsearch1 = this.tmp_orderlist[i][index].toLowerCase();
      if (this.tmpsearch1.includes(search)) {
        // console.log(this.orderlist);

        this.orderlist.push(this.tmp_orderlist[i]);
      }
    }
    console.log(this.orderlist);

  }
  tmpsearch1: any = {};
  // getItemsList(search)
  // {
  //   console.log(search);
  //   this.orderlist=[];
  //   for(var i=0;i<this.tmp_list.length; i++)
  //   {
  //     search=search.toLowerCase();
  //     this.tmpsearch=this.tmp_list[i]['company_name'].toLowerCase();
  //     if(this.tmpsearch.includes(search))
  //     {
  //       this.orderlist.push(this.tmp_list[i]);
  //     }
  //   }
  //   console.log(this.orderlist);

  // }


  allCount: any;
  selected_order: any = '';

  allOrderdata() {
    this.allCount = 0;

    if (!this.search_val.allStates) {
      for (let i = 0; i < this.orderlist.length; i++) {
        if (this.orderlist[i].selected_order = false) {
          this.allCount++;
        }
        console.log(this.allCount);
      }

    } else {
      for (let i = 0; i < this.orderlist.length; i++) {
        if (this.orderlist[i].selected_order = true) {
          this.allCount++;
        }
        console.log(this.allCount);
      }
    }
  }

  countSelected() {
    this.allCount = 0;
    for (let i = 0; i < this.orderlist.length; i++) {
      if (this.orderlist[i].selected_order) {
        this.allCount++;
      }
    }
  }

  deletecheckavailable() {
    this.dialog.delete('').then((result) => {
      if (result) {
        this.serve.fetchData({ 'check': this.orderlist }, 'Order/secondary_delete')
          .subscribe(d => {
            console.log(d);
            this.orderList();
            // this.dialog.successfully();
          });
      }
    });
  }

  exp_loader: any = false;
  exp_data: any = [];
  excel_data: any = [];

  exportAsXLSX(): void {
    this.exp_loader = true;

    this.serve.FileData({ 'search': this.search_val }, "Order/secondary_order_excel")
      .subscribe(resp => {
        console.log(resp);
        this.exp_data = resp['order_list'].result;

        for (let i = 0; i < this.exp_data.length; i++) {
          this.excel_data.push({ 'Date': this.exp_data[i].date_created, 'Created By': this.exp_data[i].created_by_name, 'Order Id': this.exp_data[i].id, 'Company Name': this.exp_data[i].company_name, 'Company Id': this.exp_data[i].dr_id,'Distributor': this.exp_data[i].distributor_name });
        }
        this.exp_loader = false;

        this.serve.exportAsExcelFile(this.excel_data, 'Secondary-Order');
        this.excel_data = [];
        this.exp_data = [];
      });
  }

  public onDate(event): void {
    this.search_val.date_created = moment(event.value).format('YYYY-MM-DD');
    this.orderList();
  }


  change_date_filter(type): void
  {

    console.log(type);

    if(type == 'date_from'){
      this.search_val.date_from=moment(this.search_val.date_from).format('YYYY-MM-DD');
      console.log(this.search_val);
      this.orderList()
    }

    else if(type == 'date_to'){
      this.search_val.date_to=moment(this.search_val.date_to).format('YYYY-MM-DD');
      console.log(this.search_val);
      this.orderList()
    }
    else{
      console.log(this.search_val);
    }


  }



  back(): void {
    console.log("in location back method");
    console.log(this.location);
    this.location.back()
  }


}



