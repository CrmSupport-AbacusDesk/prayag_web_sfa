import {  Component,  Inject,  OnInit} from '@angular/core';
import {  MatDialog,  MAT_DIALOG_DATA} from '@angular/material';
import {  FormControl } from '@angular/forms';
import {  DialogComponent} from 'src/app/dialog.component';
import {  DatabaseService} from 'src/_services/DatabaseService';
import {  sessionStorage} from 'src/app/localstorage.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-quotation-add',
  templateUrl: './quotation-add.component.html',
  styleUrls: ['./quotation-add.component.scss']
})
export class QuotationAddComponent implements OnInit {
  search:any={};
  today_date: any;
  selected_dr_type_id:any;
  selected_dr_type:any;
  dr_lead_name:any;
  data: any = {};
  lead_List:any;
  productlist: any;
  paraflexBillingAddress:any;
  selectedparaflexBillingAddressID:any;
  selectedparaflexBillingAddressDetail:any;
  c_shipping_addr:any;
  c_billing_addr:any;
  discount_percent1:any
  noparaflexBillingAddress:boolean=false;
  size_List:any;
  noLead:boolean=false;
  noProduct:boolean=false;
  noSize:boolean=false;
  productName:any;
  productCode:any;
  updated:any = "no";
  quotationData:any = [];
  quotationDataErr:boolean=false;
  termsNcondition='';
  grandTotal=0;
  totalSub_total=0;
  totalGST_total=0;
  totaldiscount_amount=0
  totalQty=0;
  logIN_user=0;
  drId=0;
  userId:any;
  userName:any;
  userData:any;
  category_list:any=[];
  login_data:any={}
  editorConfig = {
    editable: true,
    spellcheck: false,
    height: '10rem',
    minHeight: '5rem',
    placeholder: '',
    translate: 'no',
    "toolbar": [
      ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
      ["fontName", "fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
      ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
      ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],

    ]
  };


  constructor(public serve: DatabaseService, public Toastr: ToastrManager,public rout: Router, public session: sessionStorage, public dialog: MatDialog, public dialog1: DialogComponent)
  {
    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value;
    this.login_data = this.login_data.data;
    console.log(this.login_data);
    this.today_date = new Date().toISOString().slice(0, 10);
    this.logIN_user = JSON.parse(localStorage.getItem('st_user'));
    this.userData = JSON.parse(localStorage.getItem('st_user'));
    this.userId=this.userData['data']['id'];
    this.userName=this.userData['data']['name'];
    this.get_category_list();

    this.termsNcondition =  `<p>1.Total Amount will be paid by CHQ / RTGS /NEFT</p>
      <p>2.Taxes: GST 18% is including on net billed (as per actual).</p>
      <p>3.100 % amount needs to be paid in advance at the time of Poraise.</p>
      <p>4.Any discount or offers valid till 5 days post final quotation.</p>
      <p>5.Supply of order will depend on the quantity.</p>
      <p>6.TransportationCharges extra.</p>
      <p>7.After the material is ready, the client has to take his material within 30days.</p>
      <p>8.After 30 days Company will charge 2% storage penalty as per actual billed also company will not take any responsibility for any material damages</p>`


  }

  ngOnInit() {
  }

  getLeadList()
  {

    if(this.selected_dr_type_id == '1'){
      this.selected_dr_type = 'Distributor'
    }
    else if(this.selected_dr_type_id == '7'){
      this.selected_dr_type = 'Direct Dealer'

    }
    else if(this.selected_dr_type_id == '3'){
      this.selected_dr_type = 'Retailer'

    }
    else if(this.selected_dr_type_id == '9'){
      this.selected_dr_type = 'Project'

    }
    else if(this.selected_dr_type_id == '5'){
      this.selected_dr_type = 'End user'

    }
    // else if(this.selected_dr_type_id == '10'){
    //   this.selected_dr_type = 'Contractor'

    // }
    // else if(this.selected_dr_type_id == '15'){
    //   this.selected_dr_type = 'Customer'
    // }
    // else if(this.selected_dr_type_id == '13'){
    //   this.selected_dr_type = 'Builder'
    // }
    // else if(this.selected_dr_type_id == '14'){
    //   this.selected_dr_type = 'Cement Dealer'
    // }
    // else if(this.selected_dr_type_id == '11'){
    //   this.selected_dr_type = 'Architect'
    // }

    else{
      this.selected_dr_type = 'Others'

    }



    this.serve.fetchData({'type_id':this.selected_dr_type_id,'user_id':this.login_data.id},"Lead/getLeadList")
    .subscribe((result=>{
      console.log(result);
      this.lead_List= result['lead_list'];
      console.log(this.lead_List);
      if(this.lead_List.length == 0){
        this.noLead=true;
      }
      else {
        this.noLead=false;
      }
    }))

  }
  temp_product:any=[]
  getProducts(product_search)
  {
    console.log(product_search);

    this.serve.fetchData({'category':this.data.category }, "Product/product_list").subscribe((result) => {
      console.log(result);
      this.productlist = result['product_list'];
      this.temp_product=result['product_list'];
      if (this.productlist.length == 0) {
        this.noProduct=true;
      }
      else {
        this.noProduct=false;
      }
    })
  }

