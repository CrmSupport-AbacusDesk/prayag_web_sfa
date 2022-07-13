import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DatabaseService } from 'src/_services/DatabaseService';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { QuotationDetailModalComponent } from 'src/app/lead/quotation-detail-modal/quotation-detail-modal.component';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-quotation-detail',
  templateUrl: './quotation-detail.component.html',
  styleUrls: ['./quotation-detail.component.scss']
})
export class QuotationDetailComponent implements OnInit {

  product_list: any;
  data: any = {};
  quotationDetailList: any = [];
  quotationItem: any = [];
  quotation_id: any;
  productCode: null;
  productSize: any;
  productName: any;
  paraflexBillingAddress:any;
  noparaflexBillingAddress:boolean=false;
  selectedparaflexBillingAddressID:any;
  selectedparaflexBillingAddressDetail:any;
  c_shipping_addr:any;
  c_billing_addr:any;

  item: any = [];
  totalQty: number;
  totalAmount: number;
  tempTotalAmount: number = 0;
  tempGSTTotal: number = 0;
  tempGrandTotal: number = 0;
  tempDiscountTotal: number = 0;

  tempTotalQty: number = 0;
  info = {};
  st: any = {};
  showReason: boolean = false;
  showSave: boolean = false;
  showEdit: boolean = true;
  rejectReason = false;
  quotationStatus='';
  tNc='';
  loader=false;
  valid_upto:any;

  constructor(private _location: Location,public dialog1:DialogComponent, public rout: Router,public dialog: MatDialog, public alert: DialogComponent, public serve: DatabaseService, public route: ActivatedRoute, public toast: ToastrManager) {
    // this.getProduct();
    this.data.product = null;
    console.log("url = "+this.serve.myurl);

    this.route.params.subscribe(params => {
      console.log(params);
      this.quotation_id = params.id;
      console.log(this.quotation_id);
      this.quotationDetail();
      this. get_category_list();

    });

  }

  ngOnInit() {
  }


  back() {
    this._location.back();

  }
  category_list:any=[];
  get_category_list()
  {
    this.serve.fetchData({ }, "Product/categoryList").subscribe((result) => {
      console.log(result);

      this.category_list=result;
      console.log( this.category_list);

    })
  }
  validupdate(){
    this.serve.fetchData({'quotation_id':this.quotation_id,'valid_upto':this.quotationDetailList.valid_upto }, "Lead/quotation_valiDateUpdate").subscribe((result) => {
      console.log(result);

      if(result)
      {
          this.dialog1.success("Quotation","Updated");
          // this.rout.navigate(['/product-list']);
      }

    })
  }
  getProduct() {

    this.serve.fetchData({'category':this.data.category },"Product/product_list").subscribe((response => {
      console.log(response);
      this.product_list = response['product_list'];
      console.log(this.product_list);

    }));
  }

  public onDate(event): void
  {
    this.quotationDetailList.valid_upto=moment(event.value).format('YYYY-MM-DD');
    console.log(this.quotationDetailList.valid_upto);


  }

  quotationDetail() {
    this.quotationDetailList = '';
    this.quotationItem = ''
    console.log('in quotation detail function');

    this.serve.fetchData(0, "Lead/getQuotationDetail/" + this.quotation_id).subscribe((result => {
      console.log(result);
      this.quotationDetailList = result['data'];
      this.quotationItem = this.quotationDetailList['quotation_item'];
      this.quotationStatus=this.quotationDetailList['quotation_status'];
      this.getparaflexBillingAddress()
      this.selectedparaflexBillingAddressID=this.quotationDetailList['company_address_id'];
      this.selectedparaflexBillingAddressDetail=this.quotationDetailList['address'];
      this.c_shipping_addr=this.quotationDetailList['customer_shipping'];
      this.c_billing_addr=this.quotationDetailList['customer_billing'];

      this.tNc = this.quotationDetailList['term_condition'];
      console.log(this.quotationStatus);
      this.totalQty = parseInt(this.quotationDetailList.item_count);
      this.totalAmount = parseInt(this.quotationDetailList.item_total);
      this.tempGSTTotal = parseInt(this.quotationDetailList.gst_amount);
      this.tempGrandTotal = parseInt(this.quotationDetailList.grand_total);
      this.tempDiscountTotal = parseInt(this.quotationDetailList.total_discount);
      console.log(this.tempDiscountTotal);
      console.log(this.quotationDetailList);
      console.log(this.quotationDetailList['quotation_item']);
      console.log(this.total_discount);

    }))
  }
  total_discount:any=0;

