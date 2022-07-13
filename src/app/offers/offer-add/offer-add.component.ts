import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.scss']
})
export class OfferAddComponent implements OnInit {
  state_list:any=[];
  district_list:any=[];
  data:any={};
  loader:any='';
  data_not_found : any=false;
  constructor(public serve:DatabaseService,public rout:Router,public route:ActivatedRoute) { 
    this.getStateList();
    
  }
  district_name : any='';
  ngOnInit() {
  }
  getStateList()
  {
    console.log("addUser");
    this.serve.fetchData(0,"User/state_user_list").subscribe((response=>{
      console.log(response);  
      this.state_list=response['query']['state_name'];
      console.log(this.state_list);
    }));
    
  }
  all_district:any=[];
  // getDistrict(state_name)
  // {
  //   console.log(state_name);
  //   this.serve.fetchData(state_name,"User/district_user_list").subscribe((response=>{
  //     // console.log(response);
  //     this.district_list=response['query']['district_name'];
  //     console.log(this.district_list);
  //     this.all_district.push(this.district_list);
  //     console.log(this.all_district);
  //   }));
  
  // }
  
  districts(state){
    console.log(state);
    // this.getDistrict(state);
  }
  offer_add(){
    console.log(this.data);
    console.log("offer_add**********");
    this.serve.fetchData(this.data,"Offer/offer_add").subscribe((response=>{
      // console.log(response);  
      // this.state_list=response['query']['state_name'];
      // console.log(this.state_list);
    }));
  }
}
