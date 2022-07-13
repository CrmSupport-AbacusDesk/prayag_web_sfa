import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jointmodal',
  templateUrl: './jointmodal.component.html',
  styleUrls: ['./jointmodal.component.scss']
})
export class JointmodalComponent implements OnInit {
  jointname:any={};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public route: Router) {
    console.log(data);
    this.jointname = data.list['joiner']
    console.log(this.jointname);




    }
    ngOnInit() {

    }

}
