import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-image-module',
  templateUrl: './image-module.component.html',
  styleUrls: ['./image-module.component.scss']
})
export class ImageModuleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
  console.log(data);
  }
  ngOnInit() {
  }

}
