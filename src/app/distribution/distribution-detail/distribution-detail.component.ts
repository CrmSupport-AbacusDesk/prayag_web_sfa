import { Component, OnInit, Renderer2 } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { ActivatedRoute, Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { UserEmailModalComponent } from 'src/app/user/user-email-modal/user-email-modal.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog } from '@angular/material';
import { DistributionEditComponent } from '../distribution-edit/distribution-edit.component';
import { DistributorModelComponent } from '../distributor-model/distributor-model.component';

import { sessionStorage } from 'src/app/localstorage.service';
import { AddPrimaryOrderValueComponent } from '../add-primary-order-value/add-primary-order-value.component';
import { DialogComponent } from 'src/app/dialog.component';
import { DistributionLegderModelComponent } from '../distribution-legder-model/distribution-legder-model.component';
import { DrDiscountComponent } from '../dr-discount/dr-discount.component';
import { DisOtpVarificationComponent } from '../dis-otp-varification/dis-otp-varification.component';
import * as moment from 'moment';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { DisExecutiveModelComponent } from '../dis-executive-model/dis-executive-model.component';
import { ContractorMeetStatusModalComponent } from 'src/app/contractor-meet/contractor-meet-status-modal/contractor-meet-status-modal.component';
import { Location } from '@angular/common'

@Component({
    selector: 'app-distribution-detail',
    templateUrl: './distribution-detail.component.html',
    styles: ['agm-map { height: 300px; }'],
    animations: [slideToTop()]
})
export class DistributionDetailComponent implements OnInit {
    latitude=20.5937;
    longitude=78.9629;
    mapType = 'roadmap';
    zoom=3;


    public barChartLabels: Label = [];
    public barChartData: ChartDataSets[] = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    productlist:any = [];
    brand_list1: any = [];
    temp_order: any = [];
    brand_list: any = [];
    dr_id: any;
    dr_detail: any;
    asmList: any = [];
    assignUserList: any = [];
    assignDelaerList: any = [];
    assignUser: any = [];
    assignUserId: any = [];
    userDiscountList = [];
    active: any = {};
    loader: any;
    order_data: any = [];
    login_data: any = {};
    primary_ord_data: any = [];
    order_type: any = 0;
    ledger_data: any = [];
    assignedDealers: any = []
    orderTabActive: any = {}
    count: any = [];
    orderdata: any = [];
    dashboardCounts: any = {}
    deal_list: any = [];
    today_date: any;
    assign_brand: any = [];
    totalOrders: any = {}
    orderTabCounters: any = {}
    dealersCount: any
    stockList:any;

    temp_disc: any = {};
    temp_checkin: any = {};
    tmp_userList: any = [];
    search: any = {};
    tmpsearch: any = {};
    search2: any = {};
    tmpsearch2: any = {};
    sales_executive_update: any;
    temp_dis: any;
    list: any = {};
    view_tab: any = 'profile';
    view_order: any = 'primary';
    search3: any = {};
    tmpsearch3: any = {};
    search4: any = {};
    tmpsearch4: any = {};
    rsm: any = [];
    ass_user: any = [];
    assign_dealer: any = [];
    PopData:any=[];
    tabActiveTypes: any = {};
    tabActiveType: any = {};
    contractorMeetListDetail: any = [];
    visitingCardDetail: any = [];
    data: any = [];
    secContactDetail: any = [];

    data_not_found = false;
    mode: any;
    enableInput: boolean = false;
    disableInput = true;
    showSave = false;
    showEdit = true;
    discount_list:any=[];
    userData: any;
    userId: any;
    userName: any;

    document:any=[]
    constructor(
        public route: ActivatedRoute,
        public rout: Router,
        public toast: ToastrManager,
        public serve: DatabaseService,
        public alert: DialogComponent,
        public dialog: MatDialog,
        public dialogbox:DialogComponent,
        public session: sessionStorage,
        public renderer: Renderer2,
        public location: Location,
        public alrt: DialogComponent) {

            console.log(this.route);
            console.log(this.route.queryParams['_value']);

            this.userData = JSON.parse(localStorage.getItem('st_user'));
            this.userId=this.userData['data']['id'];
            this.userName=this.userData['data']['name'];
            this.login_data = this.session.getSession();
            this.login_data = this.login_data.value;
            this.login_data = this.login_data.data;

            this.route.params.subscribe(params => {
                this.dr_id = params.id;
            });

            this.retailerDetail();
            this.ledger_list();
            // this.salesUserLIst()
            this.order_dashboard();
            // this.discount_data();

            this.today_date = moment(new Date()).format("MMM - Y");
            this.session.getSession().subscribe(resp => {
                this.login_data = resp.data;
                if (this.login_data.type == '1' && this.login_data.lead_type == 'Dr') {
                    this.renderer.addClass(document.body, 'chanel-patner');
                }
                else {
                    this.renderer.removeClass(document.body, 'chanel-patner');
                }
            })

            this.get_primary_ord();

            this.tabActive('tab1');
            this.smTabActive('tab1');
            this.smTabActive('tab5');

        }

        ngOnInit() {
            this.distributorList();
        }

        drlist: any = [];
        tmp_drlist: any = [];
        tmpsearchdr: any = {};
        ass_dist: any = [];


        distributorList() {
            this.serve.fetchData('', "Distributors/distributorsList").subscribe((result => {

                this.drlist = result;

                this.tmp_drlist = this.drlist;
                console.log(this.drlist);
            }))
        }

        getDistributorSearch(search) {
            console.log(search);

            this.drlist = [];
            for (var i = 0; i < this.tmp_drlist.length; i++) {
                search = search.toLowerCase();
                this.tmpsearchdr = this.tmp_drlist[i]['company_name'].toLowerCase();
                if (this.tmpsearchdr.includes(search)) {
                    this.drlist.push(this.tmp_drlist[i]);
                }
            }

            for (let i = 0; i < this.ass_dist.length; i++) {
                let index = this.drlist.findIndex(row => row.id == this.ass_dist[i])
                if (index != -1) {
                    this.drlist[index].check = true;
                }
            }
        }

        tabActive(tab: any) {
            this.tabActiveType = {};
            this.tabActiveType[tab] = true;
            this.retailerDetail();

        }
        smTabActive(tab: any) {
            this.tabActiveTypes = {};
            this.tabActiveTypes[tab] = true;
            this.retailerDetail();

        }
        toggleterritory(key, action) {
            if (action == 'open') { this.active[key] = true; }

            if (action == 'close') {
                this.active[key] = false;
            }
        }


        editProduct(id) {
            console.log(id);
            this.enableInput = true;
            this.showSave = true;
            this.mode = id;
            // this.editProductID = id;
            // this.showError=true;
        }

        total_discount(index)
        {
            if(this.discount_list[index].basic_discount != null && this.discount_list[index].sr_discount != null &&
                 this.discount_list[index].dd_discount  != null && this.discount_list[index].family_discount  != null && this.discount_list[index].ss_discount != null && this.discount_list[index].cd_discount != null)
            {
            this.discount_list[index].discount = (parseFloat(this.discount_list[index].basic_discount) +parseFloat(this.discount_list[index].sr_discount)+parseFloat(this.discount_list[index].dd_discount)+parseFloat(this.discount_list[index].family_discount)+parseFloat(this.discount_list[index].ss_discount)+parseFloat(this.discount_list[index].cd_discount)).toFixed(2);
            }

            console.log(this.discount_list[index]);

        }

        updateDiscount(data)
        {
            data.dr_id= this.dr_id;
            console.log(this.dr_id);

            this.serve.fetchData({data,'uid':this.userId,'uname':this.userName},"Discount/updateDiscount").subscribe((result)=>{
                console.log();
                this.discount_data()

            })

        }

        apidata: any;
        updateProductDetail(price,id)
        {
            console.log(price);
            if(price){
                // this.showError=false;
                console.log(this.mode);

                this.showSave = false;

                // this.apidata = { id: this.mode, product_mrp: price};
                console.log(this.apidata);
                this.mode = 1;
                this.serve.fetchData({ dr_id:this.route.queryParams['_value'].id,product_id:id,price:price}, "/Discount/update_price").subscribe((result) => {
                    console.log(result);
                    this.getProductList();
                    // this.data.update_multiple_product_size = '';
                    // this.data.update_multiple_product_price = ''
                });

            }

        }


        dealer_list() {
            this.loader = true;
            this.serve.fetchData({}, "Distributors/get_assign_dealer").subscribe(resp => {
                this.deal_list = resp['dealer_list'];
                this.deal_list.map(resp => {
                    this.assignDelaerList.map(row => {
                        if (row.dealer_id == resp.id) {
                            resp.check = true;
                            this.assign_dealer.push({ "id": resp.id, "company_name": resp.company_name })
                        }
                    });
                });
                this.loader = false;
            })
        }

        verify() {
            this.serve.fetchData({ "dr_id": this.dr_id }, "Distributors/verify_dealer").subscribe(resp => {
                this.toast.successToastr("Verified");
            })
        }

        getOrders(type, status) {
            var orderType
            console.log(this.dr_detail.type);



            if (type == 'pOrder') {
                orderType = 'Primary'
                if(this.dr_detail.type!='3' && status=='Dispatch' ){
                    this.orderTabActive.active = status;
                    status='Reject';
                }
                else{
                    this.orderTabActive.active = status;
                }
            }
            else {
                orderType = 'Secondary'
                if(status=='Approved' ){
                    this.orderTabActive.active = status;
                    status='Dispatch';
                }
                else{
                    this.orderTabActive.active = status;
                }
            }

            // this.orderTabActive.active = status;
            this.loader = true;

            let data = { "id": this.dr_id, 'type': orderType, 'status': status, 'search': this.search4 }
            this.serve.fetchData(data, "Distributors/getOrders").subscribe((result) => {
                this.order_data = result['data']
                this.totalOrders = result['count']
                this.orderTabCounters = result['tabCounters']

                setTimeout(() => {
                    this.loader = false;

                }, 700);

            })
        }


        state_name:any;
        type:any;

        getProductList()
        {
            this.state_name=this.route.queryParams['_value'].state,
            this.type=this.route.queryParams['_value'].type,
            this.dr_id=this.route.queryParams['_value'].id,
            console.log(this.state_name);
            console.log(this.type);
            console.log(this.dr_id);



            //    this.tab_active = type;

            this.loader=1;


            // this.serve.fetchData({filter:sendData},"Product/product_list").subscribe((result)=>{
            // this.serve.fetchData({filter:''},"Product/product_list").subscribe((result)=>{
            this.serve.fetchData({state_name:this.state_name,type:this.type,dr_id:this.dr_id},"Discount/price_list").subscribe((result)=>{



                console.log(result);


                this.productlist=result['price_list'];
                this.count=result['count'];
                //   this.scheme_active_count = result['scheme_active_count'];
                if(this.productlist.length==0)
                {
                    console.log("yes");
                }
                //   this.total_page = Math.ceil(this.count/this.page_limit);
                //   this.pagenumber = Math.ceil(this.start/this.page_limit)+1;
                //   this.tmp_productList=this.productlist;
                setTimeout (() => {
                    this.loader='';
                }, 700);
                if(this.productlist.length ==0){
                    this.data_not_found=true;
                }else{
                    this.data_not_found=false;

                }
            })
        }

        dr_type;
        retailerDetail() {
            this.loader = true;

            let id = { "id": this.dr_id }
            this.serve.fetchData(id, "Distributors/distributor_detail").subscribe((result) => {
                this.dr_detail = result['distributor_detail']['result'];
      this.document=result['distributor_detail']['result']['image']

                this.dr_type=this.dr_detail.type;
                console.log(this.dr_type);

                this.temp_order = this.order_data;
                this.assignUserList = result['distributor_detail']['result']['assign_user'];
                this.assignDelaerList = result['distributor_detail']['result']['assign_dealer'];
                this.assign_brand = result['distributor_detail']['result']['brand'];
                this.dealersCount = result['distributor_detail']['dealersCount'];
                this.assignUserId = this.assignUserList;
                this.temp_disc = this.dr_detail.discount_data;
                this.temp_checkin = this.dr_detail.checkin;
                this.contractorMeetListDetail = result['distributor_detail']['result']['contractor_meeting'];
                this.visitingCardDetail = result['distributor_detail']['result']['visiting_card_info'];
                this.PopData = result['distributor_detail']['result']['pop_gift'];
                this.secContactDetail = result['distributor_detail']['result']['contact_details'];
                console.log(this.secContactDetail.length);

                this.latitude=parseFloat(result['distributor_detail']['result']['lat']);
                this.longitude=parseFloat(result['distributor_detail']['result']['lng']);
                console.log(this.latitude);
                console.log(this.longitude);
                this.zoom=15;








                // console.log(this.visitingCardDetail);

                console.log(this.contractorMeetListDetail.length);
                console.log(this.visitingCardDetail.length);

                this.getBrandList();
                this.salesUserLIst();
                this.dealer_list();
                this.discountList();

                setTimeout(() => {
                    this.loader = false;
                }, 700);
                if(this.productlist.length ==0){
                    this.data_not_found=true;
                }else{
                    this.data_not_found=false;

                }

            })
        }

        salesUserLIst() {
            console.log("salesUserLIst method calls");

            this.asmList = [];
            this.rsm = [];
            if(this.userId !=1){
            this.serve.fetchData({"access_level":2,'state':this.dr_detail.state}, "User/sales_user_list").subscribe((result) => {
                this.asmList = result['sales_user_list'];
                this.tmp_userList = result['sales_user_list'];
                console.log(this.rsm);

                for (let i = 0; i < this.asmList.length; i++) {
                    for (let j = 0; j < this.assignUserList.length; j++) {
                        if (this.asmList[i].id == this.assignUserList[j]['sales_executive']) {
                            this.asmList[i].check = true;
                            this.rsm.push(this.asmList[i].id);

                        }
                    }

                }
                console.log(this.rsm);

        })
    }
    if(this.userId ==1){
        this.serve.fetchData({"access_level":2}, "User/sales_user_list").subscribe((result) => {
            this.asmList = result['sales_user_list'];
            this.tmp_userList = result['sales_user_list'];
            console.log(this.rsm);

            for (let i = 0; i < this.asmList.length; i++) {
                for (let j = 0; j < this.assignUserList.length; j++) {
                    if (this.asmList[i].id == this.assignUserList[j]['sales_executive']) {
                        this.asmList[i].check = true;
                        this.rsm.push(this.asmList[i].id);

                    }
                }

            }
            console.log(this.rsm);

    })
}
        }


        removeUser(index) {
            this.assignUser.splice(index, 1);
            this.assignUserId.splice(index, 1);
        }

        discountList()
        {

            this.serve.fetchData(0, "Discount/discount_list").subscribe((result => {
                this.userDiscountList = result['Discount_list']['discount_list']
            }))
        }

        discount_data()
        {

            this.serve.fetchData({dr_id:this.dr_id},"Discount/discount_data_new").subscribe((result)=>{
                console.log(result['discount_list']);

                this.discount_list = result['discount_list']

            });

        }

        editDialog(value1, value2, type) {
            const dialogRef = this.dialog.open(UserEmailModalComponent, {
                width: '450px',
                data: {
                    id: this.dr_id,
                    value1,
                    value2,
                    type
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                this.retailerDetail();

            });
        }

        getItemsList(search) {
            this.asmList = [];
            console.log(this.asmList);

            for (var i = 0; i < this.tmp_userList.length; i++) {
                search = search.toLowerCase();

                this.tmpsearch = this.tmp_userList[i]['name'].toLowerCase();
                if (this.tmpsearch.includes(search)) {
                    this.asmList.push(this.tmp_userList[i]);
                }
            }
        }

        getItemsdisc(search) {
            this.dr_detail.discount_data = [];
            for (var i = 0; i < this.temp_disc.length; i++) {
                search = search.toLowerCase();
                this.tmpsearch2 = this.temp_disc[i]['category'].toLowerCase();
                if (this.tmpsearch2.includes(search)) {
                    this.dr_detail.discount_data.push(this.temp_disc[i]);
                }
            }
        }

        editAddress(country, state, district, city, pincode,area, address,dr_type, type) {
            const dialogRef = this.dialog.open(DistributionEditComponent, {
                width: '768px',
                data: {
                    country,
                    state,
                    district,
                    city,
                    pincode,
                    area,
                    address,
                    dr_type,
                    type,
                    id: this.dr_id
                }
            });
            dialogRef.afterClosed().subscribe((result) => {
                this.retailerDetail();

            });
        }

        editDealerDistributor() {
            console.log("edit dealer distributor");


        }

        MobileNumber(event: any) {
            const pattern = /[0-9\+\-\.\ ]/;
            let inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) { event.preventDefault(); }
        }

        edit_dr_detail(company_name, dr_type, mobile, email, gst, assign_distributor, landline, name, dob, doa, password,type, target, opening_balance, whatsapp_no, username, dr_code, category_code,credit_limit) {
            console.log(company_name,dr_type,mobile);

            const dialogRef = this.dialog.open(DistributionEditComponent, {
                width: '750px',
                data: {

                    company_name,
                    mobile,
                    dr_type,
                    email,
                    gst,
                    assign_distributor,
                    landline,
                    name,
                    dob,
                    doa,
                    password,
                    username,
                    type,
                    id: this.dr_id,
                    target,
                    opening_balance,
                    ledger_length: this.ledger_data.length,
                    whatsapp_no,
                    dr_code,
                    category_code,
                    credit_limit
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                this.retailerDetail();
                this.ledger_list();
            });
        }

        add_order_value() {
            const dialogRef = this.dialog.open(AddPrimaryOrderValueComponent, {
                width: '750px',
                data: { id: this.dr_id }
            });

            dialogRef.afterClosed().subscribe(result => {
                this.get_primary_ord();
            });
        }

        get_primary_ord() {
            this.loader = 1;
            this.serve.fetchData({ 'dr_id': this.dr_id }, "Distributors/get_primary_ord").subscribe((result) => {
                this.loader = '';
                if (result) {
                    this.primary_ord_data = result['get_primary_ord'];
                }
            });
        }

        editDiscount() {
            const dialogRef = this.dialog.open(UserEmailModalComponent, {
                width: '520px',
                data: {
                    id: this.dr_id,
                    'dealer_discount': this.dr_detail.dealer_discount,
                    type: 'DealerDiscountEdit'
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                this.retailerDetail()
            });
        }

        update_assigned_sales_executive(sales_executive) {
            this.sales_executive_update = sales_executive;
        }

        update_assigned_executive(exec_id) {

            console.log(this.asmList);
            console.log(this.ass_user);
            console.log(this.rsm);

            this.ass_user =  this.rsm

            // const selectedUserId = [];

            // for (let index = 0; index < this.asmList.length; index++) {

            //     if(this.asmList[index].check == true) {

            //          selectedUserId.push(this.asmList[index].id);
            //     }
            // }

            // console.log(selectedUserId);

            this.serve.fetchData({ 'uid': this.userId, 'uname': this.userName, 'exec': this.ass_user, 'dr_id': this.dr_id }, "Distributors/update_assigned_sales_executive")
            .subscribe((result => {
                this.asmList = this.tmp_userList;
                this.asmList.map((el) => { el.check = false });

                if (this.rsm) {
                    for (var i = 0; i < this.rsm.length; i++) {
                        var index_val = this.asmList.map((el) => el.id).indexOf(this.rsm[i]);
                        console.log(index_val);

                        this.asmList[index_val].check = !this.asmList[index_val].check;
                    }
                }
                console.log(this.asmList);

                this.retailerDetail();
            }))
            this.sales_executive_update = '';
            this.rout.navigate(['/distribution-detail/' + this.dr_id]);

        }

        edit_discount(i) {
            this.active[i] = Object.assign({ 'discount': '1' });
        }

        update_discount(category, id, discount) {
            this.serve.fetchData({ 'id': this.dr_id, 'category': category, 'dis': discount }, "Distributors/update_discount")
            .subscribe((response => {
                this.active = {};
                this.retailerDetail();
            }));
        }

        related_tabs(tab) {
            this.view_tab = tab;
            this.retailerDetail();
            if(this.view_tab=='Discount'){
                this.getProductList();
                this.discount_data();
            }

            if(this.view_tab=='Stock'){
                this.getStockData();
            }


        }

        getItemscheckin(search) {
            this.dr_detail.checkin = [];
            for (var i = 0; i < this.temp_checkin.length; i++) {
                search = search.toLowerCase();
                this.tmpsearch3 = this.temp_checkin[i]['exec_name'].toLowerCase();
                if (this.tmpsearch3.includes(search)) {
                    this.dr_detail.checkin.push(this.temp_checkin[i]);
                }
            }
        }

        // product_Brandassign(value, index, event) {
        //     if (event.checked) {
        //         if (this.rsm.indexOf(this.asmList[index]['id']) === -1) {

        //             this.rsm.push(value);
        //             console.log(this.rsm);
        //         }
        //     }
        //     else {
        //         for (var j = 0; j < this.asmList.length; j++) {
        //             if (this.asmList[index]['id'] == this.rsm[j]) {
        //                 this.rsm.splice(j, 1);
        //             }
        //         }
        //         console.log(this.rsm);
        //     }
        //     this.ass_user = this.rsm

        // }

        product_Brand(value, index, event) {
            console.log(event.checked);

            if (event.checked) {
                if (this.rsm.indexOf(this.asmList[index]['id']) === -1) {
                    console.log("in check");

                    this.rsm.push(value);
                }
            }
            else {
                for (var j = 0; j < this.asmList.length; j++) {
                    console.warn(this.asmList[index]['id']);
                    console.warn(this.rsm[j]);
                    if (this.asmList[index]['id'] == this.rsm[j]) {
                        console.log("in delete");
                        this.rsm.splice(j,1);
                    }
                }
                console.log(this.rsm);
            }
            this.ass_user =  this.rsm
        }

        select_dealer(data, event) {
            if (data.check) {
                this.assign_dealer.push(data)
            }
            else {
                let index = this.assign_dealer.findIndex(row => row.id == data.id);

                this.assign_dealer.splice(index, 1);
            }
        }

        save_assign_dealer() {
            this.loader = true;
            this.serve.fetchData({ 'dealer_list': this.assign_dealer, 'dr_id': this.dr_id }, "Distributors/assign_dealer")
            .subscribe((result => {
                if (result['msg'] == 'success') {
                    this.active.dealer = false;
                    this.retailerDetail();
                    this.loader = false;
                    this.toast.successToastr("Dealers Updated");
                }
            }))
        }

        brand1: any = [];
        product_Brand1(value, index, event) {
            if (event.checked) {
                this.brand1.push(value);
                this.serve.fetchData({ 'brand': this.brand1, 'dr_id': this.dr_id }, "Distributors/dr_brand_update").subscribe((result => {
                    this.toast.successToastr("Brands Updated");
                }))
            }
            else {
                for (var j = 0; j < this.brand_list1.length; j++) {
                    if (this.brand_list1[index].brand_name == this.brand1[j]) {
                        this.brand1.splice(j, 1);
                        this.serve.fetchData({ 'brand': this.brand1, 'dr_id': this.dr_id }, "Distributors/dr_brand_update").subscribe((result => {
                            this.toast.successToastr("Brands Updated");
                        }))
                    }
                }
            }
        }

        getBrandList() {
            this.serve.fetchData(0, "/Product/product_brand_list/").subscribe((result) => {
                this.brand_list1 = result;

                for (let i = 0; i < this.brand_list1.length; i++) {
                    for (let j = 0; j < this.assign_brand.length; j++) {
                        if (this.brand_list1[i].brand_name == this.assign_brand[j]['brand']) {
                            this.brand_list1[i].check = true;
                            this.brand1.push(this.brand_list1[i].brand_name);
                        }
                    }
                }
            });
        }

        convert_dr(type) {
            this.alert.confirm("Convert").then((result) => {
                if (result) {
                    this.serve.fetchData({ type: type, dr_id: this.dr_id }, "Category_master/sendOtp").subscribe((result => {
                        const dialogRef = this.dialog.open(DisOtpVarificationComponent, {
                            width: '350px',
                            data: {
                                id: this.dr_id,
                                type: type,
                                otp: result
                            }
                        });
                        dialogRef.afterClosed().subscribe(result => {

                        });
                    }))

                }
            });

        }

        deleteOrder(id, i) {
            this.alrt.delete('Order Data').then((result) => {
                if (result) {
                    this.serve.fetchData({ id }, "order/directOrderdelete").subscribe((response) => {
                        if (response) {
                            this.primary_ord_data.splice(i, 1);
                            this.get_primary_ord();
                        }

                    })
                }

            });

        }

        add_ledger(type) {
            const dialogRef = this.dialog.open(DistributionLegderModelComponent, {
                width: '520px',
                data: {
                    id: this.dr_id,
                    type
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                this.ledger_list();

            });
        }

        ledger_list() {
            this.serve.fetchData({ dr_id: this.dr_id }, "DistributionNetwork/ledger_list").subscribe((result) => {
                this.ledger_data = result['ledger_list'];
            });
        }

        deleteUser(id) {
            this.alrt.delete('Ledger Data !').then((result) => {
                if (result) {
                    this.serve.fetchData({ id: id, dr_id: this.dr_id }, "DistributionNetwork/delete_ledger").subscribe((result) => {
                        this.ledger_list();
                        this.retailerDetail();
                    });
                }
            })
        }

        delete_cp_order(order_id) {
            this.alrt.delete('Order Data').then((result) => {
                if (result) {
                    this.serve.fetchData({ order_id: order_id }, "Order/delete_channel_partner_ord").subscribe((result) => {
                        this.ledger_list();
                        this.retailerDetail();
                    });
                }

            });
        }

        getDealersData() {
            this.loader = true;

            this.serve.fetchData({ id: this.dr_id }, "Distributors/getDealersData").subscribe((result) => {
                this.assignedDealers = result['dr_list']
                this.loader = false;

            }, err => {
                this.loader = false;
            });
        }

        assignedExecutives: any = []
        getExecutivesData() {
            this.loader = true;

            this.serve.fetchData({ id: this.dr_id }, "Distributors/getExecutivesData").subscribe((result) => {
                this.assignedExecutives = result['user']
                this.loader = false;

            }, err => {
                this.loader = false;
            });
        }

        disExecutive(type, userId) {
            const dialogRef = this.dialog.open(DisExecutiveModelComponent, {
                width: '800px',
                data: { type: type, userId: userId }
            });
            dialogRef.afterClosed().subscribe(result => {
                this.getExecutivesData();
            });
        }

        openDiscountModal(dealerId) {
            const dialogRef = this.dialog.open(DrDiscountComponent, {
                width: '800px',
                data: {
                    dealerId: dealerId
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                this.getDealersData()
            });
        }


        order_dashboard() {
            this.serve.fetchData({ id: this.dr_id }, "Order/dashboard_order_dr").subscribe((result => {
                console.log(result);
                this.orderdata = result;

                this.order_data.cat = this.orderdata.cat.slice(1, 2, 3, 4, 5, 6, 7, 8, 9);
                this.order_data.amount = this.orderdata.amount.slice(1, 2, 3, 4, 5, 6, 7, 8, 9);

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

        public barChartOptions: ChartOptions =
        {
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
            const data = [Math.round(Math.random() * 100), 59, 80, (Math.random() * 100), 56, (Math.random() * 100), 40];
            this.barChartData[0].data = data;
        }

        count_data() {
            this.serve.fetchData({ id: this.dr_id }, "Distributors/count_data_dr").subscribe((result => {
                this.dashboardCounts = result;

                //   this.user_filter();

            }))
        }

        statusModal() {
            const dialogRef = this.dialog.open(ContractorMeetStatusModalComponent, {
                width: '400px',
                data: {

                }
            });
            dialogRef.afterClosed().subscribe(result => {
            });
        }



        editcontactPerson(type) {
            const dialogRef = this.dialog.open(DistributorModelComponent, {
                width: '1000px',
                data: {
                    id: this.dr_id,
                    type,
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                this.retailerDetail();
                this.ledger_list();
            });
        }


        updateSecContact(empData,type){
            console.log(empData);
            const dialogRef = this.dialog.open(DistributorModelComponent, {
                width: '750px',
                data: {
                    id: this.dr_id,
                    updateData:empData,
                    type,
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                this.retailerDetail();
                this.ledger_list();
            });
        }

        deleteSecContact(id){

            console.log(id);

            this.dialogbox.delete('Contact Data !').then((result) => {
                if(result){
                    this.serve.fetchData({"id": id}, "Distributors/distributors_contact_delete").subscribe((result => {
                    }))
                    this.retailerDetail();
                    this.ledger_list();
                }
            })
        }


        update_google_location(country, state, district, city, pincode , address, type){

            console.log(type);
            const dialogRef = this.dialog.open(DistributorModelComponent, {
                width:'500px',
                data: {
                    id: this.dr_id,
                    country,
                    state,
                    district,
                    city,
                    pincode,
                    address,
                    type,
                }
            });

            dialogRef.afterClosed().subscribe(latlong => {
                console.log(latlong);
                this.retailerDetail();
                this.ledger_list();

            })
        }


        getStockData(){
            console.log("stock function call");
            this.serve.fetchData({"id": this.dr_id}, "Distributors/stockData").subscribe((result => {
                this.stockList = result['stock'];
            }))

        }


        back(): void {
            console.log("location back method calss");
            console.log(this.location);
            this.location.back()
        }









    }
