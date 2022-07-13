import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../router-animation/router-animation.component';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddCategoryComponent } from '../add-category/add-category.component';
import * as $ from  'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-redeem-request-list',
  templateUrl: './redeem-request-list.component.html',
  styleUrls: ['./redeem-request-list.component.scss']
})
export class RedeemRequestListComponent implements OnInit {

  data: any = {};
  searchData: any = {};

  redeemDataList: any = [];
  redeemTotalCount: any;

  currentDate: any = new Date();
  skeltonList: any = Array(5);

  constructor(public rout: Router,
              public serve: DatabaseService,
              public dialog: DialogComponent,
              public dialog2: MatDialog) {

      this.data.isRequestInProcess = false;
      this.data.currentActiveTab = 1;
      this.searchData.transactionType = '';
  }

  ngOnInit() {

       this.onRedeemListHandler();
  }


  onRedeemListHandler() {

      console.log('hello');

      if (this.searchData && this.searchData.dateCreated) {

          this.searchData.dateCreatedInFormat = moment(this.searchData.dateCreated).format('YYYY-MM-DD');
      }

      const inputData = {

          currentActiveTab: this.data.currentActiveTab,
          searchData: this.searchData,
          start: this.redeemDataList.length,
          pageLimit: 20
      };

      this.data.isRequestInProcess = true;
      this.serve.fetchData(inputData, 'Plumber/getRedeemDataList').subscribe(result => {

              console.log(result);

              setTimeout(() => {

                this.data.isRequestInProcess = false;

              }, 500);

              const resultData = JSON.parse(JSON.stringify(result['redeemList']));
              console.log(resultData);

              for (let index = 0; index < resultData.length; index++) {

                    const isExist = this.redeemDataList.findIndex(row => row.id == resultData[index].id);

                    if (isExist === -1) {
                        this.redeemDataList = this.redeemDataList.concat(resultData[index]);
                    }
              }

              this.redeemTotalCount = result['redeemTotalCount'];

      }, error => {

            console.log(error);
            this.data.isRequestInProcess = false;
            this.dialog.error('Something went wrong !!! Try Later... ');
      });

  }


  onTabAndInputChangeHandler(currentActiveTab) {

      setTimeout(() => {

          this.data.isRequestInProcess = true;
          this.data.currentActiveTab = currentActiveTab;

          this.redeemDataList = [];
          this.onRedeemListHandler();

      }, 500);

  }

  onRefreshRedeemHandler() {

        this.searchData = {};
        this.redeemDataList = [];

        this.onRedeemListHandler();
  }


  onDisburseAmountToPaytmWalletHandler(redeemId) {


        this.dialog.confirm('').then((result) => {

              if (result) {

                  const inputData = {
                    redeemId: redeemId
                  };

                  this.data.isRequestInProcess = true;
                  this.serve.fetchData(inputData, 'Plumber/onDisburseAmountToPaytmWallet').subscribe(result => {

                          console.log(result);

                          setTimeout(() => {

                            this.data.isRequestInProcess = false;

                          }, 500);

                          if (result['status'] == 'Success' || result['status'] == 'Inprocess') {

                              this.dialog.success_att(result['status'], result['statusMessage']);

                          } else {

                              this.dialog.error(result['status'] + ', ' + result['statusMessage']);
                          }

                          this.onTabAndInputChangeHandler(this.data.currentActiveTab);

                  }, error => {

                        console.log(error);
                        this.data.isRequestInProcess = false;
                        this.dialog.error('Something went wrong !!! Try Later... ');
                  });
              }
        });

  }


  onTabClickHandler(activeTab) {

       this.data.currentActiveTab = activeTab;

  }

}
