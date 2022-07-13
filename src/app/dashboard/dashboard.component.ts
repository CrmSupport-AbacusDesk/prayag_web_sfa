import { Component, OnInit, Renderer2 } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService'
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../dialog.component';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
// import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import { Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { sessionStorage } from '../localstorage.service';
// import * as CanvasJS from './canvasjs.min';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  count:any={};
  orderdata:any=[];
  top_cards:any;
  latest_orders:any;
  latest_checkin:any;
  exec_Info:any;
  counter_Info:any;
  lead_network:any=[];
  today_date:any;
  customer_Info:any=[]
  id:any;
  public barChartLabels: Label = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];
  login_data:any={};
  public barChartData: ChartDataSets[] = [];
  exec_Info_month: any;
  checkin_network:any=[];
  travel_network:any=[];



  // this.order_dashboard();

  constructor(public serve:DatabaseService,public dialog: MatDialog ,public route: Router,private renderer: Renderer2,public session:sessionStorage) {
    // this.order_dashboard();
    // this.latestOrders();
    // this.latestCheckin();
    // this.salesExecDetail();
    // this.countersInfo();

    this.today_date = moment(new Date()).format("MMM - Y");

  }

  ngOnInit() {
    this.session.getSession()
    .subscribe(resp=>{
      console.log(resp);
      this.login_data = resp.data;
      console.log(this.login_data);
this.id=this.login_data.id
console.log(this.id);

      if(this.login_data.type == '1' && this.login_data.lead_type == 'Dr' )
      {
        this.renderer.addClass(document.body, 'chanel-patner');
      }
      else
      {
        this.renderer.removeClass(document.body, 'chanel-patner');
      }
    })

    // let chart = new CanvasJS.Chart("chartContainer", {
    //   animationEnabled: true,
    //   exportEnabled: true,
    //   title: {
    //     text: "Basic Column Chart in Angular"
    //   },
    //   data: [{
    //     type: "column",
    //     dataPoints: [
    //       { y: 71, label: "Apple" },
    //       { y: 55, label: "Mango" },
    //       { y: 50, label: "Orange" },
    //       { y: 65, label: "Banana" },
    //       { y: 95, label: "Pineapple" },
    //       { y: 68, label: "Pears" },
    //       { y: 28, label: "Grapes" },
    //       { y: 34, label: "Lychee" },
    //       { y: 14, label: "Jackfruit" }
    //     ]
    //   }]
    // });

    // chart.render();
    this.count_data();
    this.order_dashboard();
    this.latesttravelplan();
    this.latestCheckin();
    this.customernetwork();

    this.countersInfo();
  }



  status:boolean = false;
  toggleDropdown() {
    this.status = !this.status;

    if(this.status) {
      this.renderer.addClass(event.target, 'active');
      this.renderer.removeClass(document.body, 'active');
    }
    else {
      this.renderer.removeClass(event.target, 'active');
      // this.renderer.removeClass(document.body, 'active');
    }
  }

  toggleHeader() {
    console.log(this.status);
    this.status = !this.status;
    if(!this.status) {
      this.renderer.addClass(document.body, 'nav-active');
    }
    else {
      this.renderer.removeClass(document.body, 'nav-active');
    }
  }

  status1:boolean = false;
  toggleNav() {
    this.status1 = !this.status1;
    if(this.status1) {
      this.renderer.addClass(document.body, 'active');
    }
    else {
      this.renderer.removeClass(document.body, 'active');
    }
  }

  count_data()
  {
    console.log('test');
    console.log(this.login_data);
this.id=this.login_data.id

    this.serve.fetchData({'user_id':this.login_data.id},"Dashboard/dashboardDataCount").subscribe((result=>{
      console.log(result);
      this.top_cards=result;

      console.log(this.count);

      // this.user_filter();

    }))
  }
  latesttravelplan()
  {
    console.log('test');
    console.log(this.login_data);
this.id=this.login_data.id

    this.serve.fetchData({'user_id':this.login_data.id},"Dashboard/latest_orders").subscribe((result=>{
      console.log(result);
      this.latest_orders=result['latest_orders'];

      console.log(this.count);

      // this.user_filter();

    }))
  }

  tmp:any=[];
  user_list:any=[];
  user_filter(){

    console.log(this.count);
    for(let i=0;i<this.count['user_data'].length;i++){
      this.tmp=this.count.user_data[i]['user_type'];

      if(this.tmp.includes('MARKET') || this.tmp.includes('Market'))
      {
        this.user_list.push(this.count.user_data[i]);
      }
    }
  }
  order_data:any=[];
  order_dashboard(){
    console.log('test');
    this.serve.fetchData({},"Order/dashboard_order").subscribe((result=>{
      console.log(result);
      this.orderdata=result;
      //       console.log(this.orderdata);
      // for(let i =0;i<10;i++){
      // this.order_data.cat.i=this.orderdata.cat.i;
      // this.order_data.amount.i=this.orderdata.amount.i;
      // }
      //       console.log(this.order_data);
      this.order_data.cat=this.orderdata.cat.slice(1,2,3,4,5,6,7,8,9);
      this.order_data.amount=this.orderdata.amount.slice(1,2,3,4,5,6,7,8,9);
      console.log(this.order_data);



      this.barChartLabels = this.orderdata.cat;
      this.barChartType = 'bar';
      this.barChartLegend = true;
      // public barChartPlugins = [pluginDataLabels];

      this.barChartData = [
        { data: this.orderdata.amount, label: 'Order Value' },
        // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
      ];

    }))
  }


  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };




  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];


      this.barChartData[0].data = data;
    }

    formatTime(time){
      var parts = time.split(':');
      var time_ = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
      return new Date(time_ || 'h:mm a');
    }

    // ----------------------------------



    // latestOrders(){
    //   this.serve.fetchData({'login_id':this.login_data.id},"Dashboard/latest_orders").subscribe((result=>{
    //     console.log(result);
    //     this.latest_orders=result['latest_orders'];
    //     console.log(this.latest_orders);


    //   }))
    // }

    latestCheckin(){
      this.serve.fetchData({'user_id':this.login_data.id},"Dashboard/latest_checking").subscribe((result=>{
        console.log(result);
        this.latest_checkin=result['latest_checking'];
        console.log(this.latest_checkin);


      }))
    }

    customernetwork(){
      this.serve.fetchData({'user_id':this.login_data.id,'user_type':this.login_data.type},"Dashboard/dashboardDataNew").subscribe((result=>{
        console.log(result);
        this.customer_Info=result['customer_list'];
        console.log(this.customer_Info);
        this.lead_network = result['lead_list'];
        console.log(this.lead_network);
        this.checkin_network = result['checkin_list'];
        this.travel_network = result['travel_list'];





      }))
    }

   
    countersInfo(){
      this.serve.fetchData({'user_id':this.login_data.id},"Dashboard/info").subscribe((result=>{
        console.log(result);
        this.counter_Info=result['info'];
        console.log( this.counter_Info);


      }))
    }
    openorder(){
    this.route.navigate(['/order-list']);


    }
    opentravel(){
    this.route.navigate(['/travel-list']);

    }
    openexpense(){
    this.route.navigate(['/expense-list']);


    }
    openleaves(){
    this.route.navigate(['/leave-list']);


    }
    openevents(){
    this.route.navigate(['/contractor-meet']);



    }
    openquatation(){
    this.route.navigate(['/quotation']);


    }
    openfollowup(){
    this.route.navigate(['/followup-list']);


    }
    oporder(){
    this.route.navigate(['/order-list']);

    }
    opsecorder(){
    this.route.navigate(['/secondary-order-list']);


    }



  }
