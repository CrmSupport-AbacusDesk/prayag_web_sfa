import { Component, OnInit , Inject } from '@angular/core';
// import { slideToTop } from '../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService'
import { DialogComponent } from 'src/app/dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  role: any;
  temp_cat:any;
  temp_subcat:any;
  data1:any;
  data2:any ={};
  constructor(public rout:Router,public serve:DatabaseService,public dialog:DialogComponent,public dialog2:MatDialog, public navparams : ActivatedRoute ,@Inject(MAT_DIALOG_DATA) public data)  {
    this.role = this.navparams.data;
    console.log(this.navparams.data);
    // console.log(this.role.cat);
    // console.log(this.role.role);

   console.log(data);
    this.temp_cat=data.cat;
    this.temp_subcat=data.subcat;
    console.log(this.temp_cat);
    console.log(this.temp_subcat);
    this.data1=data;
    
   } 
  ngOnInit() {
    console.log('add_category');
  }
  edit_category(cat){
    console.log(cat);
    console.log(this.temp_cat);
    this.serve.fetchData({'cat':cat,'temp_cat':this.temp_cat},"Category_master/edit_category").subscribe((result=>{
      // this.dialog.closeAll();
      if(result=='success'){
        this.dialog2.closeAll();

      }
    }))
  }
    edit_subcategory(cat){
    console.log(cat);
    console.log(this.temp_cat);
    this.serve.fetchData({'cat':cat,'temp_cat':this.temp_cat},"Category_master/edit_subcategory").subscribe((result=>{
      // this.dialog.closeAll();
      if(result=='success'){
        this.dialog2.closeAll();

      }
    }))
  }
  addcategory(category){
    console.log(category);
    this.serve.fetchData({category},"Category_master/add_category").subscribe((result=>{
      // this.dialog.closeAll();
      this.dialog2.closeAll();
    }))
  }
  subcategory(category,subcategory){
    console.log(category);
    console.log(subcategory);
    this.serve.fetchData({subcategory,category},"Category_master/add_subcategory").subscribe((result=>{
      this.dialog2.closeAll();
    }))

  }
  
}
