import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { sessionStorage } from 'src/app/localstorage.service';
// import { PearlService } from 'src/app/pearl.service';
import { DatabaseService } from 'src/_services/DatabaseService';
import { PopGiftAddComponent } from '../pop-gift-add/pop-gift-add.component';
import { PopGiftIssueModalComponent } from '../pop-gift-issue-modal/pop-gift-issue-modal.component';


@Component({
  selector: 'app-pop-gift-list',
  templateUrl: './pop-gift-list.component.html'
})
export class PopGiftListComponent implements OnInit {
  skelton:any={}
  data:any={};
  PopData:any=[];
  result: any=[];
  data_not_found=false;
  loader:any;


  assign_login_data: any = [];
  assign_login_data2: any = [];

  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;


  constructor(public serve: DatabaseService, public dialog: MatDialog,public dialog1:DialogComponent, public route:Router,public session:sessionStorage) {
    this.skelton = new Array(10);

    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;

    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'Pop & Gift');
    console.log(index);

    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;

    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);

    this.gift_list();
  }

  ngOnInit() {
  }

  gift_list()
  {
    this.loader=1;

    this.serve.fetchData({'user_id':this.assign_login_data2.id},"PopGift/pop_gift_list").subscribe((result=>{
      console.log(result);
      this.PopData=result['PopData'];

      console.log(this.PopData);
      if(this.PopData.length == 0)
        {
          this.data_not_found = true;
        }
        else
        {
          this.data_not_found = false;
        }
        this.loader='';
    }))

  }



  popModal(type,id,user_id,)
  {
    const dialogRef = this.dialog.open(PopGiftIssueModalComponent, {
      width:'768px',
      data:{
        type,
        id,
        user_id,
      }});
      dialogRef.afterClosed().subscribe(result => {
        this.gift_list();
        setTimeout (() => {
          this.loader='';

        }, 100);

      });
    }


    deleteGift(id)
    {
      this.dialog1.delete('POP Gift Data!').then((result) => {
        if(result)
        {console.log(id);
          this.serve.fetchData({"id":id},"PopGift/delete_pop_gift").subscribe((result=>{
            console.log(result);
            // if(result)
            // {
              this.gift_list();
            // }
          }))
        }})

      }

      edit(id) {

      this.route.navigate(["/pop-gift-add/"+id])

      }

    }
