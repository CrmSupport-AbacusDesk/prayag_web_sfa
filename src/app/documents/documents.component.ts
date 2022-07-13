import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import { ConvertuploaddocumentComponent } from '../convertuploaddocument/convertuploaddocument.component';
import { sessionStorage } from 'src/app/localstorage.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  document_list:any=[]
  login_data: any = {};

  login_data5: any = [];
  constructor(public serve: DatabaseService, public dialog: MatDialog,public session: sessionStorage) { }

  ngOnInit() {
    this.getdocument()
    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value;
    this.login_data5 = this.login_data.data;
  }
  uploaddocument(){
    const dialogRef = this.dialog.open(ConvertuploaddocumentComponent, {
      width: '500px',
      data: {
        type:'officialdocument',

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getdocument()
    });
  }

  getdocument() {
    this.serve.fetchData({'user_id':this.login_data5.id}, "User/document_list").subscribe((response => {
        console.log(response);
        this.document_list = response['result'];
    }));
}}

