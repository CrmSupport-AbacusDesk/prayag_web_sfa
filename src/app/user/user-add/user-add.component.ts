import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import {  sessionStorage} from 'src/app/localstorage.service';
import * as moment from 'moment';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  animations: [slideToTop()]
  
})
export class UserAddComponent implements OnInit {
  
  tabActiveType: any = {};
  state_list: any = [];
  state: any = [];
  rsm_list: any;
  data: any = {};
  district_list: any = [];
  city_list: any = [];
  area_list: any = [];
  pinCode_list: any = [];
  isslected;
  user_type;
  usertype = true;
  basicdetails = false;
  userrole;
  active: any = {};
  sales_type: any = [];
  reporting_sales_type: any = [];
  rsm: any = [];
  ass_user: any = [];
  tmp_userList: any = [];
  search: any = {};
  tmpsearch: any = {};
  submit = false;
  loader: any;
  module_name: any = [];
  access: any = {};
  exist:boolean=false;
  assign_module_data:any=[];
  userData: any;
  userId: any;
  userName: any;

  
  constructor(public serve: DatabaseService,public session: sessionStorage, public rout: Router,public dialog: DialogComponent) {
    this.getStateList();
    this.get_sales_user_type(2);
    this.assign_users('');
    this.get_module_data();
    this.data.user_type = 'Sales User';
    this.data.user_role = '3';
    this.userData = JSON.parse(localStorage.getItem('st_user'));
    this.userId=this.userData['data']['id'];
    this.userName=this.userData['data']['name'];
  }
  
  tabActive(tab: any) {
    this.tabActiveType = {};
    this.tabActiveType[tab] = true;
  }
  
  
  
  ngOnInit() {
    // this.rsmassign();
    this.userType('MARKET')
  }
  
