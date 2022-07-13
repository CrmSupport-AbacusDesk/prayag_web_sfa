import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import * as moment from 'moment';

@Component({
  selector: 'app-product-wise-report',
  templateUrl: './product-wise-report.component.html',
  styleUrls: ['./product-wise-report.component.scss']
})
export class ProductWiseReportComponent implements OnInit {
  
  data:any={};
  channel_partner_list:any=[];
  product_data:any=[];
  loader:any;
  category_list:any=[];
  data_not_found:any = false;

  constructor(public service:DatabaseService) 
  { 
    this.get_sales_user_list();
    this.get_product_category_list();
  }
  
  ngOnInit() 
  {
    
  }
  
  get_sales_user_list()
  {
    this.service.fetchData('',"Attendance/sales_user_data").subscribe(resp=>
      {
        console.log(resp);
        this.channel_partner_list = resp;
      });
    }
    
    get_product_category_list()
    {
      this.service.fetchData('',"product/get_product_category_list").subscribe(resp=>
        {
          console.log(resp);
          this.category_list = resp;
          console.log(this.category_list);
          
        });
      }
      
      submit()
      {
        this.loader = '1';
        if(this.data.start_date && this.data.end_date)
        {
          this.data.start_date = moment(this.data.start_date).format('YYYY-MM-DD');
          this.data.end_date = moment(this.data.end_date).format('YYYY-MM-DD');
        }
        console.log(this.data);
        
        this.service.fetchData(this.data,"product/get_product_report").subscribe(resp=>
          {
            console.log(resp);
            this.product_data = resp['order_item'];
            
            if(this.product_data.length == 0)
            {
              this.data_not_found = true;
            }else
            {
              this.data_not_found = false;
            }
            
            for(var i=0; i<this.product_data.length; i++)
            {
              this.product_data[i]['total_amount'] = parseInt(this.product_data[i]['total_amount']); 
            }
            this.loader = '';
            
          });
        }
        
        excel_data:any=[];
        exportAsXLSX():void 
        {
          this.loader = '1';
          this.excel_data = [];
          for(let i=0;i<this.product_data.length;i++)
          {
            this.excel_data.push({'Product Code':this.product_data[i].cat_no, 'Category':this.product_data[i].category,'Total Qty':this.product_data[i].total_qty,'Amount':this.product_data[i].total_amount});
          }
          console.log(this.excel_data);
          this.service.exportAsExcelFile(this.excel_data,'Product-Category-report');
          this.loader = '';
        }
        
      }
      