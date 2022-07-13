import { Component, OnInit,Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatProgressBarModule} from '@angular/material'
// import { DialogComponent } from 'src/app/dialog/dialog.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog.component';
// import { PearlService } from '';

@Component({
  selector: 'app-upload-file-modal',
  templateUrl: './upload-file-modal.component.html',
  styleUrls: ['./upload-file-modal.component.scss']
})
export class UploadFileModalComponent implements OnInit {

  excel_name: any ='';
  file : any={};
  type:any=[];
  formData = new FormData();
  loader:any;
  come_from : any =''
  payment_flag = '';
  excel_data:any=[];
  download_sample_area_excel_data: any=[];
  excel_loader:any=false;
  userData:any;
  userId:any;
  userName:any;

  sample_billing_excel_data:any = [
    {
      "Bill Date": "2021-04-05",
      "Bill Number": "1",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "3",
      "Total Bill Amount": "1000",
      "Material Code": "ABC123",
      "Material Description": "White Board",
      "Sale Qty": "4",
      "UOM": "pcs",
      "Item Amount": "400"
    },
    {
      "Bill Date": "2021-04-05",
      "Bill Number": "1",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "3",
      "Total Bill Amount": "1000",
      "Material Code": "ABC124",
      "Material Description": "Bat",
      "Sale Qty": "3",
      "UOM": "pcs",
      "Item Amount": "300"
    },
    {
      "Bill Date": "2021-04-05",
      "Bill Number": "1",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "3",
      "Total Bill Amount": "1000",
      "Material Code": "ABC125",
      "Material Description": "Ball",
      "Sale Qty": "3",
      "UOM": "pcs",
      "Item Amount": "300"
    },
    {
      "Bill Date": "2021-04-15",
      "Bill Number": "2",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "2",
      "Total Bill Amount": "1500",
      "Material Code": "ABC123",
      "Material Description": "White Board",
      "Sale Qty": "10",
      "UOM": "pcs",
      "Item Amount": "1000"
    },
    {
      "Bill Date": "2021-04-15",
      "Bill Number": "2",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "2",
      "Total Bill Amount": "1500",
      "Material Code": "ABC124",
      "Material Description": "Bat",
      "Sale Qty": "5",
      "UOM": "pcs",
      "Item Amount": "500"
    },
    {
      "Bill Date": "2021-05-01",
      "Bill Number": "3",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "3",
      "Total Bill Amount": "3000",
      "Material Code": "ABC125",
      "Material Description": "Ball",
      "Sale Qty": "10",
      "UOM": "pcs",
      "Item Amount": "1000"
    },
    {
      "Bill Date": "2021-05-01",
      "Bill Number": "3",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "3",
      "Total Bill Amount": "3000",
      "Material Code": "ABC123",
      "Material Description": "White Board",
      "Sale Qty": "10",
      "UOM": "pcs",
      "Item Amount": "1000"
    },
    {
      "Bill Date": "2021-05-01",
      "Bill Number": "3",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "3",
      "Total Bill Amount": "3000",
      "Material Code": "ABC124",
      "Material Description": "Bat",
      "Sale Qty": "10",
      "UOM": "pcs",
      "Item Amount": "1000"
    },
    {
      "Bill Date": "2021-05-25",
      "Bill Number": "4",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "5",
      "Total Bill Amount": "10000",
      "Material Code": "ABC125",
      "Material Description": "Ball",
      "Sale Qty": "10",
      "UOM": "pcs",
      "Item Amount": "1000"
    },
    {
      "Bill Date": "2021-05-25",
      "Bill Number": "4",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "5",
      "Total Bill Amount": "10000",
      "Material Code": "ABC123",
      "Material Description": "White Board",
      "Sale Qty": "20",
      "UOM": "pcs",
      "Item Amount": "2000"
    },
    {
      "Bill Date": "2021-05-25",
      "Bill Number": "4",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "5",
      "Total Bill Amount": "10000",
      "Material Code": "ABC124",
      "Material Description": "Bat",
      "Sale Qty": "10",
      "UOM": "pcs",
      "Item Amount": "1000"
    },
    {
      "Bill Date": "2021-05-25",
      "Bill Number": "4",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "5",
      "Total Bill Amount": "10000",
      "Material Code": "ABC126",
      "Material Description": "Bag",
      "Sale Qty": "15",
      "UOM": "pcs",
      "Item Amount": "3000"
    },
    {
      "Bill Date": "2021-05-25",
      "Bill Number": "4",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "5",
      "Total Bill Amount": "10000",
      "Material Code": "ABC127",
      "Material Description": "Torch",
      "Sale Qty": "15",
      "UOM": "pcs",
      "Item Amount": "3000"
    },
    {
      "Bill Date": "2021-06-01",
      "Bill Number": "5",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "2",
      "Total Bill Amount": "2600",
      "Material Code": "ABC124",
      "Material Description": "Bat",
      "Sale Qty": "12",
      "UOM": "pcs",
      "Item Amount": "1200"
    },
    {
      "Bill Date": "2021-06-01",
      "Bill Number": "5",
      "Customer Code": "3294",
      "Customer Name": "new cp",
      "Total Bill Item": "2",
      "Total Bill Amount": "2600",
      "Material Code": "ABC125",
      "Material Description": "Ball",
      "Sale Qty": "14",
      "UOM": "pcs",
      "Item Amount": "1400"
    }
  ];

