import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService'
import { DialogComponent } from 'src/app/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {
  loader:any;
  
  constructor(public rout:Router,public serve:DatabaseService,public dialog:DialogComponent,public dialog2:MatDialog) { 
    this.banner();
  }
  count:any=0;
  ngOnInit() {
  }
  banner_list:any=[];
  banner(){
    this.loader=1;
    
    this.serve.fetchData({},"category_master/banner_list").subscribe((result=>{
      console.log(result);
      this.banner_list = result;
      console.log(this.banner_list);
      setTimeout (() => {
        this.loader='';
        
      }, 700);
    }))
  }  
  delete_banner(id,index){
    this.dialog.deletebanners('Banner !').then((result) => {
      console.log(result);
      if(result==true)
      {
        console.log(id);
        this.serve.fetchData({id:id},"category_master/delete_banner").subscribe((result=>{
          // console.log(result);
          this.banner_list.splice(index,1);
        }))
      }
      
    });
    
  }
  active:any={};
  
  edit_discount(i)
  {
    console.log(i);
    this.active[i] = Object.assign({'discount':'1'});
    console.log(this.active[i]);
    
  }
  
  edit_banner(id){
    this.rout.navigate(['/banner-banner-detail/'+id])
  }
  
  
}
