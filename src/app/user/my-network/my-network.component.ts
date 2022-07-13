import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';

// import { NetworkEmailModalComponent } from '../network-email-modal/network-email-modal.component';


@Component({
  selector: 'app-my-network',
  templateUrl: './my-network.component.html',
  animations: [slideToTop()]

})
export class MyNetworkComponent implements OnInit {

  user_id;
  distributorList=[];
  drList=[];
  value:any=[];
  search:any={};
  searchval:any={};
  distributorassign:any=[];
  drassign:any=[];
  tmp_distributorlist:any=[];
  tmp_drlist:any=[];
  distributorValue=[];
  dr_value:any=[];
  assing_user:any=[];

  constructor(public route:ActivatedRoute,public serve:DatabaseService){
    this.route.params.subscribe( params => {
      console.log(params);
      this.user_id = params.id;
      console.log(this.user_id);
      
      });
      this.getUserDetail();
      // this.assign_to();
      
  }

  ngOnInit() {
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


  getDistributorList()
  {
    this.serve.fetchData(0,"User/distributor_list").subscribe((result)=>{
      this.distributorList=result['distributor_list'];
      this.tmp_distributorlist=this.distributorList;

      for(let i=0;i<this.distributorList.length;i++)
      {

        for(let j=0;j<this.distributorassign.length;j++)
        {
          
          if(this.distributorList[i].id==this.distributorassign[j])
          {
            this.distributorList[i].check=true;
            
          }
        }
        
      }
    })

    
  }

  getLeadList()
  {
    this.serve.fetchData(0,"Distributors/lead_list").subscribe((result)=>{
      this.drList=result['lead_list']['data'];
      this.tmp_drlist=this.drList;

      for(let i=0;i<this.drList.length;i++)
      {

        for(let j=0;j<this.distributorassign.length;j++)
        {
          if(this.drList[i].id==this.distributorassign[j])
          {
            this.drList[i].check=true;
          }
        }
        
      }
    })

    
  }
  getUserDetail()
  {
    let value={"id":this.user_id}
    this.serve.fetchData(value,"User/user_detail").subscribe((result)=>{
      this.value=result['user_detail']['data'];
      this.distributorassign=result['user_detail']['assigned_data'];
      this.getDistributorList();
      this.getLeadList();
      console.log(this.value);
      
      
    })
  }

  assign_to_distributor(index,selected_distributor,action)
  {
      if(action.checked){
        this.distributorassign.push(selected_distributor);  
        let value={'user_id':this.user_id,'data':this.distributorassign};
        this.serve.fetchData(value,"User/dr_assign").subscribe((result)=>{
        }) 
      }
      else
      {
            for( var j=0;j<this.distributorassign.length;j++)
            {
              if(this.distributorList[index].id==this.distributorassign[j])
              {
                this.distributorassign.splice(j,1);
              }
  
            }
          let value={'user_id':this.user_id,'data':this.distributorassign};
          this.serve.fetchData(value,"User/dr_assign").subscribe((result)=>{
            console.log(result);
          }) 
      }             
     
     
  }

  assign_to_lead(index,selected_dr,action)
  {
      if(action.checked){
        this.distributorassign.push( selected_dr);  
        let value={'user_id':this.user_id,'data':this.distributorassign};
        this.serve.fetchData(value,"User/dr_assign").subscribe((result)=>{
          console.log(result);
        }) 

      }
      else
      {

            for( var j=0;j<this.distributorassign.length;j++)
            {
              if(this.drList[index].id==this.distributorassign[j])
              {
                this.distributorassign.splice(j,1);
              }
  
            }
         let value={'user_id':this.user_id,'data':this.distributorassign};
          this.serve.fetchData(value,"User/dr_assign").subscribe((result)=>{
            console.log(result);
          }) 

     }   
    
  }
  tmp:any;
  getItem(search)
  {
    this.distributorList=[];
    for(var i=0;i<this.tmp_distributorlist.length; i++)
    {
      search=search.toLowerCase();
      this.tmp=this.tmp_distributorlist[i]['company_name'].toLowerCase();
      if(this.tmp.includes(search))
      {
        this.distributorList.push(this.tmp_distributorlist[i]);
      }     
    }    
    console.log(this.distributorList);
    
  }
tmpsearch:any;
  getSearchItem(search)
  {
    console.log(search);
    
    this.drList=[];
    for(var i=0;i<this.tmp_drlist.length; i++)
    {
      search=search.toLowerCase();
      this.tmpsearch=this.tmp_drlist[i]['company_name'].toLowerCase();
      if(this.tmpsearch.includes(search))
      {
        this.drList.push(this.tmp_drlist[i]);
      }     
    }    
    console.log(this.drList);
    
  }
}