  sample_payment_excel_data:any = [
    {
      "Payment Date": "2021-04-11",
      "Customer Code": "3294",
      "Payment Id": "VOICE-123",
      "Bill Number": "",
      "Amount": "5000",
      "Payment Type": "Advance Payment"
    },
    {
      "Payment Date": "2021-04-15",
      "Customer Code": "3294",
      "Payment Id": "VOICE-123",
      "Bill Number": "1",
      "Amount": "1000",
      "Payment Type": "Billing"
    },
    {
      "Payment Date": "2021-04-30",
      "Customer Code": "3294",
      "Payment Id": "VOICE-124",
      "Bill Number": "2",
      "Amount": "500",
      "Payment Type": "Billing"
    },
    {
      "Payment Date": "2021-05-01",
      "Customer Code": "3294",
      "Payment Id": "VOICE-125",
      "Bill Number": "2",
      "Amount": "1000",
      "Payment Type": "Billing"
    },
    {
      "Payment Date": "2021-05-20",
      "Customer Code": "3294",
      "Payment Id": "VOICE-126",
      "Bill Number": "3",
      "Amount": "1000",
      "Payment Type": "Billing"
    },
    {
      "Payment Date": "2021-05-25",
      "Customer Code": "3294",
      "Payment Id": "VOICE-127",
      "Bill Number": "3",
      "Amount": "1500",
      "Payment Type": "Billing"
    },
    {
      "Payment Date": "2021-06-01",
      "Customer Code": "3294",
      "Payment Id": "VOICE-129",
      "Bill Number": "4",
      "Amount": "3000",
      "Payment Type": "Billing"
    },
    {
      "Payment Date": "2021-06-04",
      "Customer Code": "3294",
      "Payment Id": "VOICE-130",
      "Bill Number": "4",
      "Amount": "5000",
      "Payment Type": "Billing"
    },
    {
      "Payment Date": "2021-06-15",
      "Customer Code": "3294",
      "Payment Id": "VOICE-131",
      "Bill Number": "4",
      "Amount": "2000",
      "Payment Type": "Billing"
    },
    {
      "Payment Date": "2021-06-25",
      "Customer Code": "3294",
      "Payment Id": "VOICE-132",
      "Bill Number": "5",
      "Amount": "1000",
      "Payment Type": "Billing"
    },
    {
      "Payment Date": "2021-06-28",
      "Customer Code": "3294",
      "Payment Id": "VOICE-133",
      "Bill Number": "5",
      "Amount": "1600",
      "Payment Type": "Billing"
    },
    {
      "Payment Date": "2021-07-01",
      "Customer Code": "3294",
      "Payment Id": "VOICE-134",
      "Bill Number": "6",
      "Amount": "1000",
      "Payment Type": "Billing"
    }
  ];


