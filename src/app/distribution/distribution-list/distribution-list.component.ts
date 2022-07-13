import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { sessionStorage } from 'src/app/localstorage.service';
import * as moment from 'moment';
import { UploadFileModalComponent } from 'src/app/upload-file-modal/upload-file-modal.component';
import { MatDialog } from '@angular/material';
// import { isObjectEmpty } from 'ngx-bootstrap/chronos/utils/type-checks';

@Component({
  selector: 'app-distribution-list',
  templateUrl: './distribution-list.component.html',
  animations: [slideToTop()]

})
export class DistributionListComponent implements OnInit {
  active_tab='active';

  value:any={};
  dr_list_temp:any=[];
  distributor_list:any=[];
  start:any=0;
  count:any;
  total_page:any;
  pagenumber:any;
  page_limit:any=50
  exp_loader:any=false;
  loader:any=false;
  data:any=[];
  data_not_found=false;
  type:any;
  type_id:any;
  brand_master:any=[];
  state_values:any=[];
  search_val:any={};
  login_data:any=[];
  login_dr_id:any;
  skelton:any={}
  today_date:Date;
  add: any = {};
  sort:any={}
  delete: any = {};

  edit: any = {};
  assign_login_data2: any = [];
  all_count:any={}

  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;

  constructor(public serve: DatabaseService, public route: Router, public ActivatedRoute: ActivatedRoute,public dialog:DialogComponent,public session:sessionStorage, public alrt:MatDialog) {
    this.today_date = new Date();

    this.search_val.contact_person='';
    this.search_val.company_name='';
    this.search_val.customer_code='';
    this.search_val.created_by='';
    this.search_val.date_created='';
    this.search_val.contact_number='';
    this.search_val.state='';
    this.search_val.assign_user='';

    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data2 = this.assign_login_data.data;

    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);

    let flag = 0;
    // const index = this.assign_login_data.findIndex(row => row.module_name == 'Distribution');

    // if( index == -1){
    //   flag++;
    //   const index = this.assign_login_data.findIndex(row => row.module_name == 'Distribution');
    // }

    // if(index == -1 && flag == 1){
    //   flag++;
    //   const index = this.assign_login_data.findIndex(row => row.module_name == 'Distribution');
    // }

    // if(flag == 2 || index != -1){
    //   console.log(index);

    //   if(this.assign_login_data[index].add == 'true')  {
    //     this.add=this.assign_login_data[index].add
    //   };

    //   if(this.assign_login_data[index].edit == 'true')  {
    //     this.edit=this.assign_login_data[index].edit
    //   };
    //   if(this.assign_login_data[index].delete == 'true')  {
    //     this.delete=this.assign_login_data[index].delete
    //   };

