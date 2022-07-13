import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { StatusModalComponent } from '../status-modal/status-modal.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { splitClasses } from '@angular/compiler';
import { sessionStorage } from 'src/app/localstorage.service';
import { OrderEditModalComponent } from '../order-edit-modal/order-edit-modal.component';
import { OrderDispatchComponent } from '../order-dispatch/order-dispatch.component';
import { DialogComponent } from 'src/app/dialog.component';
import * as $ from "jquery";


@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    animations: [slideToTop()]
})
export class OrderDetailComponent implements OnInit {
    data:any={};
    login_data:any=[];
    userData: any;
    userId: any;
    userName: any;
    order_id:any;
    order_item:any=[];
    order_logs:any=[];
    order_detail:any=[];
    login_dr_id:any;
    editqty:any=false;
    distrbutorId:any;
    constructor(public route:ActivatedRoute,public serve:DatabaseService, public dialog: MatDialog,public session:sessionStorage ,public dialogs:DialogComponent) { 
        
        this.login_data = this.session.getSession();
        this.login_data = this.login_data.value.data;
        this.userData = JSON.parse(localStorage.getItem('st_user'));
        this.userId=this.userData['data']['id'];
        this.userName=this.userData['data']['name'];
        if(this.login_data.access_level !='1')
        {
            this.login_dr_id = this.login_data.id;
        }
        console.log(this.login_dr_id);
        
        this.route.params.subscribe( params => {
            console.log(params);
            this.order_id = params.id;
            console.log(this.order_id);
            
        });
        this.orderDetail();
    }
    
    ngOnInit() {
        
        
    }
    
    openDialog(): void {  
        const dialogRef = this.dialog.open(StatusModalComponent, {
            width: '400px', data:{
                order_status : this.order_detail.order_status,
                order_id : this.order_id,
                delivery_from:this.order_detail.delivery_from,
                reason:''
            }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.orderDetail();
        });
    }
    
    open_dipatch_model(): void {  
        const dialogRef = this.dialog.open(OrderDispatchComponent, {
            width: '1000px', data:{
                order_status : this.order_detail.order_status,
                order_id : this.order_id,
                reason:'',
                drId:this.distrbutorId
            }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.orderDetail();
        });
    }
    