  constructor( @Inject(MAT_DIALOG_DATA)public data,public serve: DatabaseService,public dialog: DialogComponent,public dialogRef: MatDialogRef<UploadFileModalComponent>) {

    console.log(data);
    this.come_from = data['from']
    this.type=data['type']
    console.log(this.type);


    this.userData = JSON.parse(localStorage.getItem('st_user'));
    this.userId=this.userData['data']['id'];
    this.userName=this.userData['data']['name'];
    console.log(this.userId);

  }
  ngOnInit() {
  }
  onUploadChange(evt)
  {
    this.file = evt.target.files[0];
    console.log(this.file);
    console.log(this.file.length);
    console.log(this.file['name']);
    this.excel_name = this.file['name'];
    console.log(this.excel_name);

  }
  upload_user_data_excel()
  {
    console.log(this.file);
    this.dialogRef.disableClose = true;

    this.formData.append('category', this.file, this.file.name);
    console.log(this.formData);
    console.log(this.file);
    console.log(this.file.name);

    this.loader=1;
    this.serve.FileData(this.formData, 'user/import_user_excel')
    .subscribe(d => {

      this.dialogRef.disableClose = false;
      this.formData = new FormData();
      if(d['msg'] == 'Data Imported successfully'){
        this.dialog.success("Excel Uploaded", " Successfully");
        this.dialogRef.close();
        setTimeout (() => {
          this.loader='';
        }, 700);
        return;
      }
      else{
        setTimeout (() => {
          this.loader='';
        }, 700);
        this.dialog.error(d['msg']);
        return;
      }

    },err => {console.log(err);  this.formData = new FormData(); });
  }

  upload_distribution_excel()
  {
    console.log(this.file);
    this.dialogRef.disableClose = true;
    // this.file.push(this.userId)
    this.formData.append('category', this.file,this.file.name);
    this.formData.append('id',this.userId);
    this.formData.append('type',this.type);


    console.log(this.formData);
    console.log(this.file);
    console.log(this.file.name);

    this.loader=1;

    this.serve.FileData(this.formData, 'user/import_distributor_excel')
    .subscribe(d => {

      this.dialogRef.disableClose = false;
      this.formData = new FormData();

      if(d['msg'] == 'Data Imported successfully'){
        this.dialog.success("Excel Uploaded", " Successfully");
        this.dialogRef.close();
        setTimeout (() => {
          this.loader='';
        }, 700);
        return;
      }
      else{
        setTimeout (() => {
          this.loader='';
        }, 700);
        this.dialog.error(d['msg']);
        return;
      }

    },err => {console.log(err);  this.formData = new FormData(); });




}


