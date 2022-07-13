import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dailyactivity',
  templateUrl: './dailyactivity.component.html',
  styleUrls: ['./dailyactivity.component.scss']
})
export class DailyactivityComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public route: Router) { 
  console.log(data);
  
  
  }
  ngOnInit() {
    
  }

  topopngift()
  {
    this.route.navigate(['/pop-gift-list']);
    
  }
}

