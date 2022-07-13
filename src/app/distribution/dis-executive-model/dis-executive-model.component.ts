import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-dis-executive-model',
  templateUrl: './dis-executive-model.component.html',
  styleUrls: ['./dis-executive-model.component.scss']
})
export class DisExecutiveModelComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data,public serve:DatabaseService,public dialog:MatDialog,public toast:ToastrManager) { }

  ngOnInit() {
    console.log(this.data);
    this.getUserDetail()
    this.getStateList()
  }
  userDetail:any={}
  state_list:any=[];
  district_list:any=[];
  getUserDetail()
  {
    this.serve.fetchData({id:this.data.userId},"User/userDetail").subscribe((result=>{
      console.log(result);
      this.userDetail = result['data'];
      console.log(this.userDetail);
      
    }))
  }
  getStateList()
  {
    console.log("addUser");
    
    this.serve.fetchData(0,"User/state_user_list").subscribe((response=>{
      console.log(response);  
      this.state_list=response['query']['state_name'];
      console.log(this.state_list);
      this.getDistrict()
    }));
    
  }
    getDistrict()
    {
      console.log(this.userDetail.state);
      this.serve.fetchData(this.userDetail.state_name,"User/district_user_list").subscribe((response=>{
        // console.log(response);
        this.district_list=response['query']['district_name'];
        console.log(this.district_list);
        
      }));
        
    }
    updateExecutiveDetail()
    {
      console.log(this.userDetail.state);
      this.serve.fetchData(this.userDetail,"User/updateDetails").subscribe((response=>{
        console.log(response);
       
        this.toast.successToastr("sucess");
        this.dialog.closeAll();
        
      }));
    }


}