  upload_lead_excel()
  {
    console.log(this.file);
    this.dialogRef.disableClose = true;
    // this.file.push(this.userId)
    this.formData.append('category', this.file,this.file.name);
    this.formData.append('id',this.userId);
    this.formData.append('type',this.type);


    console.log(this.formData);
    console.log(this.file);
    console.log(this.file.name);

    this.loader=1;
    this.serve.FileData(this.formData, 'Lead/import_lead_excel')
    .subscribe(d => {

      this.dialogRef.disableClose = false;
      this.formData = new FormData();
      if(d['msg'] == 'Data Imported successfully'){
        this.dialog.success("Excel Uploaded", " Successfully");
        this.dialogRef.close();
        setTimeout (() => {
          this.loader='';
        }, 700);
        return;
      }
      else{
        setTimeout (() => {
          this.loader='';
        }, 700);
        this.dialog.error(d['msg']);
        return;
      }

    },err => {console.log(err);  this.formData = new FormData(); });
  }
  upload_travel_excel()
  {
    console.log(this.file);
    this.dialogRef.disableClose = true;
    // this.file.push(this.userId)
    this.formData.append('file', this.file,this.file.name);
    this.formData.append('id',this.userId);
    // this.formData.append('type',this.type);


    console.log(this.formData);
    console.log(this.file);
    console.log(this.file.name);

    this.loader=1;
    this.serve.FileData(this.formData, 'Travel/import_travel_excel')
    .subscribe(d => {

      this.dialogRef.disableClose = false;
      this.formData = new FormData();
      if(d['msg'] == 'Data Imported successfully'){
        this.dialog.success("Excel Uploaded", " Successfully");
        this.dialogRef.close();
        setTimeout (() => {
          this.loader='';
        }, 700);
        return;
      }
      else{
        setTimeout (() => {
          this.loader='';
        }, 700);
        this.dialog.error(d['msg']);
        return;
      }

    },err => {console.log(err);  this.formData = new FormData(); });
  }
  upload_beat_excel()
  {
    console.log(this.file);
    this.dialogRef.disableClose = true;
    // this.file.push(this.userId)
    this.formData.append('file', this.file,this.file.name);
    this.formData.append('id',this.userId);
    // this.formData.append('type',this.type);


    console.log(this.formData);
    console.log(this.file);
    console.log(this.file.name);

    this.loader=1;
    this.serve.FileData(this.formData, 'User/importBeatCode_excel')
    .subscribe(d => {

      this.dialogRef.disableClose = false;
      this.formData = new FormData();
      if(d['msg'] == 'Data Imported successfully'){
        this.dialog.success("Excel Uploaded", " Successfully");
        this.dialogRef.close();
        setTimeout (() => {
          this.loader='';
        }, 700);
        return;
      }
      else{
        setTimeout (() => {
          this.loader='';
        }, 700);
        this.dialog.error(d['msg']);
        return;
      }

    },err => {console.log(err);  this.formData = new FormData(); });
  }
  upload_distributor_data_excel()
  {
    console.log(this.file);
    this.dialogRef.disableClose = true;

    this.formData.append('category', this.file, this.file.name);
    console.log(this.formData);
    console.log(this.file);
    console.log(this.file.name);

    this.loader=1;

    this.serve.FileData(this.formData, 'user/import_distributor_excel')
    .subscribe(d => {

      this.dialogRef.disableClose = false;
      this.formData = new FormData();
      if(d['msg'] == 'Data Imported successfully'){
        this.dialog.success("Excel Uploaded", " Successfully");
        this.dialogRef.close();
        setTimeout (() => {
          this.loader='';
        }, 700);
        return;
      }
      else{
        setTimeout (() => {
          this.loader='';
        }, 700);
        this.dialog.error(d['msg']);
        return;
      }

    },err => {console.log(err);  this.formData = new FormData(); });
  }

  upload_billing_data_excel()
  {
    console.log('upload_billing_data_excel method calls');
    console.log(this.file);
    this.dialogRef.disableClose = true;

    this.formData.append('category', this.file, this.file.name);
    console.log(this.formData);
    console.log(this.file);
    console.log(this.file.name);

    this.loader=1;
    this.serve.FileData(this.formData, 'Excel_import_data/import_tally_bill_data_by_excel')
    .subscribe(d => {

      this.dialogRef.disableClose = false;
      this.formData = new FormData();
      if(d['msg'] == 'Data Imported successfully'){
        this.dialog.success("Excel Uploaded", " Successfully");
        this.dialogRef.close();
        setTimeout (() => {
          this.loader='';
        }, 700);


        return;
      }
      else{
        this.dialog.error(d['msg']);
        setTimeout (() => {
          this.loader='';
        }, 700);
        return;

      }

    },err => {console.log(err);  this.formData = new FormData(); });
  }

