import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
// import { MyserviceService } from 'src/app/myservice.service';
import { DatabaseService } from 'src/_services/DatabaseService';

@Component({
  selector: 'app-leave-rule-list',
  templateUrl: './leave-rule-list.component.html',
  animations: [slideToTop()]
})
export class LeaveRuleListComponent implements OnInit {
  holiday_rule_data:any=[];
  constructor(public service:DatabaseService) 
  {
    this.holiday_rules_data();
  }

  holiday_rules_data()
  {
    this.service.fetchData(0,'leave_holiday/leave_list').subscribe((resp)=>
    {
      console.log(resp);
      this.holiday_rule_data=resp;
      
    })
  }

  delete(id)
  {
    console.log(id);

    let value={'id':id}
    this.service.fetchData(value,'leave_holiday/delete_rules').subscribe((resp)=>
    {
      console.log(resp);
      if(resp)
      {
        this.holiday_rules_data();
      }
      
    })
    

  }

  ngOnInit() {
  }

}
