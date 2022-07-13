import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';

@Component({
  selector: 'app-plumber-edit-model',
  templateUrl: './plumber-edit-model.component.html',
  styleUrls: ['./plumber-edit-model.component.scss']
})
export class PlumberEditModelComponent implements OnInit {

  state_list:any=[];
  district_list:any=[];
  city_list:any=[];
  pinCode_list:any=[];

  constructor(@Inject(MAT_DIALOG_DATA)public data,public serve:DatabaseService,public rout:Router,public dialog:MatDialog,public alert:DialogComponent) 
  { 
    console.log(data);

    if(data.type=='address')
    {
      this.getStateList();
      this.getDistrict(data.state, 1);
      this.getCityList(data.district,data.state, 1);
      this.getPinCodeList(data.district,data.state,data.city, 1);
    }

  }

  ngOnInit()
  {
  }


  getStateList()
  {
    console.log("addUser");
    this.serve.fetchData(0,"Plumber/state_user_list").subscribe((response=>{
      console.log(response);  
      this.state_list=response['query']['state_name'];
      console.log(this.state_list);

            
    }));
    
  }
    getDistrict(state_name, src)
    {
      console.log(state_name);

      if(src == 2) {
        this.data.district = '';
        this.data.city = '';
        this.data.pincode = '';
      }
      this.serve.fetchData(state_name,"Plumber/district_user_list").subscribe((response=>{
        this.district_list=response['query']['district_name'];
        console.log(this.district_list);
        
      }));
        
    }
    MobileNumber(event: any) 
    {
      console.log(event);
      
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) 
      {event.preventDefault(); }
     }

    getCityList(district,state, src)
    {
      console.log(district);
      console.log(state);

      if(src == 2) {
        this.data.city = '';
        this.data.pincode = '';
      }

      let value={"state":state,"district":district}
      this.serve.fetchData(value,"Plumber/city_user_list").subscribe((response=>{
        console.log(response);
        this.city_list=response['query']['city'];
        console.log(this.city_list);
        
      }));
    }

   getPinCodeList(district,state,city, src)
    {

      if(src == 2) {
        this.data.pincode = '';
      }
     
      console.log(district,state,city);
      let value={"state":state,"district":district,"city":city}
      this.serve.fetchData(value,"Plumber/pincode_user_list").subscribe((response=>{
        console.log(response);
        this.pinCode_list=response['query']['pincode'];
        console.log(this.pinCode_list);
        
      }));
    }

  updatePlumber(data)
  {
    console.log(data);
    this.serve.fetchData(data,"Plumber/plumber_update").subscribe((result=>{
      console.log(result);
      if(result['plumber_update'] == "success")
      {
        this.alert.success("Detail","Updated");
        this.dialog.closeAll();
      }      
    }))

  }
  

}