  upload_payment_data_excel()
  {
    console.log('upload_payment_data_excel method calls');

    console.log(this.file);
    this.dialogRef.disableClose = true;

    this.formData.append('category', this.file, this.file.name);
    console.log(this.formData);
    console.log(this.file);
    console.log(this.file.name);

    this.loader=1;
    this.serve.FileData(this.formData, 'Excel_import_data/tally_payment_receipt_by_excel')

    .subscribe(d => {

      this.dialogRef.disableClose = false;
      this.formData = new FormData();
      if(d['msg'] == 'Data Imported successfully'){
        this.dialog.success("Excel Uploaded", " Successfully");
        this.dialogRef.close();
        setTimeout (() => {
          this.loader='';
        }, 700);


        return;
      }
      else{
        this.dialog.error(d['msg']);
        setTimeout (() => {
          this.loader='';
        }, 700);
        return;

      }

    },err => {console.log(err);  this.formData = new FormData(); });
  }

  download_sample_excel(type):void {

    console.log("download_sample_excel method calls");
    console.log("type = "+ type);

    this.excel_data = [];




     if(type == 'User Target'){

      this.excel_loader = true;

          this.excel_data.push({'Name':'','Contact No':'','Type':'','Year':'','Month':'','Target':''});

        console.log(this.excel_data);
        this.serve.exportAsExcelFile(this.excel_data, 'SAMPLE '+type+' EXCEL');

        setTimeout (() => {
          this.excel_loader = false;
        }, 700);


    }
    else if(type == 'Distributor Target')
    {
      this.excel_loader = true;

        this.excel_data.push({'Distributor Name':'','Contact No':'','Year':'','Month':'','Target':''});


      console.log(this.excel_data);
      this.serve.exportAsExcelFile(this.excel_data, 'SAMPLE '+type+' EXCEL');

      setTimeout (() => {
        this.excel_loader = false;
      }, 700);
    }
    else if(type == 'Lead')
    {
      this.excel_loader = true;

        this.excel_data.push({'Mobile no':'','Company name':'','Name':'','State':'','District':'','City':'','Area':'','Address':'','Email id':'','Source':'','Description':'','Alternate Mobile':'','Product Name':'','Enquiry Description':''});


      console.log(this.excel_data);
      this.serve.exportAsExcelFile(this.excel_data, 'SAMPLE '+type+' EXCEL');

      setTimeout (() => {
        this.excel_loader = false;
      }, 700);
    }
    else if(type == 'Distribution')
    {
      this.excel_loader = true;

        this.excel_data.push({'Mobile no':'','Company name':'','Name':'','State':'','District':'','City':'','Area':'','Address':'','Email id':'','ERP Code':'','Alternate Mobile':'','GST':'','Latitude':'','Longitude':'','Pincode':'','Assign Distributor':'','Assign User':'','Active':''});


      console.log(this.excel_data);
      this.serve.exportAsExcelFile(this.excel_data, 'SAMPLE '+type+' EXCEL');

      setTimeout (() => {
        this.excel_loader = false;
      }, 700);
    }
    else if(type == 'Travel')
    {
      this.excel_loader = true;

        this.excel_data.push({'Executive ERP Code':'','Date':'','City':'','Travel type':'','Beat Code':'','Remarks':''});


      console.log(this.excel_data);
      this.serve.exportAsExcelFile(this.excel_data, 'SAMPLE '+type+' EXCEL');

      setTimeout (() => {
        this.excel_loader = false;
      }, 700);
    }
    else if(type == 'Beat')
    {
      this.excel_loader = true;

        this.excel_data.push({'State':'','District':'','Area/RouteName':'','Beat Code':''});


      console.log(this.excel_data);
      this.serve.exportAsExcelFile(this.excel_data, 'SAMPLE '+type+' EXCEL');

      setTimeout (() => {
        this.excel_loader = false;
      }, 700);
    }
    else{
      console.log("in else");
    }


  }

}
