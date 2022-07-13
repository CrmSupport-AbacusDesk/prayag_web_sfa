import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService'
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog.component';


@Component({
  selector: 'app-annoucement-detail',
  templateUrl: './annoucement-detail.component.html',
  styleUrls: ['./annoucement-detail.component.scss']
})
export class AnnoucementDetailComponent implements OnInit {

  noticeId:any='';
  loader:any;
  noticeDetail:any={}

  constructor(
              public route:ActivatedRoute,
              public serve:DatabaseService,
              public router :Router ,
              public dialog: MatDialog,
              public alert:DialogComponent) 
  { 
    this.route.params.subscribe( params => {
      console.log(params);
      this.noticeId = params.id;
      });
      console.log(serve.myimgurl);

      this.getAnnouncementDetail();
  }

  ngOnInit() 
  {
  }

  getAnnouncementDetail()
  {
    this.loader=1;
    
    this.serve.fetchData({'noticeId':this.noticeId},"Announcement/announcement_detail").subscribe((result=>
    {
      console.log(result);
      this.noticeDetail = result['announcement_detail'];

        setTimeout (() => 
        {
          this.loader='';
        }, 700);
    }))
  }

}
