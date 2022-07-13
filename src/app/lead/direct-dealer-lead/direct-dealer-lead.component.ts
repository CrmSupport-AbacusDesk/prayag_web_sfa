import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';// import { slideToTop } from '../../router-animation/router-animation.component';
// import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import * as moment from 'moment';






@Component({
  selector: 'app-direct-dealer-lead',
  templateUrl: './direct-dealer-lead.component.html',
  styleUrls: ['./direct-dealer-lead.component.scss']
})
export class DirectDealerLeadComponent implements OnInit {
  
  loader:any;
  search_val:any={}
  page_limit:any=50;
  lead_List:any=[];
  leadtmp:any=[];
  count:any;
  data_not_found=false;
  skelton:any={};







  constructor(public serve:DatabaseService,public dialog:DialogComponent) {}

  ngOnInit() {
    this.skelton = new Array(10);
    this.leadList();
  }

  leadList()
  {
    this.loader=true;
    if( Object.getOwnPropertyNames(this.search_val).length != 0)
    {
      this.page_limit = 0;
      this.lead_List = [];
    }
    this.serve.fetchData({'start':this.lead_List.length,'pagelimit':this.page_limit,'search':this.search_val},"Distributors/direct_dealer_lead_list").subscribe((result=>
      {
          console.log(result);
          this.leadtmp =result['lead_list']['data'];
          console.log(this.lead_List);
          this.lead_List = this.lead_List.concat(result['lead_list']['data']);
          
          this.count=result['lead_list']['count'];
          setTimeout (() => {
            this.loader=false;
        
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
      this.excel_data.push({'Company Name':this.lead_List[i].company_name,'Contact Person':this.lead_List[i].name,Mobile:this.lead_List[i].mobile,'WhatsApp No.':this.lead_List[i].whatsapp_no,Email:this.lead_List[i].email,'Address ':this.lead_List[i].address,'State ':this.lead_List[i].state,'District ':this.lead_List[i].district,'City ':this.lead_List[i].city,'Pincode ':this.lead_List[i].pincode,'Assigned Sales User':this.lead_List[i].assigned_to});
    }
    this.serve.exportAsExcelFile(this.excel_data, 'DEALER LEAD SHEET');
  }
  tmpsearch1:any={};

  getItemsList(index,search)
  {
    console.log(search);
    this.lead_List=[];


    if(index=='created_by'){
      for(var i=0;i<this.leadtmp.length; i++)
      {
        search=search.toLowerCase();
        this.tmpsearch1=this.leadtmp[i]['created_name']['name'].toLowerCase();
        if(this.tmpsearch1.includes(search))
        {
      // console.log(this.orderlist);
    console.log(search);

  
          this.lead_List.push(this.leadtmp[i]);
        }     
      
      }
    }
    if(index!='created_by'){
      for(var i=0;i<this.leadtmp.length; i++)
      {
        search=search.toLowerCase();
        if(this.leadtmp[i][index]!=null){
        this.tmpsearch1=this.leadtmp[i][index].toLowerCase();

        }
        if(this.leadtmp[i][index]==null){
          this.tmpsearch1='';
  
          }
        if(this.tmpsearch1.includes(search))
        {
      // console.log(this.orderlist);
      console.log(search);
  
          this.lead_List.push(this.leadtmp[i]);
        }     
      
      }
    }

        
    console.log(this.lead_List);
    
  }
  public onDate(event): void 
  {
    this.search_val.date_created=moment(event.value).format('YYYY-MM-DD');    
    this.leadList();
  }

  
}
