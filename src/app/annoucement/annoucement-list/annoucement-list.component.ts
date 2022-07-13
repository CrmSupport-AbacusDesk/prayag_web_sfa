import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService'
import { sessionStorage } from 'src/app/localstorage.service';

@Component({
  selector: 'app-annoucement-list',
  templateUrl: './annoucement-list.component.html',
  animations: [slideToTop()]

})
export class AnnoucementListComponent implements OnInit {

  announcementList:any=[];
  loader:any;
  data_not_found=false;
  skelton:any={}



  assign_login_data: any = [];
  assign_login_data2: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  constructor(public service:DatabaseService,public session: sessionStorage)
  {
    this.skelton = new Array(10);

    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;

    this.assign_login_data = this.assign_login_data.assignModule;

    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'Announcement');
    console.log(index);

    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;

    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);
    this.annoucementList();
   }

  ngOnInit() {
  }

  annoucementList()
  {
    this.loader=1;

    this.service.fetchData({
      'user_id': this.assign_login_data2.id,'user_type': this.assign_login_data2.type},'Announcement/announcement_list').subscribe((resp)=>
    {
      console.log(resp);
      this.announcementList = resp;

      if(this.announcementList.length ==0)
      {
        this.data_not_found=true;
      }
      else
      {
        this.data_not_found=false;
      }
      this.loader='';

    })
  }

}
