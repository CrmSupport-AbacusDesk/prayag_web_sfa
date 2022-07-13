import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from 'src/app/dialog.component';

@Component({
  selector: 'app-update-admin-model',
  templateUrl: './update-admin-model.component.html',
  styleUrls: ['./update-admin-model.component.scss']
})
export class UpdateAdminModelComponent implements OnInit {
  data:any={}
  
  constructor(@Inject(MAT_DIALOG_DATA) public stored_data,public serve:DatabaseService,public toast:ToastrManager,public dialog:MatDialog, public dialog1:DialogComponent) { }
  ngOnInit() 
  {
    console.log(this.stored_data);
    
    this.getCurrentDetails()
  }
  // data:any={};
  getCurrentDetails()
  {
    this.serve.fetchData({},"User/getAdminDetails").subscribe((result)=>
    {
      console.log(result);
      this.data.crm_user_name = result[0]['username'];
      this.data.crm_password = result[0]['password'];
      this.data.loyalty_username = result[1]['email'];
      this.data.loyalty_password = result[1]['visible_password'];
    });    
  }

  update()
  {
    let crm =  {username:this.data.crm_user_name,password:this.data.crm_password}
    let loyalty =  {username:this.data.loyalty_username,password:this.data.loyalty_password}

    this.serve.fetchData({crm:crm,loyalty:loyalty},"User/updateAdminDetails").subscribe((result)=>
    {
      console.log(result);
      this.toast.successToastr("success");
      this.dialog.closeAll();
    });    
  }

  addCategory()
  {
    this.serve.fetchData(this.data,"Product/addCategory").subscribe((result)=>{
      console.log(result);
      if(result['msg'] == 'success')
      {
        this.toast.successToastr("success");
        this.dialog.closeAll();
      } 
      else if(result['msg'] =='exist')
      {
        this.dialog1.error('Category Already Exist! Try Again ...');

      }
      else
      {
        this.dialog1.error('Something went wrong! Try Again ...');

      }
    });    
  }
}
