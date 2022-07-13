import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import {  sessionStorage} from 'src/app/localstorage.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as moment from 'moment';

@Component({
  selector: 'app-user-email-modal',
  templateUrl: './user-email-modal.component.html'
})
export class UserEmailModalComponent implements OnInit {



  constructor(@Inject(MAT_DIALOG_DATA)public data,public serve:DatabaseService,public session: sessionStorage,public dialog:MatDialog,public rout:Router,public alert:DialogComponent,public toast:ToastrManager)  {
    console.log(data);
    if(data.type =="date_joining"){
      this.data.doj=this.data.value
    }
    if(data.type =="date_leaving"){
      this.data.date_leaving=this.data.value
    }
    this.userData = JSON.parse(localStorage.getItem('st_user'));
    // this.userId=this.userData['data']['id'];
    // this.userName=this.userData['data']['name'];
    this.data_category=data['data'];
    // this.data_category.uid=this.userId;
    // this.data_category.uname=this.userName;
console.log(this.data.value)
if(this.data.type=='working_state'){
this.a=this.data.value.split(",")
console.log(this.a)
  }
    this.data.type = data.type;
    console.log(this.data_category);
    this.getBrandList();
    this.getCategoryList();
    this.rsmassign();
    this.role_list()
    this.getStateList();
  }

  ngOnInit() {

  }
  a:any=[]
  rsm_list:any;
  productdetail:any=[];
  brand_list:any=[];
  index:any="";
  type1="category";
  type2="sub_category";
  user:any={};
  data_category:any=[];
  categoryData;
  subcategorydata;
  category_list:any=[];
  subCategory_list:any=[];
  state_list:any=[];
  productDetail:any=[];
  exist:boolean=false;
  userData: any;
  userId: any;
  userName: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  update()
  {

    let data={"type":this.data.type,"value":this.data.value}
    let value={data,"product_id":this.data.product_id}
    console.log(value);

    this.serve.fetchData(value,"product/productupdate").subscribe((result)=>{
      console.log(result);
      if(result){
        this.toast.successToastr("sucess");
        this.dialog.closeAll();

      }
else{
  this.productDetail=result['product_detail'];
      console.log(this.productDetail);
}


    })
  }

  update_manager()
  {
    this.index = this.data.type;
    this.user[this.index]=this.data.value;
    let value={data:this.user,"user_id":this.data.user_id,"uid":this.userId,"uname":this.userName}
    console.log(value);

    this.serve.fetchData(value,"user/update_user").subscribe((result)=>{
      if(result){
        // this.alert.success("Detail","Updated");
        this.toast.successToastr("sucess");
        this.dialog.closeAll();

      }

    })

  }

  getBrandList()
  {
    this.serve.fetchData(0,"/Product/product_brand_list/").subscribe((result)=>{
      console.log(result['brand']);
      this.brand_list=result['brand'];
    });
  }
  MobileNumber(event: any)
  {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar))
    {event.preventDefault(); }
  }

  value:any=[];

  update_user()
  {
    if(this.data.doj){
      this.data.doj = moment(this.data.doj).format('YYYY-MM-DD');
      
  this.data.value=this.data.doj;
  
      }
      if(this.data.date_leaving){
        this.data.date_leaving = moment(this.data.date_leaving).format('YYYY-MM-DD');
        
    this.data.value=this.data.date_leaving;
    
        } 
    if(this.data.type=='working_state'){
      this.data.value=this.a
    }
    console.log(this.data.value)
    this.index=this.data.type;
    this.user[this.index]=this.data.value;

    this.value={data:this.user,"user_id":this.data.user_id,"uid":this.userId,"uname":this.userName}

    this.serve.fetchData(this.value,"user/update_user").subscribe((result)=>{
      console.log(result);
      if(result){
        // this.alert.success("Detail","Updated");
        this.toast.successToastr("sucess");
        this.dialog.closeAll();

      }

    })
  }
  rsmassign(){
    this.serve.fetchData('',"User/rsm_list").subscribe(response=>{
      console.log(response);
      this.rsm_list=response['rsm_list'];

    });

  }
  rsm_update(rsm_id){
    console.log(rsm_id);

    this.serve.fetchData({'rsm_id':rsm_id,'asm_id':this.data.user_id,'uid':this.userId,'uname':this.userName},"User/updatemanager").subscribe(response=>{
      console.log(response);
      // this.rsm_list=response['rsm_list'];
      if(response){
        // this.alert.success("Detail","Updated");
        this.toast.successToastr("sucess");
        this.dialog.closeAll();

      }
    });

  }

  getStateList()
  {
    this.serve.fetchData(0,"User/state_user_list").subscribe((response=>{
      console.log(response);
      this.state_list=response['query']['state_name'];
    }));
  }

  updateCategory()
  {
    // let data={"category":this.data_category.category}
    // let value={"data":this.data_category}
    this.serve.fetchData(this.data_category,"Product/update_category").subscribe((res)=>{

      if(res){
        // this.alert.success("Detail","Updated");
        this.toast.successToastr("success");
        this.dialog.closeAll();

      }

    });
  }

  getCategoryList()
  {

    this.serve.fetchData(0,"Product/categoryList").subscribe((result)=>{
      console.log(result);
      this.category_list=result;
      console.log( this.category_list);

    });
  }

  getSubCategoryList()
  {
    this.data_category.sub_category ='';
    console.log(this.data_category.category);
    // console.log(this.data.category);
    let value={"category":this.data_category.category,'uid':this.userId,'uname':this.userName};
    console.log(value);
    this.serve.fetchData(value,"Product/product_sub_category_list").subscribe((result)=>{
      console.log(result);
      this.subCategory_list=result['sub_category'];
    });
  }

  update_discount(){
    console.log(this.data);
    let data={'dr_id':this.data.id,'category':this.data.value1,'discount':this.data.value2,'uid':this.userId,'uname':this.userName};
    console.log(data);

    this.serve.fetchData(data,"Discount/discount_dr_assign").subscribe((result=>{
      console.log(result);
      if(result){
        // this.alert.success("Detail","Updated");
        this.toast.successToastr("sucess");
        this.dialog.closeAll();
      }
    }))
  }
  role_data:any=[];
  role_list(){
    this.serve.fetchData('',"User/role_list").subscribe((result=>{
      this.role_data=result;
      console.log(this.role_data);
    }))
  }

  check_number() {
    if (this.data.value.length == 10) {
        this.serve.fetchData({ "mobile": this.data.value }, "User/check_user").subscribe((result => {
            if (result['exists']) {
                this.exist = true;
            }
            else {
                this.exist = false;
            }
        }))
    }
}


  coupon_value_update(value){
    console.log(value);
    console.log(this.data.product_id);

    this.serve.fetchData(value,"category_master/update_coupon_value/"+this.data.product_id).subscribe((res)=>{

      if(res){
        // this.alert.success("Detail","Updated");
        // this.toast.successToastr("sucess");
        this.dialog.closeAll();

      }

    });
  }
  updateDiscount(discount)
  {
    console.log(this.data )
    this.serve.fetchData(this.data,'distributors/updateDiscount').subscribe((res)=>
    {
      console.log(res)
      this.dialog.closeAll();
      this.toast.successToastr("sucess");
    },err=>
    {
      this.toast.errorToastr("Failed");
    })
  }
}
