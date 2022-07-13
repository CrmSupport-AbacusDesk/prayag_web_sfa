import { Injectable, OnInit, Renderer2 } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService'
import { DialogComponent } from './dialog.component';


@Injectable({ providedIn: 'root' })
export class sessionStorage implements OnInit {
    loading = false;   
    alert:any;
    st_user: any = {};
    nexturl:any;
    constructor(private route: ActivatedRoute, private router: Router, public db: DatabaseService,public dialog:DialogComponent) {  
        
    }
    
    ngOnInit() {
        this.st_user.st_log = false;
        console.log(this.st_user);
    }
    
    getSession():  Observable<any> {
        
        this.st_user = JSON.parse(localStorage.getItem('st_user')) || [];
        return of(this.st_user);
    }
    
    
    LogOutSession()
    {  
        this.st_user = {};
        this.st_user.st_log = false;
        this.db.can_active = '';
        localStorage.removeItem('st_user');     
    }
    
    // setSession(username,password)            
    // {
    //     let value={"username":username,"password":password}
    //     this.db.fetchData(value,"login/submitnew")
    //     .subscribe((data:any) => {
    //         console.log(data);
    //         if(data['message']=='Success'){
    //             this.dialog.success("LogIn","Success");
    //             this.st_user = data;
    //             console.log(this.st_user);
    //             this.st_user.st_log = true;
    //             localStorage.setItem('st_user',JSON.stringify(this.st_user) );
                
                
    //             if(this.st_user.data.view_dashboard == '1')
    //             {   
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_leads == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/lead-list';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_distribution_n_w == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/distribution-list';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_orders == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/order-list';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_attendence == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/attendance';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_check_in == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/checkin';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_user_location == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/live_track';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_plumbing_man == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/plumber-lead-list';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_consumer == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/consumer-lead-list';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_banner == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/banner-banner-list';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_leaves == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/leave-list';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_travel_plan == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/travel-list';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_products == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/product-list';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_users == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/sale-user-list';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_discount == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/discount-list';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_category_master == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/categorymaster';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else if(this.st_user.data.view_report == '1')
    //             {
    //                 this.nexturl = this.route.snapshot.queryParams['returnUrl'] || '/dwr';
    //                 this.router.navigate([this.nexturl]);
    //             }
    //             else
    //             {
    //                 this.router.navigate(['/distribution-detail/'+data['data'].id]);
    //             }
    //         }
    //         else
    //         {
    //             this.dialog.error("Incorrect UserName or Password");
    //         }
            
    //     },error=>{
    //         console.log(error);
    //     });
    // }
}
