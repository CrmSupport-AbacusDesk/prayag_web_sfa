import { Component, OnInit } from '@angular/core';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog.component';
import { ImageModuleComponent } from 'src/app/image-module/image-module.component';
import { ExpesneEditComponent } from '../expesne-edit/expesne-edit.component';

@Component({
  selector: 'app-detail-expense',
  templateUrl: './detail-expense.component.html',
  styleUrls: ['./detail-expense.component.scss']
})
export class DetailExpenseComponent implements OnInit {
  
  expenseDetail:any={};
  expenseId:any
  loader:any;
  travel:any=[];
localConv:any=[];
hotel:any=[];
miscExp:any=[];
food:any=[];
  constructor(public route:ActivatedRoute,public serve:DatabaseService,public router :Router,public dialog: MatDialog,public alert:DialogComponent){
    
    this.route.params.subscribe( params => {
      console.log(params);
      this.expenseId = params.id;
    });
    
    this.getExpenseDetail();
    
  }
  
  ngOnInit() {}
  
  openImage(url){
    console.log(url);
    window.open(url);
  }
  
  getExpenseDetail(){
    this.loader=1;
    
    this.serve.fetchData({'expenseId':this.expenseId},"Expense/expense_detail").subscribe((result=>{
      console.log(result);
      this.expenseDetail = result;
      this.travel=result['travel'];
      console.log(this.travel);
      this.localConv=result['localConv'];
      console.log(this.localConv);
      this.hotel=result['hotel'];
      console.log(this.hotel);
      this.miscExp=result['miscExp'];
      console.log(this.miscExp);
      this.food=result['food'];
      console.log(this.food);
      setTimeout (() => 
      {
        this.loader='';
      }, 700);
    }))
  }
  
  
  
  expModal(type,id){
    const dialogRef = this.dialog.open(ExpenseModalComponent,{
      width:'400px',
      data:{
        type,
        id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getExpenseDetail();
      
    }); 
  }
  
  
  imageModel(image){
    const dialogRef = this.dialog.open( ImageModuleComponent, {
      // width: '500px',
      data:{
        image,
        
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');  
    });
  }
  
  
  goTo(){
    console.log("goto method calls");
    this.router.navigate(['/allowances', { from: 'expense-detail' }]);
  }
  
  
  edit_details(expense_type) {
    const dialogRef = this.dialog.open(ExpesneEditComponent, {
      width: expense_type == 'Travelentitlement' ? '950px' : '750px',
      data: {
        'from':'expense detail page',
        'expense_type':expense_type,
        'expense_detail':expense_type == 'Travelentitlement' ? this.expenseDetail.travel: 
        expense_type == 'hotel'?this.expenseDetail.hotel:
        expense_type == 'food'?this.expenseDetail.food:
        expense_type == 'local conveyance'?this.expenseDetail.localConv:
        expense_type == 'misc expense information'?this.expenseDetail.miscExp:'no data found'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getExpenseDetail();
    });
  }
  print1() {

    const printContents = document.getElementById('print-section1').innerHTML;
    console.log(printContents);

    const originalContents = document.body.innerHTML;
    console.log(originalContents);


    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

    setTimeout(() => {

        $('#print').hide();

    }, 1000);
}
  
}
