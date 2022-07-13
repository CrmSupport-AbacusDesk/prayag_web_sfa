import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { FollowupEditComponent } from '../followup-edit/followup-edit.component';

@Component({
  selector: 'app-followup-detail',
  templateUrl: './followup-detail.component.html',
  styleUrls: ['./followup-detail.component.scss']
})
export class FollowupDetailComponent implements OnInit {
  followup_id: any;
  followup_detail: any={};
  loader: boolean = false;
  
  constructor(public dialog: MatDialog,public serve: DatabaseService,public route: ActivatedRoute,) { 
    
    this.route.params.subscribe(params => {
      this.followup_id = params.id;
      console.log(this.followup_id);
      this.get_followup_detail();
    });
    
  }
  
  ngOnInit() {
  }
  
  
  get_followup_detail() {
    this.loader = true;
    this.serve.fetchData({'followup_id':this.followup_id}, "Distributors/followup_detail").subscribe((result) => {
      this.followup_detail = result['followup_detail'][0];
      console.log(this.followup_detail);
      setTimeout(() => {
        this.loader = false;
      }, 700);
    })
  }
  
  
  edit_followup_modal() {
    const dialogRef = this.dialog.open(FollowupEditComponent, {
      width: '750px',
      data: {
        'followup_detail':this.followup_detail,
        'from':'followup detail page'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.get_followup_detail()
    });
  }
  
  
  
}