  details(details) {

    console.log(details);
    this.productCode = details.product_code;
    this.productSize = details.multi_products;
    console.log(this.productSize);
    for(let i=0;i<this.productSize.length;i++){
      this.productSize[i].price = this.productSize[i].product_mrp;
    }
    this.productName = details.product_name;
    this.data.productcode = this.productCode;

  }

  deleteItem(id, qty, amount,gst,total_discount) {

    console.log(id);
    this.tempTotalAmount = 0
    this.tempTotalQty = 0
    if (this.quotationItem.length > 1) {
      this.info = '';
      console.log(qty);
      console.log(amount);
      console.log(total_discount);

      this.tempTotalAmount = this.totalAmount - amount;
      this.tempTotalQty = this.totalQty - qty;
      this.tempGSTTotal = ((this.tempGSTTotal) - parseInt(gst));
      this.tempGrandTotal = this.tempGSTTotal + this.tempTotalAmount;
      this.total_discount=total_discount;
      this.info = {  'grand_total': this.tempGrandTotal,'gst_amount': this.tempGSTTotal,'item_count': this.tempTotalQty, 'item_total': this.tempTotalAmount, 'quotation_id': parseInt(this.quotation_id),'total_discount':total_discount }



      this.alert.confirm('You will not be able to recover this Quotation Data!').then((result) => {
        if (result) {
          console.warn("greater than 1");
          this.serve.fetchData({ 'id': id, 'info': this.info }, "Lead/delete_quotation_item").subscribe((result => {
            console.log(result);
            if ((result['msg']) == ('Deleted')) {
              this.quotationDetail();
            }

          }))
        }
      });
    }

    else {
      this.alert.confirm('You will not be able to recover this Quotation !').then((result) => {
        if (result) {
          console.warn("equal to 1");
          this.serve.fetchData({ id: this.quotation_id,'total_discount':this.total_discount}, "Lead/delete_quotation ").subscribe((result => {
            console.log(result);

            if ((result['msg']) == ('Deleted')) {
              this.rout.navigate(['/quotation']);
            }
          }))
        }
      });
    }



  }
  quotationData:any = [];


  addItemList()
  {

    this.info = '';
    this.item.length = 0;
    this.tempTotalAmount = this.totalAmount;
    this.tempTotalQty = this.totalQty;
    this.item.push(this.data)
    // for (let i = 0; i < this.productSize.length; i++)
    // {

    //   if ((this.productSize[i].price))
    //   {
    //     this.productSize[i].amount = (this.productSize[i].price * this.productSize[i].qty);
    //     this.productSize[i].gst=  (parseInt(this.productSize[i].amount) * parseInt(this.data.gstPercentage) / 100);
    //     this.productSize[i].total_amount = parseInt(this.productSize[i].amount) + parseInt(this.productSize[i].gst);
    //     this.item.push({ "product_id": this.productSize[i].product_id, "price": this.productSize[i].price, "qty": this.productSize[i].qty, "amount": this.productSize[i].amount,"total_amount": this.productSize[i].total_amount,"gst": this.productSize[i].gst,'gstPercentage':this.data.gstPercentage, "product_code": this.productCode, "product_name": this.productName })
    //     this.productSize[i].qty = '';
    //     this.productSize[i].price = '';
    //     this.productSize[i].amount = '';

    //   }
    //   else {
    //     console.warn("not add in array");
    //   }
    // }
    this.productName = '';
    this.data.product = null;

    let flag=0;
    this.data.productName = this.productName;
    this.data.qty = this.data.qty;
    this.data.price = this.data.price;
    this.data.amount = this.data.amount;
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

      if(this.data.Product == this.quotationItem[i].Product){
        console.log('hii');

        this.toast.errorToastr("Product Already Added");
        this.quotationData.push(this.data);
        this.data='';
        return;




        // flag++;
        // console.log(flag);
        // this.quotationData[i].qty=parseInt(this.quotationData[i].qty)+parseInt(this.data.qty);
        // this.quotationData[i].price=parseFloat(this.data.price);
        // this.quotationData[i].amount=parseFloat(this.quotationData[i].price)*parseInt(this.quotationData[i].qty);
        // this.quotationData[i].discount_amount1=(parseFloat(this.quotationData[i].amount)*parseFloat(this.quotationData[i].discount_percent1))/100
        // this.quotationData[i].discount_amount2=(parseFloat(this.quotationData[i].amount)*parseFloat(this.quotationData[i].discount_percent2))/100

        // this.quotationData[i].discounted_amount=parseFloat(this.quotationData[i].amount) - (parseFloat(this.quotationData[i].discount_amount1)+parseFloat(this.quotationData[i].discount_amount2));
        // this.quotationData[i].gst=(parseFloat(this.quotationData[i].discounted_amount)*parseFloat(this.quotationData[i].gstPercentage))/100;
        // this.quotationData[i].total_amount=parseFloat(this.quotationData[i].gst)+parseFloat(this.quotationData[i].discounted_amount);
      }

    }

