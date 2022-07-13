import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../router-animation/router-animation.component';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddCategoryComponent } from '../add-category/add-category.component';
import * as $ from  'jquery';

@Component({
  selector: 'app-scheme-master',
  templateUrl: './scheme-master.component.html',
  styleUrls: ['./scheme-master.component.scss']
})
export class SchemeMasterComponent implements OnInit {

  data: any = {};

  loader: any;
  schemeStateData: any = [];

  constructor(public rout: Router,
              public serve: DatabaseService,
              public dialog: DialogComponent,
              public dialog2: MatDialog) {

      this.data.schemeType = 'Instant';

  }

  ngOnInit() {
       this.getSchemeStateDataHandler();
  }


  getSchemeStateDataHandler() {

       console.log('hello');

       this.serve.fetchData({}, 'Plumber/getStateSchemeData').subscribe((result => {

               console.log(result);
               this.data.schemeType = result['inputData']['scheme_type'];
               this.data.scanPerDay = result['inputData']['scan_per_day'];
               this.data.minPointRequest = result['inputData']['minimum_point_redeem'];

               this.schemeStateData = result['schemeStateData'];
               console.log(this.schemeStateData);
       }));

  }

  onSaveSchemeHandler() {

      this.data.searchData = '';

      let isInputEmpty = false;
      for (let index = 0; index < this.schemeStateData.length; index++) {

              const schemeRow = this.schemeStateData[index];

              if(schemeRow.scheme_status == 'Active' && (!schemeRow.point_value || schemeRow.point_value == '0' || schemeRow.point_value < 0)) {

                   isInputEmpty = true;
                   $('#redeemPoint' + schemeRow.id).focus();

              }
      }

      if (isInputEmpty) {

           return false;

      } else {

          this.dialog.confirm('').then((result) => {

              if (result) {

                    const inputData = {

                        data: this.data,
                        schemeStateData: this.schemeStateData
                    };

                    this.loader = true;

                    this.serve.fetchData(inputData, 'Plumber/saveSchemeMasterData').subscribe(( result => {

                         this.loader = false;

                         this.getSchemeStateDataHandler();
                         this.dialog.success_att('Success', 'Scheme Updated Successfully!');
                    }));
              }
          });

      }

      console.log('helloooo');

  }


  onSearchInputChangeHandler() {




  }


}
