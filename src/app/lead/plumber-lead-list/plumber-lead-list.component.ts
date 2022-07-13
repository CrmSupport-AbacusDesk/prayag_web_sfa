
import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';


@Component({
  selector: 'app-plumber-lead-list',
  templateUrl: './plumber-lead-list.component.html',
  styleUrls: ['./plumber-lead-list.component.scss']
})
export class PlumberLeadListComponent implements OnInit {
  
  lead_List:any=[];
  tenp_lead:any=[];
  start:any=0;
  count:any;
  total_page:any; 
  pagenumber:any;
  page_limit:any=50;
  loader:any;
  data:any=[];
  data_not_found=false;
  value:any={};
  search_val:any={};
  skelton:any={}
  
  constructor(public serve:DatabaseService,public dialog:DialogComponent) { 
    this.leadList();
    this.skelton = new Array(10);
  }
  
  ngOnInit() {
  }
  
  leadList()
  {
    this.loader=1;
    if( Object.getOwnPropertyNames(this.search_val).length != 0)
    {
      this.page_limit = 0;
      this.lead_List = [];
    }
    this.serve.fetchData({'start':this.lead_List.length,'pagelimit':this.page_limit,'search':this.search_val},"Distributors/plumber_lead_list").subscribe((result=>{
      console.log(result);
      this.lead_List = this.lead_List.concat(result['lead_list']['data']);
      this.tenp_lead=result['lead_list']['data'];
      console.log(this.lead_List);
      
      this.count=result['lead_list']['count'];
      setTimeout (() => {
        this.loader='';
        
      }, 700);
      if(this.lead_List.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;
        
      }
    }))
  }
  
  deleteLead(id)
  {
    console.log("hello");
    
    this.dialog.delete('Lead Data !').then((result) => {
      if(result)
      {console.log(id);
        this.serve.fetchData({"id":id},"Distributors/distributors_delete").subscribe((result=>{
          console.log(result);
          if(result)
          {
            this.leadList();
          }
        }))
      }})
      
    }
    tmp:any=[];
    getItemsList(index,search)
    {
      this.lead_List=[];
      for(var i=0;i<this.tenp_lead.length; i++)
      {
        search=search.toLowerCase();
        this.tmp=this.tenp_lead[i][index].toLowerCase();
        if(this.tmp.includes(search))
        {
          this.lead_List.push(this.tenp_lead[i]);
        }     
      }    
    }
    viewLead()
    {
      console.log("lead view");
      
    }
    refresh()
    {
      this.leadList();
    }
    excel_data:any=[];
    exportAsXLSX():void {
      for(let i=0;i<this.lead_List.length;i++){
        this.excel_data.push({'Name':this.lead_List[i].name,'Mobile':this.lead_List[i].mobile,'WhatsApp No.':this.lead_List[i].whatsapp_no,'Email':this.lead_List[i].email,'State ':this.lead_List[i].state,'District ':this.lead_List[i].district,'City ':this.lead_List[i].city,'Pincode ':this.lead_List[i].pincode,'Dealer':this.lead_List[i].dealer_name,'Dealer Mobile':this.lead_List[i].dealer_mobile});
      }
      this.serve.exportAsExcelFile(this.excel_data, 'PLUMBER LEAD SHEET');
    }
  }
  
  