import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  animations: [slideToTop()]

})
export class AddHolidayComponent implements OnInit {
data:any={};
state_data:any={};
  constructor(public service:DatabaseService) 
  {
    this.data.type = 'National';
  }

  submit()
  {
    console.log(this.data);
    
    this.data.state_data = this.state_data;

    this.service.fetchData(this.data,'leave_holiday/add_holiday').subscribe((resp)=>
    {
      console.log(resp);
      
    })
    
  }

  ngOnInit() 
  {

  }

}
