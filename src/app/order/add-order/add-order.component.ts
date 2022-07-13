import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../../dialog.component';
import { Router } from '@angular/router';
// import { $ } from 'protractor';
import * as $ from 'jquery';
import { sessionStorage } from 'src/app/localstorage.service';



@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  animations: [slideToTop()]
  
})
export class AddOrderComponent implements OnInit {
  product_code:any=[];
  data:any={};
  brands:any=[];
  colors:any=[];
  dr_id:any='';
  login_data:any = {};
  loader:any;
  
  constructor(public serve:DatabaseService,public route:ActivatedRoute , public rout:Router,public dialog:DialogComponent, public session : sessionStorage) 
  { 
    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value;
    this.login_data = this.login_data.data;
    console.log(this.login_data);
    
    this.route.params.subscribe( params => {
      console.log(params);
      this.dr_id = params.dr_id;
      console.log(this.dr_id);
     
      
    });
  }
  
  ngOnInit()
  {
    this.getCode();
  }
  
  numeric_Number(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(event.keyCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  active:any = {};
  toggleterritory(key,action)
  {
    console.log(action);
    console.log(key);
    
    if(action == 'open')
    { this.active[key] = true; }
    if(action == 'close')
    { this.active[key] = false;}
    
    console.log(this.active);
  }
  
  getCode()
  {
    this.serve.fetchData({},"Order/productCode").subscribe((result=>
      {
        console.log(result);
        
        if(result)
        {
          this.product_code=result['productCode'];
        }
        
      }))
    }
    
    item:any = {};
    temp_item:any = {};
    
    
    keyword = 'cat_no';
    
    selectEvent(item) {
      
      console.log(item);
      
      this.data.product_id = Object.assign(this.product_code.filter(x=>x.id === item.id)[0].id );
      
      
      
      this.getBrandColor(this.data.product_id);
      this.ProductDetail(this.data.product_id);
      
    }
    onChangeSearch(search: string) {
    }
    
    onFocused(e) {
    }
    
    getBrandColor(id)
    {
      this.serve.fetchData({id},"Order/brandName").subscribe((result=>
        {
          console.log(result);
          this.brands=result['brands'];
          this.colors=result['colors'];
          
          console.log(this.brands);
          if(this.brands.length == 1) {
            this.data.brand = this.brands[0].brand_name;
          } else {
            this.data.brand = '';
          }
          
        }))
        
        this.ProductDetail(id);
        
      }
      
      ProductDetail(id)
      {
        this.serve.fetchData({'dr_id':this.dr_id , id},"Order/productDetail").subscribe((result=>
          {
            console.log(result);
            
            if(result)
            {
              this.data.productDetail=result['productDetail'][0];
              this.temp_item =  this.data.productDetail;
              this.item =  this.temp_item;
              
              this.item.brand = this.data.brand;
              this.item.color = this.data.color;
              
              this.item.qty = 1;
              this.item.sub_total = this.item.qty * this.item.price;
              this.item.temp_discount_amount =  ( ( parseInt(this.item.discount) / 100 ) * parseInt(this.item.sub_total) ) ;
              this.item.discount_amount = parseFloat(this.item.temp_discount_amount).toFixed(2);
              
              this.temp_gst =  parseFloat(this.item.sub_total) - parseFloat(this.item.discount_amount) ;
              
              this.item.temp_gst_amount = ( parseFloat(this.item.gst) / 100 ) * parseFloat(this.temp_gst)  ;
              this.item.gst_amount =  parseFloat(this.item.temp_gst_amount).toFixed(2) ;
              
              this.item.temp_total_amount = parseFloat(this.item.gst_amount ) + parseFloat( this.temp_gst);
              this.item.total_amount = parseFloat(this.item.temp_total_amount ).toFixed(2);
              
            }
            
          }))
          
        }
        
        cal_item()
        {
          this.item.sub_total = this.item.qty * this.item.price;
          this.item.temp_discount_amount =  ( ( parseInt(this.item.discount) / 100 ) * parseInt(this.item.sub_total) ) ;
          this.item.discount_amount = parseFloat(this.item.temp_discount_amount).toFixed(2);
          
          this.temp_gst =  parseFloat(this.item.sub_total) - parseFloat(this.item.discount_amount) ;
          
          this.item.temp_gst_amount = ( parseFloat(this.item.gst) / 100 ) * parseFloat(this.temp_gst)  ;
          this.item.gst_amount =  parseFloat(this.item.temp_gst_amount).toFixed(2) ;
          
          this.item.temp_total_amount = parseFloat(this.item.gst_amount ) + parseFloat( this.temp_gst);
          this.item.total_amount = parseFloat(this.item.temp_total_amount ).toFixed(2);
        }
        
        orderItemList:any = [];
        AddItem(f:any = '')
        {
          this.item.brand = this.data.brand;
          this.item.color = this.data.color;
          
          console.log(this.item);
          
          
          if(this.orderItemList.length != 0)
          {
            for(var i=0; i<this.orderItemList.length; i++)
            { 
              if((this.orderItemList[i].cat_no == this.item.cat_no) && (this.orderItemList[i].brand == this.item.brand) && (this.orderItemList[i].color == this.item.color))
              {
                this.orderItemList[i].qty =  parseInt(this.orderItemList[i].qty) + parseInt(this.item.qty);
                this.update_qty(i);
                break;
              }
              else
              {
                this.orderItemList.push(this.item);
                this.cal();
                break;
              }
            }
          }
          else
          {
            this.orderItemList.push(this.item);
            this.cal();
          }
          
          console.log(this.orderItemList);
          
          $('.ng-autocomplete .ng-star-inserted').trigger('click');
          $('#productInform').trigger('click');
          
          this.item = {};
          this.item.cat_no = '';
          this.data.brand = '';
          this.data.color = '';
          if(f)
          f.resetForm();
          this.cal();
        }
        
        update_qty(i)
        {
          
          this.orderItemList[i].gst_amount  = 0;
          
          this.orderItemList[i].qty = this.orderItemList[i].qty ? this.orderItemList[i].qty : 0;
          
          this.orderItemList[i].sub_total = this.orderItemList[i].qty * this.orderItemList[i].price;
          
          this.orderItemList[i].temp_discount_amount =  ( ( parseInt(this.orderItemList[i].discount) / 100 ) * parseInt(this.orderItemList[i].sub_total) ) ;
          this.orderItemList[i].discount_amount = parseFloat(this.orderItemList[i].temp_discount_amount).toFixed(2);
          
          
          this.temp_gst =  parseFloat(this.orderItemList[i].sub_total) - parseFloat(this.orderItemList[i].discount_amount) ;
          
          this.orderItemList[i].temp_gst_amount = ( parseFloat(this.orderItemList[i].gst) / 100 ) * parseFloat(this.temp_gst)  ;
          this.orderItemList[i].gst_amount =  parseFloat(this.orderItemList[i].temp_gst_amount).toFixed(2) ;
          
          this.orderItemList[i].temp_total_amount = parseFloat(this.orderItemList[i].gst_amount) + parseFloat( this.temp_gst);
          this.orderItemList[i].total_amount = parseFloat(this.orderItemList[i].temp_total_amount).toFixed(2);
          
          this.cal();
        }
        
        
        temp_gst:any = '';
        Order_form:any= {};
        
        cal(){
          
          this.Order_form.total_qty  = 0;
          this.Order_form.sub_total  = 0;
          this.Order_form.discount_amount  = 0;
          this.Order_form.gst_amount  = 0;
          this.Order_form.total_amount  = 0;
          
          
          for (let i = 0; i < this.orderItemList.length; i++) {
            
            this.orderItemList[i].gst_amount  = 0;
            
            this.orderItemList[i].qty = this.orderItemList[i].qty ? this.orderItemList[i].qty : 0;
            this.Order_form.total_qty += parseInt( this.orderItemList[i].qty );
            
            this.orderItemList[i].temp_amount = this.orderItemList[i].qty * this.orderItemList[i].price;
            this.Order_form.sub_total += parseInt(  this.orderItemList[i].temp_amount );
            
            this.orderItemList[i].temp_discount_amount_temp =  ( ( parseInt(this.orderItemList[i].discount) / 100 ) * parseInt(this.orderItemList[i].sub_total) ) ;
            this.orderItemList[i].temp_discount_amount = parseFloat(this.orderItemList[i].temp_discount_amount_temp).toFixed(2);
            this.Order_form.discount_amount += parseFloat(  this.orderItemList[i].temp_discount_amount );
            
            
            this.temp_gst =  parseFloat(this.orderItemList[i].sub_total) - parseFloat(this.orderItemList[i].discount_amount) ;
            
            this.orderItemList[i].gst_amount = ( parseFloat(this.orderItemList[i].gst) / 100 ) * parseFloat(this.temp_gst)  ;
            this.orderItemList[i].temp_gst_amount =  parseFloat(this.orderItemList[i].gst_amount).toFixed(2) ;
            this.Order_form.gst_amount += parseFloat(  this.orderItemList[i].temp_gst_amount );

            this.Order_form.gst_amount = parseFloat(this.Order_form.gst_amount);
            
            this.orderItemList[i].total_amount = parseFloat(this.orderItemList[i].temp_gst_amount ) + parseFloat( this.temp_gst);
            this.orderItemList[i].temp_total_amount = parseFloat(this.orderItemList[i].total_amount ).toFixed(2);
            this.Order_form.total_amount = parseFloat(this.Order_form.total_amount) + parseFloat(  this.orderItemList[i].temp_total_amount );
            this.Order_form.total_amount = parseInt(this.Order_form.total_amount);
          }
        }
        
        RemoveItem(index,amount)
        {
          console.log(index);
          this.dialog.delete('Item Data !').then((result) => {
            console.log(result);
            if(result){
              this.orderItemList.splice(index,1);
              this.dialog.error('Item has been deleted.');
              this.cal();
            }
          });   
        }
        
        savingData = false;
        submitOrder()
        {
          if(this.savingData == false)
          {
            this.savingData = true;
            this.loader = '1';
            
            this.Order_form.dr_id = this.dr_id;
            this.serve.fetchData({'item':this.orderItemList , 'data':this.Order_form },"Order/addChenalOrder")
            .subscribe(result=>
              {
                if(result['status'] == 'SUCCESS' )
                {
                  this.rout.navigate(['distribution-detail/'+this.dr_id]);
                  this.dialog.success( "Success","Order has been successfully added");
                }
                this.loader = '';
              });
            }
          }
          
         


        }
        