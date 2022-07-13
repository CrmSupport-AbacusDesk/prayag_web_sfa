import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DatabaseService } from 'src/_services/DatabaseService';
import { DialogComponent } from 'src/app/dialog.component';

@Component({
  selector: 'app-contractor-meet-detail',
  templateUrl: './contractor-meet-detail.component.html'
})
export class ContractorMeetDetailComponent implements OnInit {
meetingID :any ;
sendData:any={};
contractorMeetDetail:any;
private dburl2 : any = this.serve.dburl2;
  constructor( public route:ActivatedRoute,
    public rout:Router,
    public toast:ToastrManager,
    public serve: DatabaseService,
    public alert: DialogComponent
    
    ) { 

    this.route.params.subscribe(prm=>{
      this.meetingID=prm.id;
      
    })
    
    this.getMeetingDetails()
  }

  ngOnInit() {
  }
  


tmparray:any=[];

  getMeetingDetails(){

    this.sendData={
      meeting_id:this.meetingID
    }
    this.serve.get_rqst2(this.sendData, "Contractor/filterMeetingData").subscribe((result) => {

      console.log(result);
      // this.allCount = result['all_cont'];
      // console.log(result.result.length);
      this.contractorMeetDetail = result;
      for (let index = 0; index < this.contractorMeetDetail.meetingImages.length; index++) {
        const element = this.contractorMeetDetail.meetingImages[index].img_path;

       if(element.search(/.mp4/i)!=-1){
          this.contractorMeetDetail.meetingImages[index].type='video';
       }else{
         this.contractorMeetDetail.meetingImages[index].type='image';
       }
      }
    console.log(this.contractorMeetDetail);
    
    
      // console.log(this.allCount);
      // console.log((this.contractorMeetListDetail));
    })
  }


  deleteImage(id, index) {
    this.alert.delete("Image").then((result) => {
      if (result) {
        console.log("hello");
        console.log(id);
        let value = { 'id': id}
        this.serve.fetchData(value, "Contractor/delete_contract_image").subscribe((result => {

          console.log(result);
          this.contractorMeetDetail.meetingImages.splice(index, 1);
        }))
      }
    })
  }


}
