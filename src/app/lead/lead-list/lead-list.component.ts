import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import * as moment from 'moment';
import { sessionStorage } from 'src/app/localstorage.service';
import { UploadFileModalComponent } from 'src/app/upload-file-modal/upload-file-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  animations: [slideToTop()]


})
export class LeadListComponent implements OnInit {

  lead_List:any=[];
  leadtmp:any=[];
  start:any=0;
  count:any;
  total_page:any;
  pagenumber:any;
  page_limit:any=20
  type_id:any = 1;
  loader:any;
  data:any=[];
  value:any={};
  data_not_found=false;
  search_val:any={}
  sort:any={}
  type:any;
  skelton:any={}
  today_date:any;
  tmpsearch1:any={};
  excelType:string= '';
  excel_data:any=[];
  active_tab: any = 'Lead Bank';
  count_list:any={};
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  login_data: any = {};
  login_data5: any = {};
  add: any = {};

  delete: any = {};

  edit: any = {};
  state_list:any=[]
  state:any=[]

  // login_data: any = {};


  constructor(public serve:DatabaseService,public dialog:DialogComponent, public alrt:MatDialog,public router: Router, public route: ActivatedRoute,public session: sessionStorage ) {

    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value;
    this.login_data5 = this.login_data.data;

    console.log(this.login_data);

    this.login_data = this.login_data.assignModule;
    console.log(this.login_data);

    let flag = 0;
    const index = this.login_data.findIndex(row => row.module_name == 'Lead');
    // if(this.login_data[index].add == 'true')  {
    //   this.add=this.login_data[index].add
    // };

    // if(this.login_data[index].edit == 'true')  {
    //   this.edit=this.login_data[index].edit
    // };
    // if(this.login_data[index].delete == 'true')  {
    //   this.delete=this.login_data[index].delete
    // }
    // console.log(this.add)
    // console.log(this.edit)

    // console.log(this.delete)

    // if( index == -1){
    //   flag++;
    //   const index = this.login_data.findIndex(row => row.module_name == 'Lead Direct Dealer');
    // }

    // if(index == -1 && flag == 1){
    //   flag++;
    //   const index = this.login_data.findIndex(row => row.module_name == 'Lead Project');
    // }

    // if(index == -1 && flag == 2){
    //   flag++;
    //   const index = this.login_data.findIndex(row => row.module_name == 'Lead End users');
    // }

    // if(index == -1 && flag == 3){
    //   const index = this.login_data.findIndex(row => row.module_name == 'lead Others');
    // }








    this.route.params.subscribe( params => {
      this.today_date = new Date().toISOString().slice(0, 10);
      console.log(params);
      this.type_id = params.id;
      this.type = params.type;
      console.log(this.type);
      
      console.log(this.type_id);
      this.search_val.date_created='';
      this.search_val.created_by='';
      this.search_val.company_name='';
      this.search_val.assign_user='';
      this.leadList();
    });



    this.leadList();

    this.skelton = new Array(10);
  }