  toggleterritory(key, action) {
    console.log(action);
    console.log(key);
    
    if (action == 'open') { this.active[key] = true; }
    if (action == 'close') { this.active[key] = false; }
    
    console.log(this.active);
  }
  
  
  MobileNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) { event.preventDefault(); }
    
  }
  
  
  check_number() {
    if (this.data.mobileno.length == 10) {
      this.serve.fetchData({ "mobile": this.data.mobileno }, "User/check_user").subscribe((result => {
        if (result['exists']) {
          this.exist = true;
        }
        else {
          this.exist = false;
        }
      }))
    }
  }
  
  
  
  userType(usertype) {
    this.user_type = usertype.value
    console.log(this.user_type);
    
    if (this.user_type) {
      this.data.user_type = this.user_type;
      console.log(this.data.user_type);
      this.basicdetails = true;
    }
  }
  
  submitDetail() {
    this.loader = true;
    this.submit = true;
    // this.data.assignuser = this.ass_user;
    
    console.log(this.data);
    
    // return;
    if(this.data.date_joining){
      this.data.date_joining = moment(this.data.date_joining).format('YYYY-MM-DD');
      
  this.data.date_joining=this.data.date_joining;
  
      }
    
    // if (this.data.userrole == '8')
    if (this.data.user_type == 'System User')
    this.data.accessValue = this.access
    this.data.assignModule=(this.assign_module_data);
    this.data.uid=this.userId;
    this.data.uname=this.userName;
    
    console.log(this.data);
    this.serve.fetchData(this.data, "User/add_user").subscribe((response => {
      
      console.log(response);
      if(response['msg']=="success"){
        
        this.dialog.success("User", "Added");
        this.loader = false;
        this.rout.navigate(['/sale-user-list']);
      }
      else{
        
        this.dialog.error("Something Went Wrong Please try again !");
        this.loader = false;
      }
      
    }));
  }
  
  
  getStateList() {
    console.log("addUser");
    this.serve.fetchData(0, "User/state_user_list").subscribe((response => {
      console.log(response);
      this.state = response['query'];
      this.state_list = this.state['state_name'];
      console.log(this.state_list);
      
    }));
    
  }
  
  getDistrict() {
    console.log(this.data.state);
    this.serve.fetchData(this.data.state, "User/district_user_list").subscribe((response => {
      // console.log(response);
      this.district_list = response['query']['district_name'];
      console.log(this.district_list);
    }));
    
  }
  
  getCityList() {
    console.log(this.data.district);
    let value = { "state": this.data.state, "district": this.data.district }
    this.serve.fetchData(value, "User/city_user_list").subscribe((response => {
      console.log(response);
      this.city_list = response['query']['city'];
      console.log(this.city_list);
    }));
  }
  
  getPinCodeList() {
    console.log(this.data.state, this.data.city, this.data.district);
    let value = { "state": this.data.state, "district": this.data.district, "city": this.data.city }
    this.serve.fetchData(value, "User/pincode_user_list").subscribe((response => {
      console.log(response);
      this.pinCode_list = response['query']['pincode'];
      console.log(this.pinCode_list);
      
    }));
  }
  
  get_sales_user_type(a) {
    // console.log(this.data.state,this.data.city,this.data.district);
    // let value={"state":this.data.state,"district":this.data.district,"city":this.data.city}
    this.serve.fetchData({'user_role':a}, "User/sales_type").subscribe((response => {
      console.log(response);
      console.log(response['sales']);
      
      this.sales_type = response['sales'];
      console.log(this.sales_type);
      
    }));
  }
  
  getreporting_users(user_type) {
    console.log(user_type);
    this.serve.fetchData({ 'user_type': user_type }, "User/reportingsales_type").subscribe((response => {
      console.log(response);
      
      
      this.reporting_sales_type = response['reportingsales_type'];
      console.log(this.reporting_sales_type);
      
    }));
  }
  
  assign_users(usertype) {
    this.serve.fetchData({ 'user_type': usertype }, "User/assign_users").subscribe((response => {
      console.log(response);
      this.rsm_list = response['assign_users'];
      console.log(this.rsm_list);
      this.tmp_userList = this.rsm_list;
    }));
  }
  
  
  //user assing function
  user_assign_check(index) {
    // this.userCheck = false;
    this.rsm.push(index);
    console.log(this.rsm);
    this.data.assignUser = [];
    
    console.log(index);
    this.data.assignUser.push({ id: this.rsm_list[index]['id'], name: this.rsm_list[index]['name'] });
    console.log(this.data.assignUser);
    console.log(this.data.assignUser.length);
    this.ass_user = this.rsm;
  }
  
  product_Brand(value, index, event) {
    if (event.checked) {
      this.rsm.push(value);
      console.log(this.rsm);
    }
    else {
      for (var j = 0; j < this.rsm_list.length; j++) {
        if (this.rsm_list[index]['id'] == this.rsm[j]) {
          this.rsm.splice(j, 1);
        }
      }
      console.log(this.rsm);
    }
    this.ass_user = this.rsm
    
  }
  
  getItemsList(search) {
    console.log(search);
    
    this.rsm_list = [];
    for (var i = 0; i < this.tmp_userList.length; i++) {
      search = search.toLowerCase();
      this.tmpsearch = this.tmp_userList[i]['name'].toLowerCase() + ' ' + this.tmp_userList[i]['role_name'].toLowerCase();
      if (this.tmpsearch.includes(search)) {
        this.rsm_list.push(this.tmp_userList[i]);
      }
    }
    console.log(this.rsm_list);
    
  }
  
  
  get_module_data() {
    console.log("get_module_data method calls");
    this.serve.fetchData(0, "user/module_master_list").subscribe((response => {
      console.log(response);
      this.assign_module_data = response['result'];
      console.log(this.assign_module_data);
    }));
    
  }
  
  assign_module(module_name, event , index) {
    
    console.log(module_name);
    console.log(event);
    console.log(index);
    
    if (event.checked) {
      // this.assignModule[module_name]=1;
      this.assign_module_data[index][module_name] = 'true';
      // this.assign_module_data[index]['view'] = 'true';
      
    }
    else {
      // this.assignModule[module_name]=0;
      this.assign_module_data[index][module_name] = 'false';
      
    }
    
    // console.log(this.assignModule);
    console.log(this.assign_module_data);
    
  }
  
  
  
}
