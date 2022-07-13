import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import {MatDialog} from '@angular/material';
import { UserEmailModalComponent } from '../user-email-modal/user-email-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/dialog.service';
import { EditAddressComponent } from 'src/app/edit-address/edit-address.component';
import { DialogComponent } from 'src/app/dialog.component';
import { sessionStorage } from 'src/app/localstorage.service';

import * as moment from 'moment';
// import { DH_CHECK_P_NOT_PRIME } from 'constants';
// import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-sale-user-detail',
  templateUrl: './sale-user-detail.component.html',
  animations: [slideToTop()]
})
export class SaleUserDetailComponent implements OnInit {
  manager:any;
  rsm:any=[];
  ass_user:any=[];
  detail:any={};
  state_list:any=[];
  district_list:any=[];
  city_list:any=[];
  area_list:any=[];
  pinCode_list:any=[];
  user_id;
  input_type="";
  visible=true;
  loader:any;
  rsm_list:any=[];
  login_data:any=[];
  team_edit:any=[];
  team1_edit:any=[];
  tmp_userList:any=[];
  view_tab: any = 'profile';
  search:any={};
  tmpsearch:any={};
  assign_module_data:any=[];
  checkin_data:any=[];
  orderTabActive: any = {}
  order_data:any=[];
  totalOrders:any=[];
  orderTabCounters:any=[];
  order_list:any=[];
  leave_list:any=[];
  quotation_list:any=[];
  attendancelist:any=[];
  travel_list:any=[];
  followup_list:any=[];
  contractorMeetListDetail:any=[];
  expense_list:any=[];
  PopData:any=[];
  userData: any;
  userId: any;
  userName: any;


  
       
        constructor(public alert:DialogComponent,public  serve:DatabaseService, public dialog: MatDialog,public rout:Router,public editdialog:DialogService,
          public session: sessionStorage,public route:ActivatedRoute) {
    
    this.route.params.subscribe( params => {
      console.log(params);
      this.user_id = params.id;
      console.log(this.user_id);

      this.login_data = this.session.getSession();
            this.login_data = this.login_data.value;
            this.login_data = this.login_data.data;
      
            this.userData = JSON.parse(localStorage.getItem('st_user'));
            this.userId=this.userData['data']['id'];
            this.userName=this.userData['data']['name'];
    });
    this.userDetail(); 
    this.getStateList();
    
    
  }
  
