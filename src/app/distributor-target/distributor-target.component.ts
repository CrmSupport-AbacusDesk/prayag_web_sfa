import { Component, OnInit} from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import { UploadFileModalComponent } from 'src/app/upload-file-modal/upload-file-modal.component';
import { MatDialog} from '@angular/material';
import { sessionStorage } from 'src/app/localstorage.service';


@Component({
  selector: 'app-distributor-target',
  templateUrl: './distributor-target.component.html',
  styleUrls: ['./distributor-target.component.scss']
})
export class DistributorTargetComponent implements OnInit {
  come_from : any =''

  constructor(public serve: DatabaseService,public alrt:MatDialog,public session: sessionStorage) {
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;

    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'Distributor Target');
    console.log(index);

    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;

    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);
    this.get_distributor_list();
  }
  value:any={};
  distributor_list:any=[];
  assign_login_data: any = [];
  assign_login_data2: any = [];

  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  ngOnInit() {
  }
get_distributor_list()
{
  this.serve.fetchData({'user_id':this.assign_login_data2.id},"User/distributors_target_list").subscribe((result => {
    console.log(result);
    this.distributor_list=result['target_list'];
    for(let i = 0; i < this.distributor_list.length; i++){
      this.distributor_list[i].achieve= parseFloat(this.distributor_list[i].achieve)
      this.distributor_list[i].achieve=this.distributor_list[i].achieve.toFixed(2)
    }

    console.log(this.distributor_list);

  }));
}
upload_excel()
  {
    const dialogRef = this.alrt.open(UploadFileModalComponent,{
      width: '500px',
      data:{
        'from':'distributor_target',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.get_distributor_list();

    });
  }
  refresh1()
  {
    this.value={};
  }
}
