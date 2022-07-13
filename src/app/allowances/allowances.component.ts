import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common'
import { sessionStorage } from '../localstorage.service';
import { DialogComponent } from '../dialog.component';



@Component({
  selector: 'app-allowances',
  templateUrl: './allowances.component.html',
  styleUrls: ['./allowances.component.scss']
})
export class AllowancesComponent implements OnInit {
  
  userRoleData:any=[];
  allowanceData:any=[];
  loader:any;

  constructor(public serve:DatabaseService,public navparams: ActivatedRoute,public dialog:DialogComponent,public location: Location,public session: sessionStorage) 
  { 
    setTimeout(() => {
      this.get_designation();

    }, 3000);
  }

  ngOnInit() 
  {
  }

  get_designation()
  {
      this.serve.fetchData({},"Allowance/sales_type").subscribe((response=>
      {
        this.userRoleData = response['sales'];
        console.log(this.userRoleData);
        
      }));

    this.get_allowance();

  }

  get_allowance()
  {
    this.loader=1;

      this.serve.fetchData({},"Allowance/getAllowanceData").subscribe((response=>
      {
        console.log(response);
        
        this.allowanceData = response['allowance'];
        console.log(this.allowanceData);

        for(var i=0; i<this.userRoleData.length; i++)
        {
          for(var j=0; j<this.allowanceData.length; j++)
          {
            if(this.userRoleData[i]['id'] == this.allowanceData[j]['roleId'])
            {
               console.log(this.userRoleData[i]['id'] , this.allowanceData[j]['roleId']);

              this.userRoleData[i]['flight'] = this.allowanceData[j]['flight'];
              this.userRoleData[i]['trainSleeperClass'] = this.allowanceData[j]['trainSC'];
              this.userRoleData[i]['train3Tier'] = this.allowanceData[j]['train3Tier'];
              this.userRoleData[i]['train2Tier'] = this.allowanceData[j]['train2Tier'];
              this.userRoleData[i]['busAC'] = this.allowanceData[j]['busAC'];
              this.userRoleData[i]['busNonAC'] = this.allowanceData[j]['busNonAC'];
              this.userRoleData[i]['auto'] = this.allowanceData[j]['auto'];
              this.userRoleData[i]['taxi'] = this.allowanceData[j]['taxi'];
              this.userRoleData[i]['car'] = this.allowanceData[j]['car'];
              this.userRoleData[i]['bike'] = this.allowanceData[j]['bike'];
              this.userRoleData[i]['hotel'] = this.allowanceData[j]['hotel'];
              this.userRoleData[i]['metro'] = this.allowanceData[j]['metro'];

              this.userRoleData[i]['food'] = this.allowanceData[j]['food'];
              this.userRoleData[i]['car_outstation'] = this.allowanceData[j]['car_outstation'];
              this.userRoleData[i]['nonacbus_outstation'] = this.allowanceData[j]['nonacbus_outstation'];
              this.userRoleData[i]['acbus_outstation'] = this.allowanceData[j]['acbus_outstation'];
              this.userRoleData[i]['ta'] = this.allowanceData[j]['ta'];
              

            }
          }
        }

        console.log(this.userRoleData);
        setTimeout (() => {
          this.loader='';
          
        }, 5000);
        
      }));
  }
    refresh(){
      this.get_designation();
      // this.get_allowance();
    }
  updateAllowance()
  {
    console.log(this.userRoleData); 
    this.dialog.confirm("Update Allowance !").then((result)=>{
      if(result){
        this.serve.fetchData({'data':this.userRoleData},"Allowance/update_allowance").subscribe((response=>
          {
            console.log(response); 
            if(response)
            {
                this.dialog.success("Allowances","Updated");
                // this.rout.navigate(['/product-list']);
            } 
            this.get_allowance();
      
          })); 
      }
    })

   
  }


}
