import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import * as moment from 'moment';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common'
import { sessionStorage } from 'src/app/localstorage.service';
import * as XLSX from 'xlsx';




@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.scss']
})
export class ListExpenseComponent implements OnInit
{
  @ViewChild('table') table: ElementRef;

  food_expense_list:any=[];
  out_expense_list:any=[];
  hotel_expense_list:any=[];
  misc_expense_list:any=[]
  local_expense_list:any=[]
user_list:any=[]
rsmData:any
rsmname:any
rsmrole:any
user:any=[]
name:any
designation:any
out:any=0
local:any=0
misc:any=0
food:any=0
hotel:any=0
total:any
count_list:any=[]
  expense_list:any=[];
  search:any={};
  active_tab = 'Pending';
  loader:any;
  data_not_found=false;
  skelton:any;
  searchData: any;
  search_val: any = {}
  backButton: boolean = false;
 list1:any=[]
 start:any=0;

 total_page:any;
 pagenumber:any;
 page_limit:any=50;



  assign_login_data: any = [];
  assign_login_data2: any = [];

  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;

  constructor(public serve:DatabaseService,public location: Location,  public navparams: ActivatedRoute,public dialog: MatDialog,public session: sessionStorage)
  {
    this.skelton = new Array(7);

    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;

    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'Expense');
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
    this.searchData = (this.navparams['params']['_value']);
    if (this.searchData.selectedUser && this.searchData.selectedDate) {
      this.backButton = true;
      console.log("in navparams");
      this.search.userName = this.searchData.selectedUser;
      this.search.dateCreated = this.searchData.selectedDate;

      this.expenseList();
      this.ExportToExcel();
      console.log(this.search.date_created);

    }

    this.expenseList();
  }

  refresh(){

    this.search = {}
    this.expenseList();


  }

  expenseList(action:any='')
  {
    if(action == "refresh")
    {
      this.search = {};
    }
    // console.log(this.active_tab);
    // if(this.search.followup_date)
    // {
    //   this.search.followup_date=moment(this.search.followup_date).format('YYYY-MM-DD');
    // }

    this.loader=1;

    if(this.search.dateCreated)
    {
    this.search.dateCreated = moment(this.search.dateCreated).format('YYYY-MM-DD');
    console.log(this.search.dateCreated);

    }

    this.serve.fetchData({
      'user_id': this.assign_login_data2.id, 'start':this.start, 'pagelimit': this.page_limit, 'search': this.search, 'expenseStatus': this.active_tab, 'user_type': this.assign_login_data2.type},"Expense/expense_list").subscribe((result=>
    {
      console.log(result);
      this.count_list=result;
      this.expense_list=result['result'];
      console.log(this.count_list);

      this.total_page = Math.ceil(this.count_list.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;


      if(this.expense_list.length ==0)
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

    if(this.search.date_from)
    {
    this.search.date_from = moment(this.search.date_from).format('YYYY-MM-DD');
    console.log(this.search.date_from);

    }
    if(this.search.date_to)
    {
    this.search.date_to = moment(this.search.date_to).format('YYYY-MM-DD');
    console.log(this.search.date_to )
    }
  }


  expModal(type,id)
  {
    const dialogRef = this.dialog.open(ExpenseModalComponent, {
      width:'400px',
      data:{
        type,
        id
        // data:this.detail
      }});
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
    this.expenseList();


      });

    }

    back(): void {
      console.log("in location back method");
      console.log(this.location);
      this.location.back()
    }
    excel_data:any=[];
    exportAsXLSX():void {
      for(let i=0;i<this.expense_list.length;i++){
        this.excel_data.push({'Date':this.expense_list[i].dateCreated,'UserName':this.expense_list[i].userName,'Designation':this.expense_list[i].userType,'Expense type':this.expense_list[i].expenseType,'Amount':this.expense_list[i].totalAmt,'Approved Amount':this.expense_list[i].totalApprovedAmount,'seniorStatus':this.expense_list[i].seniorStatus,'A/C Status':this.expense_list[i].acStatus});

      }
      console.log(this.excel_data);
      this.serve.exportAsExcelFile(this.excel_data, 'Expense Sheet');
    this.excel_data=[];

    }
    exporttestAsXLSX(){
      this.serve.fetchData({'search':this.search},"Expense/expense_Excel").subscribe((result=>
        {
          console.log(result);
          this.user_list=result['data'];

          this.food_expense_list=result['foodDATA'];
          this.out_expense_list=result['travel'];
          this.hotel_expense_list=result['hotelDATA'];
          this.local_expense_list=result['localConvDATA'];


          this.misc_expense_list=result['miscExpDATA'];
          this.rsmData=result['rsmData'];
          this.rsmname=this.rsmData.name
          this.rsmrole=this.rsmData.role_name
          console.log( this.rsmData.name);
          console.log( this.rsmData.role_name);


    console.log(this.list1);

    // for(let i=0;i<this.user_list.length;i++){
    this.user=(this.user_list[0])

    // }
    for(let i=0;i<this.food_expense_list.length;i++){
      this.list1.push(this.food_expense_list[i])
      this.food += parseInt(this.food_expense_list[i].foodAmt)

      }
      console.log(this.food);

    for(let j=0;j<this.out_expense_list.length;j++){
      this.list1.push(this.out_expense_list[j])
      this.out += parseInt(this.out_expense_list[j].travelEntitlementAmt)
      console.log(this.out);

      }
      for(let k=0;k<this.local_expense_list.length;k++){
        this.list1.push(this.local_expense_list[k])
        this.local += parseInt(this.local_expense_list[k].localConveyanceAmt)
        console.log(this.local);

        }
        for(let m=0;m<this.hotel_expense_list.length;m++){
          this.list1.push(this.hotel_expense_list[m])
          this.hotel += parseInt(this.hotel_expense_list[m].hotelAmt)
          console.log(this.hotel);
          }
          for(let n=0;n<this.misc_expense_list.length;n++){
            this.list1.push(this.misc_expense_list[n])
            this.misc += parseInt(this.misc_expense_list[n].miscExpenseAmt)
            console.log(this.misc);
            }
            this.total= this.food+this.out+this.misc+this.local+this.hotel
    console.log(this.list1)
    console.log(this.user);
    this.name= this.user.userName
    this.designation=this.user.userType
    console.log(this.name)
    console.log(this.total);
    this.search=''
          setTimeout (() => {
            this.loader='';

          }, 100);
        }))
        this.ExportToExcel();
      }
    //   public onDate(event): void
    //   {
    //     if(this.search.date_created)
    //   {
    //     this.search.travel_date=moment(event.value).format('YYYY-MM-DD');
    //     console.log(this.search.travel_date);
    //   }
    //   if(this.search.date_from)
    //   {
    //     this.search.date_from=moment(this.search.date_from).format('YYYY-MM-DD');
    //   }
    //   console.log(this.search.date_to)


    //   if(this.search.date_to)
    //   {
    //     this.search.date_to=moment(this.search.date_to).format('YYYY-MM-DD');
    //     console.log(this.search.date_to)
    //   }

    //     this.expenseList();

    // }
      ExportToExcel()
  {
    console.log(this.table.nativeElement);
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Expense Report.xlsx');

  }
}