    if(flag==0){
      this.quotationData.push(this.data);
    }
    console.log(this.item);

    for (let i = 0; i < this.item.length; i++) {
      this.tempTotalAmount = ((this.tempTotalAmount) + parseInt(this.item[i].amount));
      this.tempTotalQty = ((this.tempTotalQty) + parseInt(this.item[i].qty));
      this.tempGSTTotal = ((this.tempGSTTotal) + parseInt(this.item[i].gst));

    }

    this.tempGrandTotal = this.tempGSTTotal + this.tempTotalAmount;

    this.info = { 'product_type':this.data.product_type,'item_count': this.tempTotalQty, 'grand_total': this.tempGrandTotal,'gst_amount': this.tempGSTTotal,'item_total': this.tempTotalAmount, 'quotation_id': parseInt(this.quotation_id), 'item': this.item }

    console.log(this.info);

    this.info['item_count'] = this.tempTotalAmount;
    this.info['item_total'] = this.tempTotalQty;
    // this.info.push(this.item)
    this.info['quotation_id'] = this.quotation_id
    console.log(this.info);

    if (this.item.length > 0) {
      this.serve.fetchData({ 'info': this.info }, "Lead/quotation_item_update").subscribe((result => {
        console.log(result);
      }))
      this.data ={};
      this.quotationDetail();

    }
    else {
      this.toast.errorToastr("Add Qty & Price");

    }

  }


  rejectCondition(status) {
    this.showEdit = false;
    this.showSave = true;
    console.log(status);
    if (status == "Reject") {
      console.log('in reject condition');
      this.showReason = true;
    }
  }

  editStatus() {
    console.log('edit function');
    this.showEdit = false;
    this.showSave = true;
  }

  saveStatus(status, reason,validupto) {
    this.loader = true;

    console.log(this.selectedparaflexBillingAddressID);
    console.log(this.c_shipping_addr);
    console.log(this.c_billing_addr);


    console.log('in save function');
    console.log(status);
    console.log(reason);
    console.log(validupto);


    this.showReason = true;
    this.showSave = false;
    this.st.quotation_id = this.quotation_id;
    this.st.status = status;
    this.st.reason = reason;
    this.st.company_address_id = this.selectedparaflexBillingAddressID;
    this.st.customer_shipping = this.c_shipping_addr;
    this.st.customer_billing = this.c_billing_addr;
    this.st.valid_upto=validupto;

    console.log(this.st);
    let data = { data: this.st };
    console.warn(data);

    if (status == "Reject" && !reason) {
      console.log('reason is blank');
      this.rejectReason = true;
      this.showSave = true;
      this.loader = false;
      return;
    }

    this.serve.fetchData(data, "Lead/updateQuotationStatus/").subscribe((result => {
      console.log(result);

      if (result['status'] == 'Success') {
        console.log('in success function');


        setTimeout(() => {
          this.loader = false;
        }, 500);
        this.rout.navigate(['/quotation']);
      }
      else {
        console.log('in failed function');
        console.log(result['error']['message']);
        this.alert.error(result['error']['message']);
        this.loader = false;
      }
    }))
  }


  quotationDialog() {
    console.log('quotation Dialog box function');


    const dialogRef = this.dialog.open(QuotationDetailModalComponent, {
      width: '550px',
      data: {
        id: this.quotation_id,
        termsNcondition:this.tNc,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.quotationDetail();
    });
  }

  sendmail(){
    this.serve.fetchData({'quotation_id': this.quotation_id}, "Lead/getQuotationDetail/" + this.quotation_id).subscribe((result => {
      console.log(result);



    }))

  }
  onPrintPage() {

    // const printContents = document.getElementById('printData').innerHTML;
    // console.log(printContents);

    // const originalContents = document.body.innerHTML;
    // console.log(originalContents);


    // document.body.innerHTML = printContents;

    // window.print();

    // document.body.innerHTML = originalContents;

    // setTimeout(() => {

    //   $('#printData').hide();

    // }, 1000);


    // ----backend print ------

    console.log("onPrintPage method call");
    console.log(this.quotation_id);

    this.serve.fetchData({'id':this.quotation_id}, "cron/getQuotationDetailPdf").subscribe((result) => {
      console.log(result);

      if(result=='success')
      {
        var url = this.serve.myurl+'api/uploads/QuotationPdf/'+this.quotation_id+'.pdf';
        window.open(url);
      }
      else{
        console.log("no data found");
      }


    })

  }


  getparaflexBillingAddress(){
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


  conInt(val)
  {
    return parseInt(val)
  }


}

