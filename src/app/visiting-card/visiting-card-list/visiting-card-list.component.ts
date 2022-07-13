import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';

// import { type } from 'os';
import { DatabaseService } from 'src/_services/DatabaseService';
import { VisitingCardStatusModalComponent } from '../visiting-card-status-modal/visiting-card-status-modal.component';

@Component({
  selector: 'app-visiting-card-list',
  templateUrl: './visiting-card-list.component.html'
})
export class VisitingCardListComponent implements OnInit {
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  length = 0;
  start = 0;
  end = 10;
  pageEvent: PageEvent;
  tabActiveType: any = {};
  visitingCard: any = [];
  allCount: any = [];
  data: any = [];
  visitingCardList: any = [];
  inc = 0;
  visitingCardDetail: any = [];
  sendData: any = {};
  companyType: any;
  loader = false;
  today_date:Date;
  skloading=[];
  skelton = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ];


  constructor(public dialog: MatDialog, public serve: DatabaseService) {
    this.today_date = new Date();
    this.tabActive('tab0');
    this.sendData = {
      created_by_user: '',
      name: '',
      mobile: '',
      company_email: '',
      company_name: '',
      type: '',
      start: '',
      page_size: '',
      end: '',
      status: '',
      date_from: '',
      date_to: '',

    };

    this.getVisitingCardList();

    this.skelton = Array(10);

  }


  ngOnInit() { }

  selectType(type) {
    console.log(type);
    this.companyType = type;
    this.getVisitingCardList();



  }

  getVisitingCardList() {




    if ((this.data.date_from) && (this.data.date_to)) {
      this.sendData = {
        created_by_user: this.data.created_by,
        name: this.data.contact_person,
        mobile: this.data.mobile_number,
        company_email: this.data.Emai_ID,
        company_name: this.data.company_name,
        type: this.companyType,
        start: this.start,
        page_size: this.pageSize,
        end: this.end,
        status: this.status,
        date_from: moment(this.data.date_from).format('YYYY-MM-DD'),
        date_to: moment(this.data.date_to).format('YYYY-MM-DD'),
      };
    }

    else {
      this.sendData = {
        created_by_user: this.data.created_by,
        name: this.data.contact_person,
        mobile: this.data.mobile_number,
        company_email: this.data.Emai_ID,
        company_name: this.data.company_name,
        type: this.companyType,
        start: this.start,
        page_size: this.pageSize,
        end: this.end,
        status: this.status,
      };
    }

    console.log(this.sendData);
    this.loader = true;
    this.visitingCardDetail = [];
    this.serve.get_rqst2(this.sendData, "distributors/filterVistingCardData").subscribe((result) => {
      this.loader = false;

      console.log(result);
      this.allCount = result['all_cont'];
      console.log(result.result.length);
      this.visitingCardDetail = result.result
      console.log(this.allCount);
      console.log((this.visitingCardDetail));
    })

  }

  status: any;

  tabActive(tab: any) {
    this.tabActiveType = {};
    this.tabActiveType[tab] = true;
    if (tab == 'tab0') {
      // alert('pend');
      this.status = "all";
    }
    if (tab == 'tab1') {
      // alert('pend');
      this.status = "pending";
    }
    if (tab == 'tab2') {
      this.status = "running";
    }
    if (tab == 'tab3') {
      this.status = "delivered";
    }
    if (tab == 'tab4') {
      this.status = "received";
    }
    if (tab == 'tab5') {
      this.status = "reject";
    }
    this.getVisitingCardList();
  }




  statusModal(visiting_card) {
    console.log(visiting_card);
    const dialogRef = this.dialog.open(VisitingCardStatusModalComponent, {
      width: '700px',
      data: {
        data: visiting_card
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // this.length = result.length;
      console.log('The dialog was closed');
      this.getVisitingCardList();

    })

  };


  deleteVistingCard(id) {
    var data = { type: 'del', id: id };
    this.loader = true;

    this.serve.get_rqst2(data, "distributors/change_status").subscribe((result) => {
      this.loader = false;

      if (result) {
        console.log("Success");
        this.getVisitingCardList();
      }

    })
  }

  excel_data: any = [];

  exportAsXLSX(): void {
    for (let i = 0; i < this.visitingCardDetail.length; i++) {
      this.excel_data.push({ 'Date Created': this.visitingCardDetail[i].created_at, 'Date Updated': this.visitingCardDetail[i].updated_at, 'Created By': this.visitingCardDetail[i].created_by_user, 'Company Name': this.visitingCardDetail[i].company_name, 'Contact Person': this.visitingCardDetail[i].name, 'Address': this.visitingCardDetail[i].address, 'Mobile': this.visitingCardDetail[i].mobile, 'Email': this.visitingCardDetail[i].company_email, 'Description ': this.visitingCardDetail[i].description, 'Total Cards ': this.visitingCardDetail[i].total_cards, 'Status': this.visitingCardDetail[i].status,'Last Request': this.visitingCardDetail[i].last_request_date  });
    }
    this.serve.exportAsExcelFile(this.excel_data, 'Visiting Card List Data');
    this.excel_data=[];
  }

  public getServerData(event: PageEvent) {
    this.sendData = {
      created_by_user: this.data.created_by,
      name: this.data.contact_person,
      mobile: this.data.mobile_number,
      company_email: this.data.Emai_ID,
      company_name: this.data.company_name,
      type: this.companyType,
      start: this.start,
      page_size: this.pageSize,
      end: this.end,
    };



    if (event.pageIndex != 0) {
      this.inc = 1;
    }
    this.start = event.pageIndex * 10 + this.inc;
    this.end = (event.pageIndex + 1) * 10;
    this.getVisitingCardList();
  }


  refresh() {


    this.data.created_by=null;
      this.data.contact_person=null;
      this.data.company_name=null;
      this.companyType=null;
      this.data.date_from=null;
      this.data.date_to=null;

      this.getVisitingCardList();
  }

}
