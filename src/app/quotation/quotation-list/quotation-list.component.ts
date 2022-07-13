import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { QuotationDetailModalComponent } from 'src/app/lead/quotation-detail-modal/quotation-detail-modal.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog.component';
import { QuotationAddComponent } from '../quotation-add/quotation-add.component';
// import { sessionStorage } from '../localstorage.service';
import { sessionStorage } from 'src/app/localstorage.service';


@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
})
export class QuotationListComponent implements OnInit {

  lead_id: any;
  loader: boolean=false;
  start: any = 0;
  value: any = {}
  page_limit: any = 10
  quotation_list: any = [];
  tmp_quotationList: any;
  data_not_found = false;
  quotation_List : any;
  total_page: any;
  pagenumber: any;
  count: any;
  quotationType = 'All';
  skelton:any={};
search_val:any={};
login_data:any={}
  // tabActiveType: any = {};

  constructor(
    public serve: DatabaseService,
    public dialog: MatDialog,
    public alert: DialogComponent,
    public session:sessionStorage
  ) {
    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value;
    this.login_data = this.login_data.data;
    console.log(this.login_data);
    this.skelton = new Array(10);
    this.quotationList('');
  }

  // tabActive(tab: any) {
  //   this.tabActiveType = {};
  //   this.tabActiveType[tab] = true;
  // }

  ngOnInit() {
  }

  // getQuotationList(start, end,quotation_status) {
  //   this.loader = 1;
  //   this.start = start;
  //   this.page_limit = end;
  //   this.quotation_List = [];
  //   this.serve.fetchData({ "status":quotation_status,"start": this.start, "pagelimit": this.page_limit, "search": this.value.search }, "User/sales_user_list").subscribe((result) => {
  //     this.quotation_List = result['sales_user_list'];
  //     // console.log(this.userlist[1]['status']);

  //     this.tmp_quotationList = result['sales_user_list'];



  //     this.count = this.quotation_List.length;
  //     this.total_page = Math.ceil(this.count / this.page_limit);
  //     this.pagenumber = Math.ceil(this.start / this.page_limit) + 1;
  //     setTimeout(() => {
  //       this.loader = '';
  //     }, 700);
  //     if (this.quotation_List.length == 0) {
  //       this.data_not_found = true;
  //     }
  //   })


  //   // this.exceldata();

  // }
  quotationDialog() {
    console.log('quotation Dialog box function');

    const dialogRef = this.dialog.open(QuotationDetailModalComponent, {
      width: '768px',
      data: {
        
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.quotationList('');
    });
  }

  quotationList(status) {
    this.loader = true;
    console.log("Quotation list function call");
    // this.loader=true;
    this.quotation_list = [];
    var data = { 'status': status }

    this.serve.fetchData({data,'search':this.search_val,'user_id':this.login_data.id}, "Lead/quotationList").subscribe((result => {
      console.log(result);
      this.quotation_list = result['data'];
      console.log(this.quotation_list);

      setTimeout(() => {
        this.loader = false;

      }, 700);
      if (this.quotation_list.length == 0) {
        this.data_not_found = true;
      } else {
        this.data_not_found = false;
      }

    }))
  }

  deleteQuotation(id){
    this.alert.confirm('You will not be able to recover this Quotation !').then((result) => {
      if (result) {
        this.loader = true;
        this.serve.fetchData({ 'id': id }, "Lead/delete_quotation ").subscribe((result => {
          if((result['msg']) == ('Deleted')){
            this.loader = false;
            this.quotationList('');
            this.quotationType='All';
            
          }
        }))
      }
    });
  }
  
  addQuotation(){
    console.log("in add quotation");
    const dialogRef = this.dialog.open(QuotationAddComponent, {
      width:'1000px',
      data:{
        
      }});
      dialogRef.afterClosed().subscribe(result => {
        this.skelton = new Array(10);
        this.quotationList('');
      });
      
    
    
  }

}