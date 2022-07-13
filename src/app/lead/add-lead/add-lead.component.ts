import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import { _localeFactory } from '@angular/core/src/application_module';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import * as moment from 'moment';
import {  sessionStorage} from 'src/app/localstorage.service';


@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  animations: [slideToTop()]

})
export class AddLeadComponent implements OnInit {

  tmp_list: any = [];
  data: any = {};
  contact_person: any = {};
  state_list: any = [];
  city_area_list:any=[];

  countryList: any = [];
  district_list: any = [];
  city_list: any = [];
  pinCode_list: any = [];
  mobileNoCheck: any = false;
  gstCheck: any = false;
  type:'';
  company_name='';
  name='';
  mobile='';
  source='';
  status='';
  category='';
  state='';
  district='';
  cityArea='';
  pincode='';
  city='';
  today_date: any;
  userData: any;
  userId: any;
  userName: any;
  networkType : any = [];
  constructor(public serve: DatabaseService, public rout: Router, public session: sessionStorage, public dialog: DialogComponent, public ActivatedRoute:ActivatedRoute) {

    this.today_date = new Date();
    this.userData = JSON.parse(localStorage.getItem('st_user'));
    this.userId=this.userData['data']['id'];
    this.userName=this.userData['data']['name'];
    // this.getStateList();
    this.salesUserLIst();
    // this.getCountryList();
    this.data.assignUser = [];
    this.getStateList();
  }

  ngOnInit() {

    this.ActivatedRoute.params.subscribe(params => {
      this.today_date = new Date().toISOString().slice(0, 10);
      console.log(params);
      this.data.dr_type = params.id;
    });

    this.getNetworkType();
    this.getsource_list() ;

  }


  pinCheck: any = [];
  userCheck: any = [];
  // id: any = [];
  loader: boolean;

  //submit function
  submitDetail() {
    console.log("in submit function");
    console.log(this.data);

    this.data.date_of_anniversary = moment(this.data.date_of_anniversary).format('YYYY-MM-DD');
    this.data.date_of_birth = moment(this.data.date_of_birth).format('YYYY-MM-DD');
    this.data.uid=this.userId;
    this.data.uname=this.userName;
    if(this.userId!='1'){
      this.ass_user = [{ id: this.userId, name: this.userName }],
  console.log(this.ass_user)

      this.data.assignUser = this.ass_user;

  }
    // if (this.data.assignUser.length == !0)
    // {
    this.serve.fetchData({ 'data': this.data}, "Lead/addNewLead").subscribe((result => {
      console.log(result);

      if (result['status'] == 'Success') {
        console.log('in if codition');

        //timeout function
        setTimeout(() => {
          this.loader = false;

        }, 700);

        //success dialog box
        this.dialog.success_att("DataSave", "Success");
        this.userCheck = false;
        this.rout.navigate(['/lead-detail/'+result['lead_id']]);

        //routing
        // this.rout.navigate(['/lead-list/' + this.data.dr_type +'/'+this.data.type_name]);
      }

      else {
        console.log('in else condtion');
        console.log(result['error']['message']);
        this.dialog.error(result['error']['message']);
      }
    }))
    // }
    // else {
    //   this.userCheck = true;
    // }
  }


  //user assing function
  user_assign_check(index) {
    this.userCheck = false;
    this.data.assignUser = [];

    console.log(index);
    this.data.assignUser.push({ id: this.asmList[index]['id'], name: this.asmList[index]['name'] });
    console.log(this.data.assignUser);
    console.log(this.data.assignUser.length);
  }

  active: any = {};

