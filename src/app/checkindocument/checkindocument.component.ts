import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import { ImageModuleComponent } from '../image-module/image-module.component';
import { sessionStorage } from 'src/app/localstorage.service';

@Component({
  selector: 'app-checkindocument',
  templateUrl: './checkindocument.component.html',
  styleUrls: ['./checkindocument.component.scss']
})
export class CheckindocumentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data,public dialog:MatDialog,public serve:DatabaseService,public session: sessionStorage) {  console.log(this.data);

  }
  

  ngOnInit() {
   
  }
  imageModel(image){
    console.log(image);
    

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
}

