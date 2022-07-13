import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import {  sessionStorage} from 'src/app/localstorage.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data) {
console.log(this.data);

   }

  ngOnInit() {
  }

}
