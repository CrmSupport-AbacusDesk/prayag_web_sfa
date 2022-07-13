import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog.component';
import {  sessionStorage} from 'src/app/localstorage.service';


@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {

  data:any=[];
  state_list=[];
  district_list=[];
  city_list=[];
  pinCode_list=[];
  userData: any;
  userId: any;
  userName: any;

  constructor(@Inject(MAT_DIALOG_DATA)public value,public serve:DatabaseService,public dialog:MatDialog,public rout:Router,public alert:DialogComponent) { 
    console.log(value);
    this.data=value['data'];
    // this.datavalue();
    this.getStateList();
    this.getDistrict(2);
    this.getCityList(2);
    this.getPinCodeList(2);
    this.userData = JSON.parse(localStorage.getItem('st_user'));
    this.userId=this.userData['data']['id'];
    this.userName=this.userData['data']['name'];
  }
  
  ngOnInit() {
    // console.log(this.data);

  }

  // console.log(this.data);
// datavalue()
// {
//   // console.log(this.value);
//   // this.data=this.value['data'];
//   // console.log(this.data);
//   console.log(this.data['state_name']);
//   console.log(this.data['district_name']);
//   console.log(this.data['city']);
//   console.log(this.data['pincode']);
  
  
  
  
// }

getStateList()
{
  this.serve.fetchData(0,"User/state_user_list").subscribe((response=>{
    console.log(response);  
    this.state_list=response['query']['state_name'];
    console.log(this.state_list);   
  }));
}
  getDistrict(src)
  {
    if(this.data.permanent_address_state)
    {
      this.data.state_name = this.data.permanent_address_state;
    }

    if(src == 1) {
      this.data.district_name = '';
      this.data.city = '';
      this.data.pincode = '';
    }
    console.log(this.data);
    this.serve.fetchData(this.data.state_name,"User/district_user_list").subscribe((response=>{
      console.log(response);
      this.district_list=response['query']['district_name'];
      console.log(this.district_list);
      
    }));
      
  }

  getCityList(src)
  {
    
    if(src == 1) {
      this.data.city = '';
      this.data.pincode = '';
    }
    console.log(this.data.district_name);
    let value={"state":this.data.state_name,"district":this.data.district_name}
    this.serve.fetchData(value,"User/city_user_list").subscribe((response=>{
      console.log(response);
      this.city_list=response['query']['city'];
      console.log(this.city_list);
      
    }));
  }

 getPinCodeList(src)
  {
    if(src == 1) {
      this.data.pincode = '';
    }
    console.log(this.data.state_name,this.data.city,this.data.district_name);
    let value={"state":this.data.state_name,"district":this.data.district_name,"city":this.data.city}
    this.serve.fetchData(value,"User/pincode_user_list").subscribe((response=>{
      console.log(response);
      this.pinCode_list=response['query']['pincode'];
      console.log(this.pinCode_list);
      
    }));
  }


  update_user()
  {
      let value={data:this.data,"user_id":this.data['id'],"uid":this.userId,"uname":this.userName}
      this.serve.fetchData(value,"user/update_user").subscribe((resp)=>{
      if(resp)
      {
        this.alert.success("Detail","Updated");
        this.dialog.closeAll();
      }
      });
}
}