  get_category_list()
  {
    this.serve.fetchData({ }, "Product/categoryList").subscribe((result) => {
      console.log(result);

      this.category_list=result;
      console.log( this.category_list);

    })
  }

  getSize()
  {
    this.data.productSize = null
    if(this.data.Product){
      let filterData= this.productlist.filter(row=>row.id == this.data.Product);
      console.log(filterData);
      for(let i = 0;i< filterData[0].multi_products.length ; i++){
        this.size_List=filterData[0].multi_products;
      }
      console.log(this.size_List);
    }
  }

  conInt(val)
  {
    return parseInt(val)
  }
  conFloat(val)
  {
    return parseFloat(val)
  }
  itemadd(discount_percent1){

  }
  addToList()
  {
    console.log(this.data.discount_percent);

    if(this.data.discount_percent==undefined||this.data.discount_percent==''){
      this.data.discount_percent=0;
    console.log(this.data.discount_percent);

    }
    console.log(this.data.discount_percent);

    let flag=0;
    this.data.productName = this.productName;
    this.data.product_code = this.productCode;
    this.data.discount_amount0=(parseFloat(this.data.amount)*parseFloat(this.data.basic_discount_percent))/100


    this.data.discounted_amount=parseFloat(this.data.amount) - parseFloat(this.data.discount_amount0);

    this.data.discount_amount1=(parseFloat(this.data.discounted_amount)*parseFloat(this.data.sd_discount_percent))/100
    this.data.discounted_amount1=parseFloat(this.data.discounted_amount) - parseFloat(this.data.discount_amount1);

    this.data.discount_amount2=(parseFloat(this.data.discounted_amount1)*parseFloat(this.data.cd_discount_percent))/100
    this.data.discounted_amount2=parseFloat(this.data.discounted_amount1) - parseFloat(this.data.discount_amount2);

    this.data.discount_amount3=(parseFloat(this.data.discounted_amount2)*parseFloat(this.data.other_discount_percent))/100
    this.data.discounted_amount3=parseFloat(this.data.discounted_amount2) - parseFloat(this.data.discount_amount3);
    this.data.discount_amount=(parseFloat(this.data.discounted_amount3)).toFixed(2);

    this.data.gst=((parseFloat(this.data.discounted_amount3)*parseFloat(this.data.gstPercentage))/100).toFixed(2);
    // this.data.gst=this.data.gst.toFixed(2);
    this.data.total_amount =( parseFloat(this.data.discounted_amount3) + parseFloat(this.data.gst)).toFixed(2) ;

    console.log(this.data);


    for(let i=0 ;i<this.quotationData.length ;i++){

      if((this.data.Product == this.quotationData[i].Product)){
        this.Toastr.errorToastr("Product Already Added");
this.quotationData.pop(this.data);
this.data=''
return;

        // flag++;
        // console.log(flag);
        // this.quotationData[i].qty=parseInt(this.quotationData[i].qty)+parseInt(this.data.qty);
        // this.quotationData[i].price=parseFloat(this.data.price);
        // this.quotationData[i].amount=parseFloat(this.quotationData[i].price)*parseInt(this.quotationData[i].qty);
        // this.quotationData[i].discount_amount=(parseFloat(this.quotationData[i].amount)*parseFloat(this.quotationData[i].discount_percent))/100
        // this.quotationData[i].discounted_amount=parseFloat(this.quotationData[i].amount) - parseFloat(this.quotationData[i].discount_amount);
        // this.quotationData[i].gst=(parseFloat(this.quotationData[i].discounted_amount)*parseFloat(this.quotationData[i].gstPercentage))/100;
        // this.quotationData[i].total_amount=parseFloat(this.quotationData[i].gst)+parseFloat(this.quotationData[i].discounted_amount);
      }

    }

    if(flag==0 ){
      this.quotationData.push(this.data);
    }

    console.log(this.quotationData);
    this.totalQty=0;
    this.grandTotal=0;
    this.totaldiscount_amount=0;
    this.totalSub_total=0;
    this.totalGST_total=0;

    for(let i=0 ;i<this.quotationData.length ;i++)
    {
      this.totalQty=parseInt(this.quotationData[i].qty) + this.totalQty;
      this.grandTotal=parseFloat(this.quotationData[i].total_amount) + this.grandTotal;
      this.totalSub_total=parseFloat(this.quotationData[i].amount) + this.totalSub_total;
      this.totaldiscount_amount=parseFloat(this.quotationData[i].discount_amount) + this.totaldiscount_amount;
      this.totalGST_total=parseFloat(this.quotationData[i].gst) + this.totalGST_total;

    }
    this.data = {};
    console.log(this.data);

  }