    //   console.log(this.add);
    //   console.log(this.edit);
    //   console.log(this.delete);
    // }



  }

  ngOnInit() {
    // this.search_val = this.serve.distributorListSearch
    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value.data;
    this.skelton = new Array(10);

    if(this.login_data.access_level !='1')
    {
      this.login_dr_id = this.login_data.id;
    }

    this.ActivatedRoute.params.subscribe(params => {
      console.log(params);
      this.type_id = params.id;
      this.type = params.type;
      console.log(this.type_id);
      this.distributorList();
    });

  }

  dr_count:any;
  public onDate(event): void
  {
    this.search_val.date_created=moment(event.value).format('YYYY-MM-DD');
    this.distributorList();
  }
  public onfilter(event): void
  {
    this.search_val.last_checkin=moment(event.value).format('YYYY-MM-DD');
    this.distributorList();
  }
  distributorList(action:any='')
  {
    console.log(this.search_val);
    this.distributor_list = [];


    if(this.sort.type1=='DESC'){
      this.sort.value="company_name"
      this.sort.type="DESC"

    }
    else if(this.sort.type1=='ASC'){
      this.sort.value="company_name"
      this.sort.type="ASC"
      console.log(this.sort.type)

    }
    else{
      this.sort.value="date_created"
      this.sort.type="DESC"
    }

    this.loader=true;
    this.serve.fetchData({ 'user_id': this.assign_login_data2.id, 'user_type': this.assign_login_data2.type, 'sort': this.sort, 'start': this.start,'active_tab':this.active_tab, 'pagelimit': this.page_limit, 'search': this.search_val, 'type': this.type_id,'login_user':this.login_dr_id,'for_excel':'false'},"Distributors/distributor")
    .subscribe((result=>{
      console.log(result);
      this.dr_list_temp=result['distributor']['distributor'];
      this.brand_master = result['distributor']['brand'];
      this.state_values = result['distributor']['states'];
      this.dr_count = result['distributor']['count'];
      this.all_count = result['distributor']['all_count']

      this.exp_data = result['distributor'].distributor;
      console.log( this.exp_data);
      this.total_page = Math.ceil(this.dr_count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
      this.sort.type=""
      // this.loader=false;
      this.distributor_list=(result['distributor']['distributor']);
      setTimeout (() => {
        this.loader=false;

      }, 500);
      console.log(this.distributorList.length);


      if(this.distributor_list.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;

      }
      this.serve.count_list();
    }))


    console.log(this.search_val);


  }

  upload_excel()
  {
    const dialogRef = this.alrt.open(UploadFileModalComponent,{
      width: '500px',
      data:{
        'from':'Distribution',
        'type':this.type_id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.distributorList();

    });
  }

  onScrollDown()
  {
    console.log("scrolled down");

  }
  // onUp(data)
  // {
  //   console.log(data);

  //   console.log("scrolled up");
  //   console.log(this.val);

  // }

  deleteUser(id)
  {
    this.dialog.delete('Distributor Data !').then((result) => {
      if(result){
        this.serve.fetchData({"id":id},"Distributors/distributors_delete").subscribe((result=>{
          console.log(result);
          this.refresh();
          this.distributorList('refresh');

        }))
      }})




    }
    refresh()
    {
      this.search_val={};
      this.distributorList();
    }
    userDetail(id)
    {
      console.log(id);
      // this.serve.distributorListSearch = this.search_val

      this.route.navigate(['/distribution-detail/'+id]);

    }
    // getItemsList(index,search)
    // {
    //   console.log(search);
    //   this.distributor_list=[];
    //   if(index=='created_by'){
    //     for(var i=0;i<this.dr_list_temp.length; i++)
    //     {
    //       search=search.toLowerCase();
    //       this.tmpsearch1=this.dr_list_temp[i]['created_name']['name'].toLowerCase();
    //       if(this.tmpsearch1.includes(search))
    //       {
    //         console.log(search);
    //         this.distributor_list.push(this.dr_list_temp[i]);
    //       }

    //     }
    //   }
    //   if(index!='created_by'){
    //     for(var i=0;i<this.dr_list_temp.length; i++)
    //     {
    //       search=search.toLowerCase();
    //       if(this.dr_list_temp[i][index]!=null){
    //         this.tmpsearch1=this.dr_list_temp[i][index].toLowerCase();
    //       }
    //       if(this.dr_list_temp[i][index]==null){
    //         this.tmpsearch1='';
    //       }
    //       if(this.tmpsearch1.includes(search))
    //       {
    //         console.log(search);
    //         this.distributor_list.push(this.dr_list_temp[i]);
    //       }
    //     }
    //   }
    //   console.log(this.distributor_list);
    // }
    tmpsearch1:any={};
    excel_data:any=[];
    exp_data:any=[];

    exportAsXLSX():void {
      this.exp_loader = true;
      this.serve.FileData({'user_id':this.assign_login_data2.id,'user_type': this.assign_login_data2.type,'search':this.search_val,'type':this.type_id,'login_user':this.login_dr_id,'for_excel':'true','active_tab':this.active_tab,},"Distributors/distributor")
      .subscribe(resp=>{
        console.log(resp);
        this.exp_data = resp['distributor'].distributor;
        console.log(this.exp_data);
        for(let i=0;i<this.exp_data.length;i++)
        {
          this.excel_data.push({'State ':this.exp_data[i].team_state,'Team Code ':this.exp_data[i].team_code,'Team Name':this.exp_data[i].team_name,'Employee Code':this.exp_data[i].employee_id,'Assigned Sales User ':this.exp_data[i].assign_user,'ID':this.exp_data[i].id,'Date Created':this.exp_data[i].date_created,'Company Name':this.exp_data[i].company_name,'GST':this.exp_data[i].gst,'Contact Person':this.exp_data[i].name,Mobile:this.exp_data[i].mobile,'Customer Code':this.exp_data[i].dr_code,Email:this.exp_data[i].email,'Address ':this.exp_data[i].address,' Party State ':this.exp_data[i].state,'District ':this.exp_data[i].district,'City ':this.exp_data[i].city,'Pincode ':this.exp_data[i].pincode,'Last Checkin':this.exp_data[i].last_checkin,'Beat Code':this.exp_data[i].beat_code,'Assigned Distributor Id':this.exp_data[i].assign_distributor_code,'Assigned Distributor':this.exp_data[i].assign_distributor});
        }
        this.exp_loader = false;

        this.serve.exportAsExcelFile(this.excel_data, 'DISTRIBUTOR SHEET');
        this.excel_data = [];
        this.exp_data = [];

      })


    }



    // exportAsXLSX():void {
    //   this.exp_loader = true;

    //     console.log(this.exp_data);
    //     for(let i=0;i<this.exp_data.length;i++)
    //     {
    //       this.excel_data.push({'Date Created':this.exp_data[i].date_created,'Company Name':this.exp_data[i].company_name,'GST':this.exp_data[i].gst,'Contact Person':this.exp_data[i].name,Mobile:this.exp_data[i].mobile,'Customer Code':this.exp_data[i].dr_code,Email:this.exp_data[i].email,'Address ':this.exp_data[i].address,'State ':this.exp_data[i].state,'District ':this.exp_data[i].district,'City ':this.exp_data[i].city,'Pincode ':this.exp_data[i].pincode,'Assigned Sales User ':this.exp_data[i].assign_user,' Total Primary Sale':this.exp_data[i].primary_sale.count,'Primary sale amount':this.exp_data[i].primary_sale.sum,' Total Secondary Sale':this.exp_data[i].secondary_sale.count,'Secondary sale amount':this.exp_data[i].secondary_sale.sum});
    //     }
    //     this.exp_loader = false;

    //     this.serve.exportAsExcelFile(this.excel_data, 'DISTRIBUTOR SHEET');
    //     this.excel_data = [];
    //     this.exp_data = [];

    // }


    id:any;
    state:any;
    tothepage(id,state,type){
      this.route.navigate(['/distribution-detail/'+id],{ queryParams: { state,id,type} });
      // ,{type:{{list.type}},state:{{list.state}
      //   }

    }
    userStatus(index, id,name) {
      console.log(id);
      console.log(index);

      console.log(this.distributor_list[index].checkin_active);
      this.dialog.confirm("You Want To Change Status!").then((res)=>{
        if(res){
          if (this.distributor_list[index].checkin_active == "1") {
            this.distributor_list[index].checkin_active = "0";
            console.log(this.distributor_list[index].checkin_active);
          }
          else {
            this.distributor_list[index].checkin_active = "1";
            console.log(this.distributor_list[index].checkin_active);
          }
          let value = { "checkin_active": this.distributor_list[index].checkin_active }
          this.serve.fetchData({ 'dr_id': id, 'data': value ,'uid':this.assign_login_data2.id,'uname':name}, "Lead/checkin_active")
            .subscribe(resp => {
              console.log(resp);
              this.distributorList();
            })
        }
      })
     
    }


  }
