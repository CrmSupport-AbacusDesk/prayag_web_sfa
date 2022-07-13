import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog } from '@angular/material';
import { PlumberEditModelComponent } from '../plumber-edit-model/plumber-edit-model.component';

@Component({
  selector: 'app-plumber-detail',
  templateUrl: './plumber-detail.component.html',
  styleUrls: ['./plumber-detail.component.scss']
})
export class PlumberDetailComponent implements OnInit {
  id:any;
  loader:any;
  lead_detail:any={};
  subCategory:any='';
  category:any='';
  plumber_data:any=[];
  qr_code_data:any=[];

  constructor(public route:ActivatedRoute,public rout:Router,public toast:ToastrManager,public serve:DatabaseService,public dialog: MatDialog) 
  { 
    this.route.params.subscribe( params => {
      console.log(params);
      this.id = params.id;
      console.log(this.id);
      if(this.id){
        this.plumber_detail();
        this.qr_code_list();
      }
    });
  }
  
  ngOnInit() {
    
  }
  
  plumber_detail()
  {
    this.serve.fetchData(this.id,"Distributors/plumber_detail").subscribe(result=>
    {
      console.log(result);
      this.plumber_data = result;
    });
  }

  edit_plumber_detail(plumber_name,email,mobile,whatsapp_no,dob,doa,dealer_name,dealer_mobile,status,type)
        { 
          const dialogRef = this.dialog.open(PlumberEditModelComponent, {
            width: '750px',
            data:{
              plumber_name,
              mobile,
              whatsapp_no,
              doa,
              dealer_name,
              dealer_mobile,
              dob,
              email,
              type,
              status,
              id:this.id
            }});
            dialogRef.afterClosed().subscribe(result => {
              console.log(result);
              console.log('The dialog was closed');
              this.plumber_detail();


            });
          }


  edit_plumber_address(state,district,city,pincode,type)
  {
    const dialogRef = this.dialog.open(PlumberEditModelComponent, {
      width: '750px',
      data:{
        state,
        district,
        city,
        pincode,
        type,
        id:this.id
      }});
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        console.log('The dialog was closed');
        this.plumber_detail();

      });

  }
  
  qr_code_list()
  {
    this.serve.fetchData(this.id,"Distributors/qr_code_list").subscribe(result=>
    {
      console.log(result);
      this.qr_code_data = result;
      console.log(this.qr_code_data);
    });
  }
}