  //  openDialog(): void 
  //  {
  //     const dialogRef = this.dialog.open(UserEmailModalComponent, {
  //     width: '250px',
  //        });
  //     dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }
  access_level:any;
  userDetail()
  {
   
    this.loader=1;
    
    // console.log(id);
    let value={"id":this.user_id}
    this.serve.fetchData(value,"User/user_detail").subscribe((result)=>{
      console.log(result);

      this.detail=result['user_detail']['data']
      this.assign_module_data=result['user_detail']['assignModule'];
      ;
      // this.detail.splice(this.user_id,1);
      console.log(this.detail);

      this.detail['assign_user']  = this.detail['assign_user'].filter(row => row.name !== this.detail.name);
      
      this.access_level=this.detail.access_level;
      console.log(this.access_level)
      this.assign_users(this.access_level,this.detail.team_code);
      this.team_edit = result['user_detail']['data']['assign_user'];
      console.log(this.team_edit);
      this.detail['user_pop_gift']  = this.detail['user_pop_gift'];
      console.log( this.detail['user_pop_gift']);
      this.detail['outgoing_user_pop_gift']  = this.detail['outgoing_user_pop_gift'];
      console.log( this.detail['outgoing_user_pop_gift']);
      
      // this.rsm_list=result;
      
      
      // this.manager=result['user_detail']['manager'];
      
      setTimeout (() => {
        this.loader='';
        
      }, 700);
      
    })
    
  }
  
  
  ngOnInit() {
    this.input_type="password";
    // this.detail=this.serve.get_data()
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
  getDistrict()
  {
    console.log(this.detail.state_name);
    this.serve.fetchData(this.detail.state_name,"User/district_user_list").subscribe((response=>{
      // console.log(response);
      this.district_list=response['query']['district_name'];
      console.log(this.district_list);
      
    }));
    
  }
  
  getCityList()
  {
    console.log(this.detail.district_name);
    
    console.log(this.detail.state_name);
    let value={"state":this.detail.state_name,"district":this.detail.district_name}
    this.serve.fetchData(value,"User/city_user_list").subscribe((response=>{
      console.log(response);
      this.city_list=response['query']['city'];
      console.log(this.city_list);
      
    }));
  }
  
  getAreaList()
  {
    console.log(this.detail.district);
    let value={"state":this.detail.state_name,"district":this.detail.district_name,"city":this.detail.city}
    this.serve.fetchData(value,"User/area_user_list").subscribe((response=>{
      console.log(response);
      this.area_list=response['query']['area'];
      console.log(this.area_list);
      
    }));
  }
  
  getPinCodeList()
  {
    console.log(this.detail.state_name,this.detail.district_name,this.detail.city,this.detail.area);
    let value={"state":this.detail.state_name,"district":this.detail.district_name,"city":this.detail.city,"area":this.detail.area}
    this.serve.fetchData(value,"User/pincode_user_list").subscribe((response=>{
      console.log(response);
      this.pinCode_list=response['query']['pincode'];
      console.log(this.pinCode_list);
      
    }));
  }
  
  updateDetail()
  {
    console.log(this.detail.id);
    console.log(this.detail);
    let value={'id':this.detail.id,'data':this.detail};
    this.serve.fetchData(value,"User/update_user").subscribe((result=>{
      console.log(result);
      
      if(result)
      {
        this.rout.navigate(['/sale-user-list']);
      }
      
    }))
    
  }
  
  // editaddress()
  // {
  //   console.log("hello");
  //   this.editdialog.editAddress();      
  // }
  category="user";
  openEditDialog(value,type): void 
  {
    const dialogRef = this.dialog.open(UserEmailModalComponent, {
      width: '350px',
      data:{
        value,
        type,
        user_id : this.user_id,
        category:this.category
      }});
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        console.log('The dialog was closed');
        //  this.toast.successToastr("detail");
        this.userDetail();
        
        
      });
    }
    
    editaddress()
    {
      const dialogRef = this.dialog.open(EditAddressComponent, {
        width:'590px',
        data:{
          data:this.detail
        }});
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          console.log('The dialog was closed');
          this.userDetail();
          
        });
        
      }
      show_password()
      {
        this.input_type = 'text';
        this.visible=false;
      }
      
      hide_password()
      {
        this.input_type = 'password';
        this.visible=true;
      }
      team_update:any = false;
      edit_assigned_team(){
        //  alert('fd');
        this.team_update=true;
        
      }
      active:any={};
      
      toggleterritory(key,action)
      {
        console.log(action);
        console.log(key);
        
        if(action == 'open')
        { this.active[key] = true; }
        if(action == 'close')
        { this.active[key] = false;}
        
        console.log(this.active);
        //  this.salesUserLIst()
        
      }
      product_Brand(value,index,event)
      {
        
        
        
        if(event.checked)
        {
          this.rsm.push(value);
          console.log(this.rsm);
          
        }
        else
        {
          for( var j=0;j<this.rsm_list.length;j++)
          {
            if(this.rsm_list[index]['id']==this.rsm[j])
            {
              this.rsm.splice(j,1);
            }
          }
          console.log(this.rsm);
        }
        this.ass_user =  this.rsm
        
      }
     
      getItemsList(search)
      {
        console.log(search);
        
        this.rsm_list=[];
        for(var i=0;i<this.tmp_userList.length; i++)
        {
          search=search.toLowerCase();
          this.tmpsearch=this.tmp_userList[i]['name'].toLowerCase() + ' '+ this.tmp_userList[i]['role_name'].toLowerCase();
          if(this.tmpsearch.includes(search))
          {
            this.rsm_list.push(this.tmp_userList[i]);
          }     
        }    
        console.log(this.rsm_list);
        
      }

      // checked_array(){
      //   console.log(this.rsm_list);
      //   if(this.rsm_list)
      //   {
      //     console.log('in1');
      //     for(let i=0;i<this.rsm_list.length;i++)
      //     {
      //     console.log('in2');
      
      //       for(let j=0;j<this.team_edit.length;j++)
      //       {
      //     console.log('in3');
      
      //         if(this.rsm_list[i]['name']==this.team_edit[j]['name'])
      //         {
      //     console.log('in4s');
      
      //           this.rsm.push(this.rsm_list[i]['id']);
      //           console.log(this.rsm);
      //         }
      //       }
      
      //     }
      //   }
      // }

      assign_users(accesslevel,code)
      {
        console.log(accesslevel);
        console.log(code);

        this.serve.fetchData({'user_type':accesslevel,'user_id':this.user_id,'team_code':code},"User/assign_users").subscribe((response=>{
          console.log(response);
          
          
          this.rsm_list=response['assign_users'];

          this.rsm_list = this.rsm_list.filter(row => row.id != this.user_id);
          console.log(this.rsm_list);

          // console.log(this.user_id);
          // for(let i=0;i<this.rsm_list.length;i++){
          //   console.log(this.rsm_list[i].id);
          //   var _id=this.rsm_list[i].id;
          //   console.log("_id =",_id);
            
          //   console.log(parseInt(this.rsm_list[i].id)==this.user_id);
            
          //   if(parseInt(this.rsm_list[i].id)==this.user_id){
          //     this.rsm_list.splice(parseInt(this.rsm_list[i]),1);
          //     console.log("delete",this.rsm_list);
          //   }
          // }
          if(this.rsm_list)
          {
            console.log('in if');
            for(let i=0;i<this.rsm_list.length;i++)
            {
              console.log('in for1');
              
              for(let j=0;j<this.team_edit.length;j++)
              {
                console.log('in for2');
                
                if(this.rsm_list[i]['name']==this.team_edit[j]['name'])
                {
                  console.log('in if 2');
                  
                  this.rsm_list[i].check=true;
                  console.log(this.rsm_list[i]);
                  if(this.rsm.indexOf(this.rsm_list[i]['id']) === -1) {
                    this.rsm.push(this.rsm_list[i]['id']);
                    console.log(this.rsm);
                  }
                  
                  
                  
                  this.rsm.push();
                  console.log(this.rsm);
                  
                }
              }
              
            }
          }
          this.tmp_userList = this.rsm_list;

          console.log(this.rsm_list);
        }));
        // this.checked_array();
      }
      update_assignusers(){
        this.team_update=false;
        console.log(this.detail.id);
        console.log(this.rsm);
        this.serve.fetchData({'users':this.rsm,'user_id':this.detail.id,'uid':this.userId,'uname':this.userName},"User/update_assigned_users").subscribe((response=>{
          console.log(response);
          
        }));
        this.userDetail(); 
        
      }
      
      // assign_module(module_name,event)
      // {
      //   console.log(this.detail);
        
      //   this.serve.fetchData({'module_name':module_name,'event':event.checked,'user_id':this.detail.id},"User/assign_module").subscribe(response=>
      //     {
      //       console.log(response);
      //       this.userDetail();

      //     });
          
      //   }


      assign_module(module_name, event , index)
      {
        
        console.log(module_name);
        console.log(event);
        console.log(index);

        if (event.checked) {
          this.assign_module_data[index][module_name] = 'true';
          this.assign_module_data[index]['view'] = 'true';

        }
        else {
          this.assign_module_data[index][module_name] = 'false';
          
        }
        console.log(this.assign_module_data);
        
        this.serve.fetchData(this.assign_module_data[index],"user/update_user_module").subscribe(response=>
          {
            console.log(response);
            this.userDetail();
          });
          
        }

        related_tabs(tab)
        {
          console.log(tab);
          
          this.view_tab=tab;
          if(this.view_tab=='Checkin')
          {
           this.check_in();
          }

          if(this.view_tab=='pOrder')
          {
           this.orderlist();
          }
         if(this.view_tab=='sOrder')
          {
            this.secondry_order_list()
          }
          if(this.view_tab=='quotation')
          {
           this.quotationlist();
          }

          if(this.view_tab=='attendence')
          {
           this.attendencelist();
          }

          if(this.view_tab=='leaves')
          {
           this.leavelist();
          }

          if(this.view_tab=='travelplan')
          {
           this.travellist();
          }

          if(this.view_tab=='followup')
          {
           this.followuplist();
          }
            
          if(this.view_tab=='contractor-meet')
          {
            this.eventlist();
          }
          if(this.view_tab=='expense')
          {
            this.expenselist();
          }

          if(this.view_tab=='Pop-n-Gifts')
          {
            this.giftlist();
          }
      
        }


        check_in()
        {
          let search=
         {
          'user_name':this.detail.name
         }
          
          this.serve.fetchData({'created_by': this.user_id,'search': search},"Distributors/get_all_checkin_new").subscribe((response=>{
            console.log(response);
            this.checkin_data = response['result'];
            console.log(this.checkin_data);
    
          }));

        }


      secondry_order_list()
      {
        let search=
        {
         'created_by':this.detail.name
        }
       this.serve.fetchData({'created_by': this.user_id, },"Order/secondary_order_list").subscribe((response=>{
         console.log(response);
         this.totalOrders = response['order_list']['data']
          this.order_data = response['order_list']['result']
       
       }));
      }


      orderlist()
      {
         let search=
         {
          'created_by':this.detail.name
         }
        this.serve.fetchData({'created_by': this.user_id, 'search': search},"Order/order_list").subscribe((response=>{
          console.log(response);
          this.totalOrders = response['order_list']['data']
           this.order_data = response['order_list']['result']
        
        }));


      }

      quotationlist()
      {

        this.serve.fetchData({'created_by': this.detail.name},"Lead/quotationList").subscribe((response=>{
          console.log(response);
          this.quotation_list = response['data'];
           console.log(this.quotation_list);      
        }));

      }


      attendencelist()
      {

         let search=
         {
          'name':this.detail.name
         }
        this.serve.fetchData({'created_by': this.user_id,'search': search},"Attendance/getAttendance").subscribe((response=>{
          console.log(response);
          this.attendancelist = response;
           console.log(this.attendancelist);      
        }));

      }


      leavelist()
      {
        let filter=
        {
         'created_by':this.detail.name
        }

        this.serve.fetchData({'created_by': this.user_id, 'filter': filter},"Leaves/leave_list").subscribe((response=>{
          console.log(response);
          this.leave_list = response;

           console.log(this.leave_list);      
        }));

      }


      travellist()
      {

        let search=
        {
         'created_by':this.detail.name
        }


        this.serve.fetchData({'created_by': this.user_id, 'search': search},"Travel/travel_list").subscribe((response=>{
          console.log(response);
          this.travel_list = response;
           console.log(this.travel_list);      
        }));

      }

      followuplist()
      {
        let search=
        {
          'sales_user': this.detail.name

        }
        

        

        this.serve.fetchData({'created_by': this.user_id,'search':search},"Distributors/followup_list").subscribe((response=>{
          console.log(response);
          this.followup_list=response['followup_list'];

           console.log(this.followup_list);      
        }));

      }



      eventlist()
      {

        this.serve.fetchData({'created_by': this.user_id, 'created_by_user': this.detail.name},"Contractor/filterMeetingData").subscribe((response=>{
          console.log(response);
          this.contractorMeetListDetail = response['result']
           console.log(this.contractorMeetListDetail);
                 
        }));

      }


      expenselist()
      {
        let search=
        {
          'userName': this.detail.name

        }
      
        this.serve.fetchData({'created_by': this.user_id,'search': search},"Expense/expense_list").subscribe((response=>{
          console.log(response);
          this.expense_list=response;
           console.log(this.expense_list);
                 
        }));

      }

      giftlist()
      {

        this.serve.fetchData({'created_by': this.user_id},"PopGift/pop_gift_list").subscribe((response=>{
          console.log(response);
          this.PopData=response['PopData'];
           console.log(this.PopData);
                 
        }));

      }

          
      }
      