  ngOnInit() {
    this.getStateList()
  }
  public onDate(event): void
  {
    this.search_val.date_created=moment(event.value).format('YYYY-MM-DD');
    this.search_val.modified_date=moment(event.value).format('YYYY-MM-DD');

    this.leadList();
  }
  public onfilter(event): void
  {
    this.search_val.last_checkin=moment(event.value).format('YYYY-MM-DD');
    // this.search_val.modified_date=moment(event.value).format('YYYY-MM-DD');

    this.leadList();
  }
  leadList()
  {
    console.log("lead list function call");
    console.log(this.login_data5);

    this.loader=true;
    this.lead_List = [];
    this.add={}
    this.edit={}
    this.delete={}
    if(this.sort.type1=='DESC'){
      this.sort.value="company_name"
      this.sort.type=="DESC"

    }
    else if(this.sort.type1=='ASC'){
      this.sort.value="company_name"
      this.sort.type=="ASC"

    }
    else{
      this.sort.value="date_created"
      this.sort.type="DESC"
    }
    if(this.search_val.modified_date){
      this.search_val.modified_date=moment(this.search_val.modified_date).format('YYYY-MM-DD');

    }
    this.serve.fetchData({ 'sort': this.sort, 'user_id': this.login_data5.id, 'start': this.start, 'pagelimit': this.page_limit, 'search': this.search_val, user_type: this.login_data5.type, 'active_tab':this.active_tab,'type_id':this.type_id},"Lead/getLeadList")
    .subscribe((result=>{
      console.log(result);
      this.count=result['count'];
      this.total_page = Math.ceil(this.count/this.page_limit);
      this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
      this.lead_List= result['lead_list'];
      this.count_list=result['all_count'];
      console.log(this.count_list);
      this.sort.type=""

      console.log(this.add);
      console.log(this.edit);
      console.log(this.delete);
      this.leadtmp=result['lead_list'];
      console.log(this.lead_List);
      // this.count=result['lead_list']['count'];

      setTimeout (() => {
        this.loader=false;

      }, 700);
      if(this.lead_List.length ==0){
        this.data_not_found=true;
      }else{
        this.data_not_found=false;

      }
      this.serve.count_list();

    }))

  }
  upload_excel()
  {
    const dialogRef = this.alrt.open(UploadFileModalComponent,{
      width: '500px',
      data:{
        'from':'lead',
        'type':this.type_id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.leadList();

    });
  }
  getStateList() {
    console.log("addUser");
    this.serve.fetchData(0, "User/state_user_list").subscribe((response => {
      console.log(response);
      this.state = response['query'];
      this.state_list = this.state['state_name'];
      console.log(this.state_list);

    }));

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
            this.leadList();
          }
        }))
      }})

    }

    refresh()
    {
      this.search_val={};
      this.leadList();
    }
    getItemsList(index,search)
    {
      console.log(search);
      this.lead_List=[];


      if(index=='created_by'){
        for(var i=0;i<this.leadtmp.length; i++)
        {
          search=search.toLowerCase();
          this.tmpsearch1=this.leadtmp[i]['created_name']['name'].toLowerCase();
          if(this.tmpsearch1.includes(search))
          {
            // console.log(this.orderlist);
            console.log(search);


            this.lead_List.push(this.leadtmp[i]);
          }

        }
      }
      if(index!='created_by'){
        for(var i=0;i<this.leadtmp.length; i++)
        {
          search=search.toLowerCase();
          if(this.leadtmp[i][index]!=null){
            this.tmpsearch1=this.leadtmp[i][index].toLowerCase();

          }
          if(this.leadtmp[i][index]==null){
            this.tmpsearch1='';

          }
          if(this.tmpsearch1.includes(search))
          {
            // console.log(this.orderlist);
            console.log(search);

            this.lead_List.push(this.leadtmp[i]);
          }

        }
      }


      console.log(this.lead_List);

    }


    exp_data:any=[];

    exportAsXLSX():void {
      this.serve.FileData({'user_id':this.login_data5.id,'search':this.search_val, 'active_tab':this.active_tab,'type_id':this.type_id},"Lead/getLeadList")
      .subscribe(resp=>{
        console.log(resp);
        this.exp_data = resp['lead_list'];
        console.log(this.exp_data);
        for(let i=0;i<this.exp_data.length;i++)
        {
          this.excel_data.push({'ID':this.exp_data[i].id,'Company Name':this.exp_data[i].company_name,'Source':this.exp_data[i].source,'Contact Person':this.exp_data[i].name,Mobile:this.exp_data[i].mobile,'WhatsApp No.':this.exp_data[i].whatsapp_no,Email:this.exp_data[i].email,'Address ':this.exp_data[i].address,'State ':this.exp_data[i].state,'District ':this.exp_data[i].district,'City ':this.exp_data[i].city,'Pincode ':this.exp_data[i].pincode,'Last Checkin':this.exp_data[i].last_checkin,'Assigned Sales User':this.exp_data[i].assigned_to && this.exp_data[i].assigned_to !=''? this.exp_data[i].assigned_to : '-','Description':this.exp_data[i].description});
        }

        this.serve.exportAsExcelFile(this.excel_data, 'DISTRIBUTOR SHEET');
        this.excel_data = [];
        this.exp_data = [];

      })


    }

    change_date_filter(type): void
    {

      console.log('change_date_filter method calls');
      console.log(type);

      if(type == 'date_from'){
        this.search_val.date_from=moment(this.search_val.date_from).format('YYYY-MM-DD');
        console.log(this.search_val);
        this.leadList()
      }

      else if(type == 'date_to'){
        this.search_val.date_to=moment(this.search_val.date_to).format('YYYY-MM-DD');
        console.log(this.search_val);
        this.leadList()
      }
      else{
        console.log(this.search_val);
      }


    }


    related_tabs(tab) {
      this.active_tab = tab;
      console.log(this.active_tab);

    }

    userStatus(index, id,name) {
      console.log(id);
      console.log(index);

      console.log(this.lead_List[index].checkin_active);
      this.dialog.confirm('You Want To Change Status').then((result)=>{
        if(result){
          if (this.lead_List[index].checkin_active == "1") {
            this.lead_List[index].checkin_active = "0";
            console.log(this.lead_List[index].checkin_active);
          }
          else {
            this.lead_List[index].checkin_active = "1";
            console.log(this.lead_List[index].checkin_active);
          }
          let value = { "checkin_active": this.lead_List[index].checkin_active }
          this.serve.fetchData({ 'dr_id': id, 'data': value ,'uid':this.login_data5.id,'uname':name}, "Lead/checkin_active")
            .subscribe(resp => {
              console.log(resp);
              this.leadList()
    
            })
        }
       
      })
   
    }

  }