  deleteQuotationDetail(arrayIndex) {

    if (this.quotationData.length < 2) {
      this.quotationDataErr = true;
    }
    console.log(arrayIndex);
    this.quotationData.splice(arrayIndex, 1);
    console.log(this.quotationData);

    this.totalQty=0;
    this.grandTotal=0;
    this.totalSub_total=0;
    this.totalGST_total=0;
    this.totaldiscount_amount=0;

    for(let i=0 ;i<this.quotationData.length ;i++)
    {
      this.totalQty=parseInt(this.quotationData[i].qty) + this.totalQty;
      this.grandTotal=parseFloat(this.quotationData[i].total_amount) + this.grandTotal;
      this.totalSub_total=parseFloat(this.quotationData[i].amount) + this.totalSub_total;
      this.totalGST_total=parseFloat(this.quotationData[i].gst) + this.totalGST_total;
      this.totaldiscount_amount=parseFloat(this.quotationData[i].discount_amount) + this.totaldiscount_amount;
    }

  }


  saveQuotation()
  {

    if (this.quotationData.length < 1) {
      this.quotationDataErr = true;
    }

    else{

      this.totalQty=0;
      this.grandTotal=0;
      this.totalSub_total=0;
      this.totalGST_total=0;
      this.totaldiscount_amount=0
      for(let i=0 ;i<this.quotationData.length ;i++)
      {
        this.totalQty=parseInt(this.quotationData[i].qty) + this.totalQty;
        this.grandTotal=parseFloat(this.quotationData[i].total_amount) + this.grandTotal;
        this.totalSub_total=parseFloat(this.quotationData[i].amount) + this.totalSub_total;
        this.totalGST_total=parseFloat(this.quotationData[i].gst) + this.totalGST_total;
        this.totaldiscount_amount=parseFloat(this.quotationData[i].discount_amount) + this.totaldiscount_amount;

      }

      this.serve.fetchData({'total_qty' : this.totalQty,'grand_total':this.grandTotal,'gst_amount':this.totalGST_total,'total_amount':this.totalSub_total,'total_discount':this.totaldiscount_amount,'term_condition':this.termsNcondition,'dr_name':this.dr_lead_name,'type':this.selected_dr_type,'drId':this.drId,'uid':this.userId,'uname':this.userName,'item':this.quotationData,'company_address_id':this.selectedparaflexBillingAddressID,'customer_billing':this.c_billing_addr,'customer_shipping':this.c_shipping_addr }, "Lead/quotationAdd").subscribe((result) => {
        console.log(result);

        if (result['message'] == 'Quotation added sucessfully' && result['status'] == 'Success') {
          this.dialog1.success("Quotation", "Inserted");
          this.rout.navigate(['/quotation']);
        }
        else{
          this.dialog1.error("Something went wrong");
          this.rout.navigate(['/quotation']);
        }
          this.rout.navigate(['/quotation']);

      })
    }

  }
  tmpsearch1:any={};
  att_temp:any=[];

  getItemsList(search)
  {
    console.log(search);
    this.productlist=[];


    for(var i=0;i<this.temp_product.length; i++)
    {
      search=search.toLowerCase();
      this.tmpsearch1=this.temp_product[i]['product_name'].toLowerCase();
      if(this.tmpsearch1.includes(search))
      {
        // console.log(this.orderlist);
        console.log(this.tmpsearch1);
        console.log(this.temp_product[i]);

        this.productlist.push(this.temp_product[i]);
      }

    }




  }
  getparaflexBillingAddress()
  {
    console.log("getparaflexBillingAddress function call");
    this.serve.fetchData({ }, "Lead/company_address").subscribe((result) => {
      console.log(result);
      this.paraflexBillingAddress = result['data'];
      if (this.paraflexBillingAddress.length == 0) {
        this.noparaflexBillingAddress=true;
      }
      else {
        this.noparaflexBillingAddress=false;
      }
    })
  }

  back()
  {
    window.history.go(-1);
  }

}
