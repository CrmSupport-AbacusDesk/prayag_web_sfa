import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../router-animation/router-animation.component';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService'
import { DialogComponent } from 'src/app/dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.scss'],
  animations: [slideToTop()]

})
export class CategoryMasterComponent implements OnInit {
  loader:any='';
  skelton:any={}


  constructor(public rout:Router,public serve:DatabaseService,public dialog:DialogComponent,public dialog2:MatDialog) {
    this.category_list();
    this.skelton = new Array(10);

  }

  ngOnInit() {
    console.log('hello');
  }
  categorylist:any=[];
  temp_cat:any=[];
  value:any={};
  category_list()
  {
    this.serve.fetchData({},"Category_master/category_list").subscribe((result=>{
      console.log(result);
      this.categorylist = result;
      console.log(this.categorylist);
      this.temp_cat = result;

    }))

  }

  delete_sub_category(sub_cat_name:any,cat_name:any)
  {
    console.log(sub_cat_name);
    console.log(cat_name);
    this.dialog.delete('Sub Category Data !').then((result) => {
      console.log(result);
      if(result==true)
      {
        console.log('true');
        this.serve.fetchData({'sub_category':sub_cat_name,'category':cat_name},'Category_master/delete_subcategory')
        .subscribe((result:any)=>{
          console.log(result);
          this.dialog.success('Deleted','Record has been deleted.');
          this.category_list();
        },error=>{
          console.log(error);
          this.dialog.error('Something went wrong !!! Try again... ');
        });
      }

    });
  }

  openDialog(role){
    console.log(role);
    const dialogRef = this.dialog2.open(AddCategoryComponent,{width : '500px' ,data:role});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // this.dialog.closeAll();
      this.category_list();
      //
    });
  }
  edit_diolog(role,cat){
    console.log(role,cat);
    const dialogRef = this.dialog2.open(AddCategoryComponent,{width : '500px' ,data:{role,cat}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // this.dialog.closeAll();
      this.category_list();
      //
    });
  }
  tmp:any=[];
  getItemsList()
  {
    console.log(this.value.search);
    console.log(this.temp_cat);

    this.categorylist=[];
    for(var i=0;i<this.temp_cat.length; i++)
    {
      this.value.search=this.value.search.toLowerCase();

      this.tmp=this.temp_cat[i]['category'].toLowerCase();
      if(this.tmp.includes(this.value.search))
      {
        this.categorylist.push(this.temp_cat[i]);
      }
    }
  }
  delete_cat(cat){
    console.log(cat);
    this.dialog.delete('Category Data !').then((result) => {
      console.log(result);
      if(result==true)
      {
        console.log('true');
        this.serve.fetchData({'category':cat},'Category_master/delete_category')
        .subscribe((result:any)=>{
          console.log(result);
          this.dialog.success('Deleted','Record has been deleted.');
          this.category_list();
        },error=>{
          console.log(error);
          this.dialog.error('Something went wrong !!! Try again... ');
        });
      }

    });

  }
}
