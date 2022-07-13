import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';

@Component({
  selector: 'app-user-target-modal',
  templateUrl: './user-target-modal.component.html',
  styleUrls: ['./user-target-modal.component.scss']
})
export class UserTargetModalComponent implements OnInit {
  
  
  subCategory_list:any=[];
  target_list:any=[];
  achievment:any=[];
  achievment1:any=[];
  reset:any=[];
  productlist: any = [];
  sizeList:any;
  category_list:any=[];
  product_code={};
 
  
  
  constructor(public serve:DatabaseService,@Inject(MAT_DIALOG_DATA)public data) {}
  
  ngOnInit() 
  {
    this.getSubCategoryList();
    this.getTargetList();
    this.get_category_list()
    // this.getProductList();
    
  }

  get_category_list()
  {
    this.serve.fetchData({ }, "Product/categoryList").subscribe((result) => {
      console.log(result);
     
      this.category_list=result;
      console.log( this.category_list);
      
    })
  }

  getProductList() 
  {
    this.serve.fetchData({ filter: 'sendData','category':this.data.category }, "Product/product_list").subscribe((result) => 
    {
      
      console.log(result);
      
      this.productlist = result['product_list'];
      this.product_code=result['product_list']['product_code'];
      if (this.productlist.length == 0) {
        console.log("yes");
      }
      setTimeout(() => {
        
      }, 700);
      // if (this.productlist.length == 0) {
      //   this.data_not_found = true;
      // } else {
      //   this.data_not_found = false;
      
      // }
    })
    
  }

  
  getSubCategoryList()
  {
    this.serve.fetchData('',"Product/product_sub_category_list").subscribe((result)=>{
      console.log(result);
      this.subCategory_list=result['sub_category'];
    });
  }
  
  getTargetList()
  {
    this.serve.fetchData({'id':this.data.user_id},"User/target_list").subscribe((result)=>{
      console.log(result);
      this.target_list=result['target_list'];
      console.log(this.target_list);
      for( let i =0; i<this.target_list.length;i++)
      {
        
        this.target_list[i].achieve=parseFloat(this.target_list[i].achieve).toFixed(2);
        this.target_list[i].achvmt_perc= (this.target_list[i].achieve/this.target_list[i].value)*100
        this.target_list[i].achvmt_perc= parseFloat(this.target_list[i].achvmt_perc).toFixed(2);
          
      }

      console.log(this.target_list);  
    });
  }
  
  add_data()
  {
    // this.all_data= this.data;
    console.log(this.data);
    this.serve.fetchData(this.data,"User/submit_target").subscribe((result)=>{
      console.log(result);
      this.getTargetList()
      var user_id = this.data.user_id;
      this.data = {};
      this.data.user_id = user_id;
      
    });
    
  }
  
  deleteTarget(id)
  {
    this.serve.fetchData({'id':id},"User/delete_target").subscribe((result)=>{
      console.log(result);
      this.getTargetList();
    });
  }
  
  sizeFunction()
  {
    // this.data.productSize = null
    console.log(this.data.product_name);
    
    if(this.data.product_name){
      
      let filterData= this.productlist.filter(row=>row.product_name == this.data.product_name);
      console.log(filterData);
      
      
      for(let i = 0;i< filterData[0].multi_products.length ; i++){
        this.sizeList=filterData[0].multi_products;
      }
      console.log(this.sizeList);
    }
    
    
  }
  
}
