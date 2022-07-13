import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-qr-code-model',
  templateUrl: './qr-code-model.component.html',
  styleUrls: ['./qr-code-model.component.scss']
})
export class QrCodeModelComponent implements OnInit {
id:any=[]
data2:any=[];
  constructor(@Inject(MAT_DIALOG_DATA)public data,public serve:DatabaseService,public dialog:MatDialog,public rout:Router,public alert:DialogComponent,public toast:ToastrManager) { 
    console.log(data.product_id);
    this.id=data.product_id;
    if(data.product_id){

      this.product_data();
    }
this.data2.active='true';

  }

  ngOnInit() {
  }
  product_data(){
    console.log("Hello*****************");
    this.serve.fetchData({},"Offer/product_detail/"+this.id).subscribe((result)=>{
      console.log(result);
      this.data2 = result;
    })

  }
}