  toggleterritory(key, action) {
    console.log(action);
    console.log(key);

    if (action == 'open') { this.active[key] = true; }
    if (action == 'close') { this.active[key] = false; }

    console.log(this.active);
    this.salesUserLIst();
    // key = '';
  }
  MobileNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) { event.preventDefault(); }
  }
  search: any = {};
  tmpsearch: any = {};
  getItemsList(search) {
    console.log(search);

    this.asmList = [];
    for (var i = 0; i < this.tmp_userList.length; i++) {
      search = search.toLowerCase();
      this.tmpsearch = this.tmp_userList[i]['name'].toLowerCase();
      if (this.tmpsearch.includes(search)) {
        this.asmList.push(this.tmp_userList[i]);
      }
    }
    console.log(this.asmList);

  }

  leng: any = [];

  getStateCountry(pin) {
    console.log(pin);
    this.leng = pin.length;
    console.log(this.leng);
    this.data.state = '';
    this.data.district = '';
    this.data.city = '';
    this.pinCheck = false;
    if (this.leng == 6) {
      this.serve.fetchData('', "Lead/getAddress/" + pin).subscribe((result => {
        console.log(result);
        console.log(result['status']);

        if (result['status'] == 'Success') {
          this.data.state = result['data']['state_name'];
          this.data.district = result['data']['district_name'];
          this.data.city = result['data']['city'];
          this.getCityList();
        }
        else {
          console.log('in else condtion');
          this.pinCheck = true;
        }
      }))
    }


  }

  getNetworkType() {
    this.serve.fetchData('', "Dashboard/leadNetworkModule").subscribe((result => {
      console.log(result);
      this.networkType = result['modules'];
    }))
  }
  source_list:any=[];
  getsource_list() {
    this.serve.fetchData('', "Lead/lead_source_list").subscribe((result => {
      console.log(result);
      this.source_list = result['lead_source_list'];
    }))
  }

  check_gst(gstLength) {
    console.log(gstLength);
    this.gstCheck = true;
    if (gstLength.length == 16 || gstLength.length == 0) {
      this.gstCheck = false;
    }
  }



  checkSecondaryMobile(secondaryMobileNo) {
    console.log(secondaryMobileNo);
    this.mobileNoCheck = true;
    if (secondaryMobileNo.length == 10 || secondaryMobileNo.length == 0) {
      this.mobileNoCheck = false;
    }
  }


  tmp_userList: any = [];

  asmList: any = [];
  assignUserList: any = [];
  assignUser: any = [];

  salesUserLIst() {
    this.serve.fetchData(0, "User/sales_user_list").subscribe((result => {
      console.log(result);
      this.asmList = result['sales_user_list'];
      this.tmp_userList = this.asmList;
      console.log(this.assignUserList[0]);


      for (let i = 0; i < this.asmList.length; i++) {

        for (let j = 0; j < this.assignUserList.length; j++) {
          if (this.asmList[i].id == this.assignUserList[j]) {
            this.asmList[i].check = true;
            this.assignUser.push(this.asmList[i]);
            console.log(this.asmList[i].check);

          }
        }

      }
      console.log(this.assignUser);
    }))

  }

  removeContact(index) {
    this.tmp_list.splice(index, 1);
  }
  rsm: any = [];
  ass_user: any = [];

  getStateList() {
    this.serve.fetchData(0, "User/state_user_list").subscribe((response => {
      console.log(response);
      this.state_list = response['query']['state_name'];
    }));
  }

  getDistrict() {
    this.serve.fetchData(this.data.state, "User/district_user_list").subscribe((response => {
      // console.log(response);
      this.district_list = response['query']['district_name'];
    }));
  }

  getPinCodeList() {
    let value = { "state": this.data.state, "district": this.data.district, "city": this.data.city }
    this.serve.fetchData(value, "User/pincode_user_list").subscribe((response => {
      console.log(response);
      this.pinCode_list = response['query']['pincode'];
    }));
  }

  getCityList() {
    let value = { "state": this.data.state, "district": this.data.district }
    this.serve.fetchData(value, "User/city_user_list").subscribe((response => {
      console.log(response);
      this.city_list = response['query']['city'];


    }));
    let value1 = { "state": this.data.state, "district": this.data.district,'city':this.data.city }

    this.serve.fetchData(value1, "User/area_user_list").subscribe((response => {
      console.log(response);

      this.city_area_list = response['query']['area'];

    }));
  }


}