    openEditDialog(user_id,type): void {  
        const dialogRef = this.dialog.open(OrderEditModalComponent,{
            width: '400px', data:{
                order_id : this.order_id,
                type : type,
                user_id:user_id
            }
            
        });
        
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.orderDetail();
            
        });
    }
    
    loader:any;
    edit_cash_discount:any = false;
    
    orderDetail()
    {
        this.loader=1;
        let id={'order_id':this.order_id}
        this.serve.fetchData(id,"Order/order_detail").subscribe((result=>{
            console.log(result);
            this.order_detail=result['order_detail'];
            console.log(this.order_detail);
            this.distrbutorId=this.order_detail['dr_id'];
            
            this.order_item=result['order_detail']['order_item'];
            console.log(this.order_item);
            this.order_logs=result['order_detail']['order_logs'];
            this.order_detail.order_cgst = this.order_detail.order_gst/2;  
            this.order_detail.order_cgst = parseFloat(this.order_detail.order_cgst).toFixed(2);
            this.order_detail.netBreakup = (parseFloat(this.order_detail.order_grand_total)/1.18)
            this.order_detail.gstBreakup = parseFloat(this.order_detail.order_grand_total)-parseFloat(this.order_detail.netBreakup)
            this.order_detail.gstBreakup = this.order_detail.gstBreakup.toFixed(2)
            this.order_detail.netBreakup = this.order_detail.netBreakup.toFixed(2)
            this.order_item.map((row)=>
            {
                console.log(row);
                row.editqty=false
                
            })
            setTimeout (() => {
                this.loader='';
                
            }, 700);
        }))
    }
    deleteOrderitem(id,index){
        this.serve.fetchData(id,"Order/order_item_delete")
        .subscribe((result=>{
            console.log(result);
            this.order_item.splice(index,1)
            
        }))
    }
    // calculateAmount(qty,index,del,data:any)
    // {
    //     console.log(this.orderDetail);
        
    //     var itemData =  this.orderDetail[index]
    //     console.log(itemData);
    //     this.userDetail.special_discount_amount =0
        
    //     this.orderDetail[index].sub_total = this.orderDetail[index].price * this.orderDetail[index].qty;
    //     this.orderDetail[index].discount_amount = this.orderDetail[index].price * this.orderDetail[index].discount_percent / 100;
    //     this.orderDetail[index].discounted_amount = this.orderDetail[index].price - this.orderDetail[index].discount_amount;
    //     // this.orderDetail[index].gst_amount = this.orderDetail[index].discounted_amount * this.orderDetail[index].gst_percent / 100;
    //     this.orderDetail[index].amount = parseFloat(this.orderDetail[index].discounted_amount) *  this.orderDetail[index].qty;
        
    //     this.orderDetail[index].sub_total = parseFloat(this.orderDetail[index].sub_total);
    //     this.orderDetail[index].discount_amount = parseFloat(this.orderDetail[index].discount_amount);
    //     this.orderDetail[index].discounted_amount = parseFloat(this.orderDetail[index].discounted_amount);
    //     this.orderDetail[index].gst_amount = parseFloat(this.orderDetail[index].gst_amount);
    //     this.orderDetail[index].amount = parseFloat(this.orderDetail[index].amount);
        
    //     this.order_detail1.sub_total = 0;
    //     this.order_detail1.discount = 0;
    //     this.order_detail1.gst = 0;
    //     this.order_detail1.order_total = 0;
    //     // this.order_detail1.special_discount_amount =0
    //     console.log(this.userDetail);
        
    //     for(var i=0; i<this.orderDetail.length;i++)
    //     { 
    //         this.order_detail1.sub_total += parseFloat(this.orderDetail[i]['sub_total']);
    //         this.order_detail1.order_total += parseFloat(this.orderDetail[i]['amount']);
    //         this.order_detail1.discount += parseFloat(this.orderDetail[index].sub_total)-parseFloat(this.orderDetail[index].amount);
    //         this.order_detail1.gst += parseFloat(this.orderDetail[i]['gst_amount']);
            
            
    //         console.log(this.order_detail1);
            
    //         this.userDetail.sub_total = this.order_detail1.sub_total;
    //         this.userDetail.order_total = this.order_detail1.order_total;
    //         this.userDetail.order_discount = this.order_detail1.discount;
    //         this.userDetail.order_gst = this.order_detail1.gst;
    //     }
    //     this.order_detail1.special_discount_amount = (this.order_detail1.order_total * parseFloat(this.userDetail.special_discount_percentage) )/100
    //     this.userDetail.special_discount_amount = this.order_detail1.special_discount_amount;
    //     if(this.userDetail.DiscType=='Discount')
    //     {
    //         this.order_detail1.order_grand_total = this.order_detail1.order_total - this.order_detail1.special_discount_amount
    //     }
    //     else
    //     {
    //         this.order_detail1.order_grand_total = this.order_detail1.order_total + this.order_detail1.special_discount_amount
            
    //     }
    //     console.log(this.order_detail1);
        
    //     this.userDetail.order_grand_total = this.order_detail1.order_grand_total;
    //     this.userDetail.order_grand_totalAfterRoundOff = Math.round(this.userDetail.order_grand_total)
    //     this.userDetail.netBreakup = (parseFloat(this.userDetail.order_grand_total)/1.18)
    //     this.userDetail.gstBreakup = parseFloat(this.userDetail.order_grand_total)-parseFloat(this.userDetail.netBreakup)

    //     if(del==true)
    //     {

    //         this.update_order(data.index,data.order_id,data.order_item_id,true)
    //     }
    // }
    order_detail1:any={}
    calc(id,qty)
    {
        console.log(id,qty);
        var index = this.order_item.findIndex(row=>row.id === id)
        console.log(index);
        
        // console.log(this.order_item[index])
        // this.order_item[index].sub_total = this.order_item[index].price * qty
        // this.order_item[index].amount = (this.order_item[index].price * qty) - (this.order_item[index].discount_amount * this.order_item[index].qty)
        
        this.order_item[index].sub_total = this.order_item[index].price * this.order_item[index].qty;
        this.order_item[index].pending_qty= this.order_item[index].qty;
        this.order_item[index].discount_amount = this.order_item[index].sub_total * this.order_item[index].discount_percent / 100;
        this.order_item[index].discounted_amount = this.order_item[index].sub_total - this.order_item[index].discount_amount;
        this.order_item[index].gst_amount = (this.order_item[index].sub_total-this.order_item[index].discount_amount) * this.order_item[index].gst_percent / 100;
        // this.order_item[index].amount = parseFloat(this.order_item[index].discounted_amount) *  this.order_item[index].qty;
        this.order_item[index].amount = (this.order_item[index].sub_total-this.order_item[index].discount_amount) +  this.order_item[index].gst_amount;

        
        this.order_item[index].sub_total = parseFloat(this.order_item[index].sub_total);
        this.order_item[index].discount_amount = parseFloat(this.order_item[index].discount_amount);
        this.order_item[index].discounted_amount = parseFloat(this.order_item[index].discounted_amount);
        this.order_item[index].gst_amount = parseFloat(this.order_item[index].gst_amount);
        this.order_item[index].amount = parseFloat(this.order_item[index].amount);
        // this.order_item[index].discount_amount * this.order_item[index].qty
        // this.order_item[index].discount_percent


        this.order_detail1.sub_total = 0;
        this.order_detail1.discount = 0;
        this.order_detail1.gst = 0;
        this.order_detail1.order_total = 0;
        // this.order_detail1.special_discount_amount =0
        console.log(this.order_detail);
        
        for(var i=0; i<this.order_item.length;i++)
        { 
            console.log(this.order_item[i]['sub_total']);
            
            this.order_detail1.sub_total += parseFloat(this.order_item[i]['sub_total']);
            this.order_detail1.order_total += parseFloat(this.order_item[i]['amount']);
            this.order_detail1.discount += parseFloat(this.order_item[i].discount_amount);
            this.order_detail1.gst += parseFloat(this.order_item[i]['gst_amount']);
            
            
            console.log(this.order_detail1);
            
            this.order_detail.sub_total = this.order_detail1.sub_total.toFixed(2);
            this.order_detail.order_total = this.order_detail1.order_total.toFixed(2);
            this.order_detail.order_discount = this.order_detail1.discount.toFixed(2);
            this.order_detail.order_gst = this.order_detail1.gst.toFixed(2);
        }
        this.order_detail1.special_discount_amount = (this.order_detail1.order_total * parseFloat(this.order_detail.special_discount_percentage) )/100
        this.order_detail.special_discount_amount = this.order_detail1.special_discount_amount.toFixed(2);
        // if(this.order_detail.DiscType=='Discount')
        // {
        //     this.order_detail1.order_grand_total = this.order_detail1.order_total - this.order_detail1.special_discount_amount
        // }
        // else
        // {
        //     this.order_detail1.order_grand_total = this.order_detail1.order_total + this.order_detail1.special_discount_amount
            
        // }

        console.log(this.order_detail1);
        
        // this.order_detail.order_grand_total = this.order_detail1.order_grand_total;
        this.order_detail.order_grand_total = parseInt(this.order_detail.sub_total) + parseInt(this.order_detail.order_gst)
        this.order_detail.order_grand_totalAfterRoundOff = Math.round(this.order_detail.order_grand_total)
        this.order_detail.netBreakup = (parseFloat(this.order_detail.order_grand_total)/1.18)
        this.order_detail.gstBreakup = parseFloat(this.order_detail.order_grand_total)-parseFloat(this.order_detail.netBreakup)

        // if(del==true)
        // {

            // this.update_order(this.order_item[index].id,index)
        // }
        
    }
    update_order(id)
    {
        console.log(id);
        var index = this.order_item.findIndex(row=>row.id === id)
        console.log(index);
        console.log(this.order_detail.id);
        console.log(this.order_item[index]);
        console.log(this.order_detail);


        this.serve.fetchData({'order_id':this.order_detail.id, 'order_item_id':id, 'item':this.order_item[index], 'order':this.order_detail,'uid':this.userId,'uname':this.userName},'Order/update_order_item')
        .subscribe((result)=>{
            console.log(result);
            this.editqty=false;

        })
    }
    Orderitemedit(id,qty)
    {
        console.log(id + ' ' + qty);
        
        // this.serve.fetchData({'id':id,'qty':qty},"Order/order_item_edit")
        // .subscribe((result)=>
        // {
        //     console.log(result);
        //     this.editqty=false;
        //     this.orderDetail();
        // });
    }
    // editqty:any=false;
    
    edit_qty()
    {
        this.editqty=true;
    }
    
    print1() 
    {
        let printContents, popupWin;
        printContents = document.getElementById('print-section1').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
        <html>
        <head>
        <title>Print tab</title>
        <style>
        body
        {
            font-family: 'arial';
        }
        .print-section
        {
            width: 1024px;
            background: #fff;
            padding: 15px;
            margin: 0 auto
        }
        .print-section table
        {
            width: 1024px;
            box-sizing: border-box;
            table-layout: fixed;
        }
        .print-section table tr table.table1 tr td h2
        {
            font-size: 4px;
            line-height: 10px;
        }
        .print-section table tr table.table1 tr td p
        {
            font-size: 1px;
            line-height: 10px;
        }
        table .table3 tr td
        {
            background: #ccc;
        }
        .print-section table tr table.table1 tr td:nth-child(1){width: 324px;}
        .print-section table tr table.table1 tr td:nth-child(2){width: 700px;}
        </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
        </html>`
        );
        
        setTimeout(()=>{ 
            popupWin.document.print();
            popupWin.document.close();
        }, 1000);
    }
    
    amount:any=0;
    gst_amount:any=0;
    subtotal:any=0;
    second_subtotal:any=0;
    cd_amount:any=0;
    
    change_cash_discount()
    { 
        this.subtotal = this.order_detail.sub_total - this.order_detail.order_discount;
        this.cd_amount = (this.subtotal * this.order_detail.cd_percentage)/100;
        this.second_subtotal = this.subtotal - this.cd_amount;
        
        if(this.order_detail.delivery_from == 'Kridha')
        {
            this.gst_amount = (this.second_subtotal * 18)/100;
        }
        else
        {
            this.gst_amount = 0;
        }
        
        this.amount = this.second_subtotal + this.gst_amount;
        this.order_detail.order_total = parseFloat(this.amount).toFixed(2);
        this.order_detail.order_gst = parseFloat(this.gst_amount).toFixed(2);
        this.order_detail.cd_amount = parseFloat(this.cd_amount).toFixed(2);
        
        this.order_detail.order_cgst = this.gst_amount/2;  
        this.order_detail.order_cgst = parseFloat(this.order_detail.order_cgst).toFixed(2);
    }
    
    save_cash_discount()
    {
        this.loader=1;
        this.serve.fetchData(this.order_detail,"Order/update_cash_discount")
        .subscribe((result)=>
        {
            console.log(result);
            
            setTimeout (() => 
            {
                this.loader='';
            }, 700);
        });
    }
    back()
    {
        window.history.go(-1);
    }
    changeStatusToDispatch(orderId)

    {
       this.dialogs.confirm('Order Data !').then((result) => {
      if(result){
          console.log("order dispatched");
        console.log(orderId);
        this.loader=1;
        this.serve.fetchData({orderId:orderId},"Distributors/changeStatusToDispatch")
        .subscribe((result)=>
        {
            console.log(result);

                this.loader='';
        this.orderDetail();

        },err=>
        {
            this.loader='';

        });
      }
      })
    }
    onPrintPage() {

        const printContents = document.getElementById('printData').innerHTML;
        // console.log(printContents);

        const originalContents = document.body.innerHTML;
        // console.log(originalContents);

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
        
        // this.serve.fetchData({'id':this.quotation_id}, "cron/getQuotationDetailPrint").subscribe((result) => {
        //     console.log(result);
          
        //     if(result=='success')
        //     {
        //       var url = this.serve.myurl+'api/uploads/QuotationPdf/'+this.quotation_id+'.pdf';
        //       window.open(url);
        //     }
        //     else{
        //       console.log("no data found");
        //     }
          

        setTimeout(() => {
            // $('#printData').hide();
        }, 500);
        this.editqty==true ; 
        location.reload();
      }

}
