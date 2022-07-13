import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService'
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import * as moment from 'moment';
import { sessionStorage } from 'src/app/localstorage.service';

@Component({
  selector: 'app-direct-dealer',
  templateUrl: './direct-dealer.component.html',
  styleUrls: ['./direct-dealer.component.scss']
})
export class DirectDealerComponent implements OnInit {
  data_not_found=false;
  skelton:any={};
  add: any = {};
  sort: any = {};

  assign_login_data2: any = [];

  delete: any = {};

  edit: any = {};
  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  constructor(public serve:DatabaseService,public route:Router,public dialog:DialogComponent,public session:sessionStorage) { 
    this.today_date = new Date();
    this.search_val.contact_person='';
    this.search_val.company_name='';
    this.search_val.customer_code='';
    this.search_val.created_by='';
    this.search_val.date_created='';
    this.search_val.contact_number='';
    this.search_val.state='';
    this.search_val.assign_user='';
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;

    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    
    let flag = 0;
    const index = this.assign_login_data.findIndex(row => row.module_name == 'Distribution Distributors');

    if( index == -1){
      flag++;
      const index = this.assign_login_data.findIndex(row => row.module_name == 'Distribution Direct Dealers');
    }

    if(index == -1 && flag == 1){
      flag++;
      const index = this.assign_login_data.findIndex(row => row.module_name == 'Distribution Retailers');
    }

    if(flag == 2 || index != -1){
      console.log(index);
      
      if(this.assign_login_data[index].add == 'true')  {
        this.add=this.assign_login_data[index].add
      };
        
      if(this.assign_login_data[index].edit == 'true')  {
       this.edit=this.assign_login_data[index].edit
     };  
     if(this.assign_login_data[index].delete == 'true')  {
       this.delete=this.assign_login_data[index].delete
     };
      
      console.log(this.add);
      console.log(this.edit);
      console.log(this.delete);
    }
  }
  
  ngOnInit() {
    this.search_val = this.serve.directDealerListSearch
    this. distributorList();
    this.skelton = new Array(10);
  }
  value:any={};
  dr_list_temp:any=[];
  
  distributor_list:any=[];
  start:any=0;
  count:any;
  total_page:any; 
  pagenumber:any;
  page_limit:any=50
  state_values:any=[];
  exp_loader:any;
  loader:any;
  data:any=[];
  type:any=7
  search_val:any={}
  dr_count:any;
  today_date:Date;
  public onDate(event): void 
  {
    this.search_val.date_created=moment(event.value).format('YYYY-MM-DD');    
    this.distributorList();
  }
  
  distributorList(action:any='')
  {
    this.distributor_list = [];

  

    console.log(this.data.search);
    
  

   
    if(this.sort.type1=='DESC'){
      this.sort.value="company_name"
  this.sort.type="DESC"
  
      }
      else if(this.sort.type1=='ASC'){
        this.sort.value="company_name"
        this.sort.type="ASC"
  
      }
      else{
        this.sort.value="date_created"
  this.sort.type="DESC"
      }
    this.loader=true;
    this.serve.fetchData({'sort':this.sort,'user_id':this.assign_login_data2.id,'start':this.distributor_list.length,'pagelimit':this.page_limit,'search':this.search_val,'type':this.type},"Distributors/distributor")
    .subscribe((result=>{
      console.log(result);
      this.dr_list_temp=result['distributor']['distributor'];
      this.state_values = result['distributor']['states'];
      this.dr_count = result['distributor']['count'];
      
      this.distributor_list = this.distributor_list.concat(result['distributor']['distributor']);
      
      this.count=result['distributor']['count'];
      this.total_page = Math.ceil(this.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
      
      setTimeout (() => {
        this.loader=false;
        
      }, 500);
      if(this.distributor_list.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
        
      }
      this.serve.count_list();
    }))
  }
  
  deleteUser(id)
  {
    this.dialog.delete('Distributor Data !').then((result) => {
      if(result){
        this.serve.fetchData({"id":id},"Distributors/distributors_delete").subscribe((result=>{
          console.log(result);
          this.distributorList('refresh');
          
        }))
      }})
      
    }
    refresh()
    {
      this.distributorList();
    }
    userDetail(id)
    {
    this.serve.directDealerListSearch = this.search_val

      console.log(id);
      this.route.navigate(['/distribution-detail/'+id]);
      
    }
    getItemsList(index,search)
    {
      console.log(search);
      this.distributor_list=[];
      
      if(index=='created_by'){
        for(var i=0;i<this.dr_list_temp.length; i++)
        {
          search=search.toLowerCase();
          this.tmpsearch1=this.dr_list_temp[i]['created_name']['name'].toLowerCase();
          if(this.tmpsearch1.includes(search))
          {
            console.log(search);
            this.distributor_list.push(this.dr_list_temp[i]);
          }     
        }
      }
      if(index!='created_by'){
        for(var i=0;i<this.dr_list_temp.length; i++)
        {
          search=search.toLowerCase();
          this.tmpsearch1=this.dr_list_temp[i][index].toLowerCase();
          if(this.tmpsearch1.includes(search))
          {
            console.log(search);
            this.distributor_list.push(this.dr_list_temp[i]);
          }     
        }
      }
      console.log(this.distributor_list);
    }
    
    
    tmpsearch1:any={};
    excel_data:any=[];
    exp_data:any=[];
    exportAsXLSX():void 
    {
      this.exp_loader = true;
      this.serve.FileData({'user_id':this.assign_login_data2.id,'search':this.search_val,'type':this.type},"Distributors/distributor")
      .subscribe(resp=>{
        console.log(resp);
        this.exp_data = resp['distributor']['distributor'];
        console.log(this.exp_data);
        
        
        for(let i=0;i<this.exp_data.length;i++){
          this.excel_data.push({'Direct Dealer Id':this.exp_data[i].id,'Company Name':this.exp_data[i].company_name,'Customer Code':this.exp_data[i].dr_code,'GST':this.exp_data[i].gst,'Contact Person':this.exp_data[i].name,Mobile:this.exp_data[i].mobile,'WhatsApp No.':this.exp_data[i].whatsapp_no,Email:this.exp_data[i].email,'Address ':this.exp_data[i].address,'State ':this.exp_data[i].state,'District ':this.exp_data[i].district,'City ':this.exp_data[i].city,'Pincode ':this.exp_data[i].pincode,'Assigned Sales User':this.exp_data[i].assign_user,' Total Primary Sale':this.exp_data[i].primary_sale.count,'Primary sale amount':this.exp_data[i].primary_sale.sum});
        }
        this.exp_loader = false;
        
        this.serve.exportAsExcelFile(this.excel_data, 'DIRECT DEALER SHEET');
        this.excel_data = [];
        this.exp_data = [];
      })
    }

    id:any;
    state:any;
    tothepage(id,state,type){
    this.route.navigate(['/distribution-detail/'+id],{ queryParams: { state,id,type} });
  
    }
  }
  