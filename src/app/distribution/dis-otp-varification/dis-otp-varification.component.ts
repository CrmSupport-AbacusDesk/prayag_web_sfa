import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog.component';

@Component({
  selector: 'app-dis-otp-varification',
  templateUrl: './dis-otp-varification.component.html',
  styleUrls: ['./dis-otp-varification.component.scss']
})
export class DisOtpVarificationComponent implements OnInit {
  
  constructor(public serve : DatabaseService, public rout:Router,@Inject(MAT_DIALOG_DATA)public data,public dialog:MatDialog ) { }
  
  ngOnInit() {
  }
  form:any={}
  convert()
  {
    this.form.submitted=true
    // this.form.otpCheckIsCorrect=true
    // this.form.otpEnteredotpEntered=true
    // this.form.maxlength=true
    setTimeout(() => {
      if(!this.form.otp)
    {
      // alert(1)
      this.form.otpEntered=false
      return;
      
    }
    if(this.form.otp.length!=6)
    {
      // alert(2)

      this.form.maxlength=false
      return;
      
    }
    if(this.data.otp!=this.form.otp)
    {
      // alert(3)

      this.form.otpCheckIsCorrect=false
      return;
    }
    console.log(this.data);
    
    this.serve.fetchData({type:this.data.type,dr_id:this.data.id},"Category_master/dr_type_update").subscribe((result=>{
      console.log(result);
      this.dialog.closeAll();

      if(this.data.type == 1){
        this.rout.navigate(['/distribution-list']);
      }
      if(this.data.type==7){
        this.rout.navigate(['/direct-dealer']);
        
      }
      
    }))
    }, 200);
  }
}
