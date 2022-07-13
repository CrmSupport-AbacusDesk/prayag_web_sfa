import { Component, OnInit } from '@angular/core';
import { slideToRight } from '../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router, ActivatedRoute } from '@angular/router';
import { sessionStorage } from '../localstorage.service';
import { DialogComponent } from '../dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [slideToRight()]
})
export class LoginComponent implements OnInit {
  
  data:any=[];
  peraluser:any={};
  st_user: any = {};
  nexturl:any;
  channel_partner:boolean = false;
  cp_otp:any;
  
  constructor(public serve:DatabaseService,public rout:Router,public session:sessionStorage,public dialog:DialogComponent,private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
  }
  
  login()
  {
    // this.session.setSession(this.data['username'],this.data['password']);
    
    let value={"username":this.data['username'],"password":this.data['password']}
    this.serve.fetchData(value,"login/submitnew").subscribe((data:any) => {
      console.log(data);
      
      
      for(let i = 0 ;i<data['assignModule'].length ;i++){
        
        if(data['assignModule'][i]['module_name'] == 'Lead' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_leads'] = 1
          // data['data']['view_lead_channel_partner'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Dashboard' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_dashboard'] = 1
        }  
        else if(data['assignModule'][i]['module_name'] == 'Lead' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_leads'] = 1
          // data['data']['view_lead_direct_dealer'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Lead End Users' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_leads'] = 1
          data['data']['view_lead_end_user'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Lead Others' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_leads'] = 1
          data['data']['view_lead_others'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Lead' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_leads'] = 1
          // data['data']['view_lead_project'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Lead Electrician' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_leads'] = 1
          data['data']['view_lead_electrician'] = 1
        } else if(data['assignModule'][i]['module_name'] == 'Lead Sub-dealer' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_leads'] = 1
          data['data']['view_sub_dealer'] = 1
        } else if(data['assignModule'][i]['module_name'] == 'Lead Private Contractor' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_leads'] = 1
          data['data']['view_private_contractor'] = 1
        } else if(data['assignModule'][i]['module_name'] == 'Lead Government Contractor' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_leads'] = 1
          data['data']['view_lead_government_contractor'] = 1
        } else if(data['assignModule'][i]['module_name'] == 'Lead Builder' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_leads'] = 1
          data['data']['view_lead_builder'] = 1
        } else if(data['assignModule'][i]['module_name'] == 'Lead Architect' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_leads'] = 1
          data['data']['view_lead_architect'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Distribution' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_distribution_n_w'] = 1
          // data['data']['view_dist_n_w_channel_partner'] = 1
          
        }
        else if(data['assignModule'][i]['module_name'] == 'Distribution' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_distribution_n_w'] = 1
          // data['data']['view_dist_n_w_direct_dealer'] = 1
          
        }
        else if(data['assignModule'][i]['module_name'] == 'Distribution' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_distribution_n_w'] = 1
          // data['data']['view_dist_n_w_dealer'] = 1
          
        }
        else if(data['assignModule'][i]['module_name'] == 'Primary Orders' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_orders'] = 1
          data['data']['view_orders_primary'] = 1
          
        }
        else if(data['assignModule'][i]['module_name'] == 'Secondary Orders' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_orders'] = 1
          data['data']['view_orders_secondary'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Quotation' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_quotation'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Attendance' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_attendence'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Check In' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_check_in'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Leaves' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_leaves'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Travel Plan' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_travel_plan'] = 1
          
        }
        else if(data['assignModule'][i]['module_name'] == 'Follow Up' && data['assignModule'][i]['view'] == 'true'){
          data['data']['follow_up'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Announcement' && data['assignModule'][i]['view'] == 'true'){
          data['data']['announcement'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Expense' && data['assignModule'][i]['view'] == 'true'){
          data['data']['expense'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Event' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_event'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Pop & Gift' && data['assignModule'][i]['view'] == 'true'){
          data['data']['pop_gift'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Product Master' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_products'] = 1
          data['data']['masters'] = 1
        }

        else if(data['assignModule'][i]['module_name'] == 'User Master' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_users'] = 1
          data['data']['masters'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Allowance Master' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_allowance_master'] = 1
          data['data']['masters'] = 1
          
        }
        else if(data['assignModule'][i]['module_name'] == 'Location Master' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_location_master'] = 1
          data['data']['masters'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Distributor Target' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_dis_target'] = 1
          data['data']['target'] = 1
          console.log(data['data']['view_dis_target'])
        } else if(data['assignModule'][i]['module_name'] == 'User Target' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_user_target'] = 1
          data['data']['target'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Activity Report' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_activity_report'] = 1
        }
        else if(data['assignModule'][i]['module_name'] == 'Documents' && data['assignModule'][i]['view'] == 'true'){
          data['data']['view_documents'] = 1
        }
        else{
          
        }
        
        
        
      }
      
      
      if(data.data.type == '1'  && data.data.lead_type == 'Dr')
      {
        this.channel_partner = true;
        
        this.st_user = data;
        
        this.cp_otp =  Math.floor(100000 + Math.random() * 900000);
        
        let value={"mobile":this.st_user.data.mobile,"otp":this.cp_otp}
        
        this.serve.fetchData(value,"login/verify_otp").subscribe((data:any) => 
        {
          console.log(data);
          
        });
        
      }
      else
      {
        this.channel_partner = false;
        
        if(data['message']=='Success')
        {
          this.dialog.success("LogIn","Success");
          this.st_user = data;
          console.log(this.st_user);
          this.st_user.data.access_level = "1";
          this.st_user.st_log = true;
          localStorage.setItem('st_user',JSON.stringify(this.st_user) );
          
         
          if( this.st_user.data.view_attendence == '1')
          {   
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/distribution-list';
            this.router.navigate([this.nexturl]);
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/attendance';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_leads == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/lead-list/1/Distributor';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_lead_channel_partner == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/lead-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_lead_direct_dealer == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/lead-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_lead_end_user == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/lead-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_lead_others == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/lead-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_lead_project == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/lead-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_dashboard == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_dist_n_w_channel_partner == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/distribution-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_dist_n_w_direct_dealer == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/direct-dealer';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_dist_n_w_dealer == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/dealer';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_orders == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/order-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_orders_primary == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/order-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_orders_secondary == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/secondary-order-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_dist_n_w_channel_partner == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/distribution-list';
            this.router.navigate([this.nexturl]);
           
          }
          else if(this.st_user.data.view_check_in == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/checkin';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_leaves == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/leave-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_travel_plan == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/travel-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_products == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/product-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_users == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/sale-user-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_quotation == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/quotation';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.follow_up == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/followup-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.announcement == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/announcement-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.expense == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/expense-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_event == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/contractor-meet';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.pop_gift == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/pop-gift-list';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_allowance_master == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/allowances';
            this.router.navigate([this.nexturl]);
          }
          else if(this.st_user.data.view_location_master == '1')
          {
            this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/location-Master';
            this.router.navigate([this.nexturl]);
          }
          else
          {
            
          }
        }
        else
        {
          this.dialog.error("Incorrect UserName or Password");
        }
      }
      
    },error=>{
      console.log(error);
    });
  }
  
  
  submit_otp()
  {
    if(this.cp_otp == this.data.otp)
    {
      this.dialog.success("LogIn","Success");
      console.log(this.st_user);
      this.st_user.data.access_level = "2";
      this.st_user.st_log = true;
      localStorage.setItem('st_user',JSON.stringify(this.st_user));
      
      this.router.navigate(['/distribution-detail/'+this.st_user['data'].id]);
    }
    else
    {
      this.dialog.error("Incorrect Otp");
    }
  }
  
  
}
