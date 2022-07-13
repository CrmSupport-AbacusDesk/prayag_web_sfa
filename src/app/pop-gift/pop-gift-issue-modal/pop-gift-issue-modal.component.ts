import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
// import { PearlService } from 'src/app/pearl.service';
import * as moment from 'moment';
import {
  DialogComponent
} from 'src/app/dialog.component';
import {
  DatabaseService
} from 'src/_services/DatabaseService';
import {
  sessionStorage
} from 'src/app/localstorage.service';

const now = new Date();

@Component({
  selector: 'app-pop-gift-issue-modal',
  templateUrl: './pop-gift-issue-modal.component.html',
  styleUrls: ['./pop-gift-issue-modal.component.scss']
})
export class PopGiftIssueModalComponent implements OnInit {

  user_data: any = [];
  PopData: any = {};
  model_data: any = [];
  list: any = {};
  listarray: any = [];
  data1: any = {};
  loader: any;
  today_date: any;
  max: any;
  result: any = [];
  change: any = [];
  router: any;
  show: any = [];
  list1: any = {};
  logIN_user: any;
  itemName: any;
  flag = 0;
  user_id:any=[];
  showItemInfo: boolean = false;
  constructor(public serve: DatabaseService, @Inject(MAT_DIALOG_DATA) public data, public session: sessionStorage, public dialog: MatDialog, public dialog1: DialogComponent) {
    console.log(this.user_id);

    this.today_date = new Date().toISOString().slice(0, 10);
    console.log(this.today_date);

    this.get_data();
    this.logIN_user = JSON.parse(localStorage.getItem('st_user'));
    this.user_id=this.logIN_user['data']['id'];
    console.log(this.user_id);



    this.list.qty = 0;
  }

  ngOnInit() {

  }

  get_data() {
    this.serve.fetchData({}, "PopGift/pop_gift_list").subscribe((result => {
      console.log(result);
      this.user_data = result['PopData']
      console.log(this.user_data);
      for(let i=0; i<this.user_data.length;i++){
        this.user_data[i].qty_stock=parseInt(this.user_data[i].qty_stock)

      }
      console.log(this.user_data);
      this.show = this.user_data['qty_stock']
      console.log(this.show);

    }))
  }

  get_user() {
    this.serve.fetchData({ 'user_id': this.user_id
      ,'issue_type': this.PopData.issue_type
    }, "PopGift/get_alluser").subscribe((result => {
      console.log(result);
      this.model_data = result;
      console.log(this.model_data);
    }))

    this.showItemInfo = false;
    console.log(this.PopData.user_id);

  }







  addtolist() {
    console.log(this.list.show);
    console.log(this.listarray);
    console.log("hello");
    this.flag = 0;
    this.itemName;
    console.log(this.list.item_id);

    for (let i = 0; i < this.listarray.length; i++) {
      if ((this.list.item_id) == (this.listarray[i].item_id)) {
        this.flag++;
      }
    }

    if (this.flag == 1) {
      this.dialog1.error("Already Exist");

    } else {
      let index = this.user_data.findIndex(row => row.id == this.list.item_id)
      this.list.item_name = this.user_data[index].item_name

      let index1 = this.listarray.findIndex(row => row.item_id == this.list.item_id)

      if (index1 == -1) {
        this.listarray.push(this.list);
      } else {
        this.listarray[index1].qty = this.listarray[index1].qty + this.list.qty
      }

      this.list = {};


    }






  }

  delete(index) {
    this.listarray.splice(index, 1)
  }


  submit() {

    var local_data = {
      'issue_type': this.PopData.issue_type,
      'user_id': this.PopData.user_id,
      'delivery_note': this.PopData.delivery_note,
      'uid' : this.logIN_user.data.id,

    }

    console.log(local_data);

    this.serve.fetchData({
      'item_list': this.listarray,
      'user_data': local_data
    }, "PopGift/submit_popissue").subscribe((result => {
      console.log(result)

      this.dialog1.success("POP Gift", "Added");
      this.dialog.closeAll();


    }))
  }

  qtychange() {
    console.log("In Function");

    let index = this.user_data.findIndex(row => row.id == this.list.item_id);

    console.log(index);


    if (index != -1) {
      console.log(this.user_data[index]['qty_stock']);
      console.log(parseInt(this.user_data[index]['qty_stock']) < parseInt(this.list.qty));

      if (parseInt(this.user_data[index]['qty_stock']) < parseInt(this.list.qty)) {
        this.list.qty = parseInt(this.user_data[index]['qty_stock'])
        // alert('Please fill valid Qty');
      } else if (parseInt(this.list.qty) < 0) {
        this.list.qty = 0;
      }
    }

  }

  add_stock() {
    this.data1.id = this.data.id
    console.log(this.data1);
    this.data1.uid = this.logIN_user.data.id;
    console.log(this.data1.uid);

    this.data1.receiving_date = moment(this.data1.receiving_date).format('YYYY-MM-DD');
    this.serve.fetchData(this.data1, "PopGift/submit_stock").subscribe((result => {
      console.log(result);

      setTimeout(() => {
        this.loader = '';

      }, 100);

      this.dialog.closeAll();

    }))

  }
  show_stock(qty_stock) {

    this.show = qty_stock


    console.log(this.show);

    // console.log(value);
    // this.itemName = value;
    //  console.log(this.list.item_id);
    // this.list.qty = 0;

  }






}
