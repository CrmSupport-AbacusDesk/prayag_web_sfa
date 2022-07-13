import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import { MatDialog } from '@angular/material';
import { UploadFileModalComponent } from 'src/app/upload-file-modal/upload-file-modal.component';
import { sessionStorage } from 'src/app/localstorage.service';


@Component({
  selector: 'app-userview-target',
  templateUrl: './userview-target.component.html',
  styleUrls: ['./userview-target.component.scss']
})
export class UserviewTargetComponent implements OnInit {

  constructor(public serve: DatabaseService,public alrt:MatDialog,public session: sessionStorage) {
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;

    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'User Target');
    console.log(index);

    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;

    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);
this.get_user_data();
  }

  ngOnInit() {
  }
  assign_login_data: any = [];
  assign_login_data2: any = [];

  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
value:any={};
target_list:any=[];
refresh1()
{
  this.value={};
}
get_user_data()
{

  this.serve.fetchData({'user_id':this.assign_login_data2.id,},"User/user_target_list").subscribe((result => {
    console.log(result);
    this.target_list=result['target_list'];
    console.log(this.target_list);
    for(let i = 0; i < this.target_list.length; i++){
      this.target_list[i].achieve= parseFloat(this.target_list[i].achieve)
      this.target_list[i].achieve=this.target_list[i].achieve.toFixed(2)
    }
  }));
}
upload_excel()
  {
    const dialogRef = this.alrt.open(UploadFileModalComponent,{
      width: '500px',
      data:{
        'from':'user_target',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.get_user_data()
    });
  }
}
