import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog.component';


@Component({
  selector: 'app-user-lead-list',
  templateUrl: './user-lead-list.component.html',
  animations: [slideToTop()]
})
export class UserLeadListComponent implements OnInit {

  user_id:any;
  value:any=[];
  userLeadList:any=[];
  constructor(public route:ActivatedRoute,public serve:DatabaseService,public dialog:DialogComponent) { 

    this.route.params.subscribe( params => {
      console.log(params);
      this.user_id = params.id;
      console.log(this.user_id);
      
      });
  }

  ngOnInit() {
    this.userleadList();
    this.userDetail();
  }

  userDetail()
  {
    // console.log(id);
    let value={"id":this.user_id}
    this.serve.fetchData(value,"User/user_detail").subscribe((result)=>{
      console.log(result);
      this.value=result['user_detail']['data'];
    })
  }

  userleadList()
  {
    console.log("leadList");
    this.serve.fetchData({'user_id':this.user_id},"User/user_lead_list").subscribe((response=>{
      console.log(response);
      this.userLeadList=response['user_lead_list'];
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
            this.userLeadList();
          }
        }))
      }})
    
  }

}
