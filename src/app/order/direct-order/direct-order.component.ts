import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { sessionStorage } from 'src/app/localstorage.service';

@Component({
  selector: 'app-direct-order',
  templateUrl: './direct-order.component.html',
  styleUrls: ['./direct-order.component.scss']
})
export class DirectOrderComponent implements OnInit {
  
  loader:any;
  data:any=[];
  search_val:any={};
  page_limit:any=50;
  orderlist:any=[];
  login_data:any=[];
  login_dr_id:any;
  skelton:any={};
  count:any;
  tmp_orderlist:any=[];
  data_not_found:any=false;
  view_tab:any='all';
  tmpsearch:any={};
  tmpsearch1:any={};
  excel_data:any=[];
  exp_loader:any=false;
  
  constructor(public serve:DatabaseService, public route:Router, public dialog:DialogComponent, public session:sessionStorage) 
  { 
    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value.data;
    this.skelton = new Array(10);
    
    if(this.login_data.access_level !='1')
    {
      this.login_dr_id = this.login_data.id;
    }
  }
  
  ngOnInit() 
  {
    this.orderList();
  }
  
  orderList()
  {
    this.loader=1;
    console.log(this.data.search);
    if( Object.getOwnPropertyNames(this.search_val).length != 0)
    {
      this.page_limit = 0;
      this.orderlist = [];
    }
    this.serve.fetchData({'start':this.orderlist.length,'pagelimit':this.page_limit,'search':this.search_val,'login_user':this.login_dr_id},"Order/direct_order_list")
    .subscribe(result=>{
      
      console.log(result);
      this.count=result['result']['data'];
      this.tmp_orderlist=result['result']['result'];
      this.orderlist = this.orderlist.concat(result['result']['result']);
      console.log(this.tmp_orderlist);
      
      setTimeout (() => {
        this.loader='';
        
      }, 700);
      if(this.orderlist.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
        
      }
    });
  }
  
  filter_order_data(status){
    console.log(status);
    this.view_tab=status;
    if(status!='all'){
      this.orderlist=[];
      for(var i=0;i<this.tmp_orderlist.length; i++)
      {
        // status=status.toLowerCase();
        this.tmpsearch=this.tmp_orderlist[i]['order_status'];
        if(this.tmpsearch.includes(status))
        {
          // console.log(this.orderlist);
          
          this.orderlist.push(this.tmp_orderlist[i]);
        }     
      }    
      console.log(this.orderlist);
    }else if(status=='all'){
      this.orderlist=this.tmp_orderlist;
    }
  }
  
  exportAsXLSX()
  {
    this.exp_loader = true;
    for(let i=0;i<this.orderlist.length;i++)
    {
      this.excel_data.push({'Date':this.orderlist[i].date_created,'Created By':this.orderlist[i].ord_created_by,'Order Id':this.orderlist[i].id,'Company Name':this.orderlist[i].company_name,'Total Item':this.orderlist[i].order_item,'Order Value':this.orderlist[i].order_total,'Status':this.orderlist[i].order_status});
    }
    this.exp_loader = false;
    
    this.serve.exportAsExcelFile(this.excel_data, 'Direct-Order');
  }
  
}
