import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService'
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-banner-add',
  templateUrl: './banner-add.component.html',
  styleUrls: ['./banner-add.component.scss']
})
export class BannerAddComponent implements OnInit {
  banner_detail_data:any=[];
  banner_id:any=[]
  data:any={};
  loader:any=false;
  constructor(public serve:DatabaseService,public route:ActivatedRoute, public router : Router) {
    
    
    this.route.params.subscribe( params => {
      console.log(params);
      this.banner_id = params.id;
      console.log(this.banner_id);
      this.data.banner = [];
      // this.data.banner.push('Channel Partner');
      console.log('banner_detail');
      this.serve.fetchData({banner_id:this.banner_id},"category_master/banner_detail").subscribe((result=>{
        console.log(result);
        this.banner_detail_data = result;
        
        
        const bannerData = [];
        if(this.banner_detail_data.channel_partner == 1) {
          bannerData.push('Channel Partner')
        }
        
        if(this.banner_detail_data.dealer == 1) {
          bannerData.push('Dealer')
        }
        
        if(this.banner_detail_data.plumber == 1) {
          bannerData.push('Plumbing Man')
        }
        
        if(this.banner_detail_data.consumer == 1) {
          bannerData.push('Consumer')
        }
        
        if(this.banner_detail_data.employee_login == 1) {
          bannerData.push('Employee Login')
        }
        
        this.data.banner = bannerData;
        
        // this.data.banner = [this.banner_detail_data.channel_partner==1?'Channel Partner':'',this.banner_detail_data.dealer==1?'Dealer':'',this.banner_detail_data.plumber==1?'Plumbing Man':'',this.banner_detail_data.consumer==1?'Consumer':'',this.banner_detail_data.employee_login==1?'Employee Login':''];
        console.log(this.data.banner); 
        
      }))
      
    });
    
    //   this.banner_detail();
    // this.data.banner=[];
    
    
  }
  
  ngOnInit() {
  }
  // selectedFile: File[]=[];
  bannerassign:any=[];
  // i:any = 0;
  banner_assign(file_name){
    console.log(this.data.banner);
    
    console.log(this.data);
    console.log(this.selectedFile);
    if(this.data.banner.includes('Employee Login')){
      console.log('employeelogin');
      this.data.emp=1;
    }
    if(this.data.banner.includes('Channel Partner')){
      console.log('channel_partner');
      this.data.channel_partner=1;
      
    }
    if(this.data.banner.includes('Plumbing Man')){
      console.log('plumbing_man');
      this.data.plumbing_man=1;
      
    }
    if(this.data.banner.includes('Dealer')){
      console.log('dealer');
      this.data.dealer=1;
      
    }
    if(this.data.banner.includes('Consumer')){
      console.log('consumer');
      this.data.consumer=1;
      
    }
    this.bannerassign.push({employee_login:this.data.emp==1?1:0,channel_partner:this.data.channel_partner==1?1:0,plumbing_man:this.data.plumbing_man==1?1:0,consumer:this.data.consumer==1?1:0,dealer:this.data.dealer==1?1:0});
    console.log(this.bannerassign);
    // this.bannerassign.img = file_name;
    
    this.serve.fetchData({data:this.bannerassign,img:file_name},"category_master/banner_assigndata").subscribe((result=>{
      console.log(result);
      this.router.navigate(['/banner-banner-list'])
    }))
  }
  // imageSrc: any={};
  urls=new Array<string>();
  formData = new FormData();
  
  // insertImage(data)
  // {
  //   this.selectedFile=[];
  //   let files = data.target.files;
  //   if (files) {
  //       for (let file of files) {
  //           let reader = new FileReader();
  //           reader.onload = (e: any) => {
  //               this.urls.push(e.target.result);
  //           }
  //           reader.readAsDataURL(file);
  //       }
  //   }
  //   console.log(this.urls);
  //   // console.log(data.target.files.length);
  //   // for(var i=0; i<data.target.files.length; i++)
  //   // {
  //       this.selectedFile.push(data.target.files[0]);
  //   // }
  //   console.log(this.selectedFile);    
  
  selectedFile: File[]=[];
  i:any = 0;
  
  fileChange(event) {
    
    console.log(event.target.files);
    for (var i = 0; i < event.target.files.length; i++) {
      this.selectedFile.push(event.target.files[i]);
      
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
        console.log(e.target.result);
      }
      reader.readAsDataURL(event.target.files[i]);
      
    }
    console.log(this.urls);
    console.log(this.selectedFile);
  }
  img:any;
  submit_product()
  {
    console.log(this.selectedFile);
    
    this.formData.append("add",this.selectedFile[0],this.selectedFile[0][name]);
    
    console.log(this.formData);
    this.serve.FileData(this.formData,'category_master/banner_assign')
    .subscribe((result:any)=>{
      console.log(result);
      this.img = result;
      this.banner_assign(this.img);
      
    })
  }
  check_all(){
    this.data.banner = ['Employee Login'];
    // 'Channel Partner','Dealer','Plumbing Man','Consumer',
    console.log(this.data.banner);
  }
  uncheckall(){
    this.data.banner = [];
  }
  // data1:any=[];
  // banner_detail(){
  //   this.data.banner = [];
  //   console.log('banner_detail');
  //   this.serve.fetchData({banner_id:this.banner_id},"category_master/banner_detail").subscribe((result=>{
  //     console.log(result);
  //     this.banner_detail_data = result;
  //     this.data.banner.push(this.banner_detail_data.channel_partner==1?'Channel Partner':'',this.banner_detail_data.consumer==1?'Consumer':'',this.banner_detail_data.employee_login==1?'Employee Login':'',this.banner_detail_data.dealer==1?'Dealer':'',this.banner_detail_data.plumber==1?'Plumbing Man':'');
  //         // this.data.banner.push('Consumer');
  //         console.log(this.data.banner);
  
  // }))
  // // this.data1.push({employee_login:this.data.emp==1?1:0,channel_partner:this.data.channel_partner==1?1:0,plumbing_man:this.data.plumbing_man==1?1:0,consumer:this.data.consumer==1?1:0,dealer:this.data.dealer==1?1:0});
  // //   console.log(this.bannerassign);
  
  
  // }
  update(b_id){
    console.log('banner_detail');
    console.log(this.data);
    console.log(this.selectedFile);
    if(this.data.banner.includes('Employee Login')){
      console.log('employeelogin');
      this.data.emp=1;
    }
    if(this.data.banner.includes('Channel Partner')){
      console.log('channel_partner');
      this.data.channel_partner=1;
      
    }
    if(this.data.banner.includes('Plumbing Man')){
      console.log('plumbing_man');
      this.data.plumbing_man=1;
      
    }
    if(this.data.banner.includes('Dealer')){
      console.log('dealer');
      this.data.dealer=1;
      
    }
    if(this.data.banner.includes('Consumer')){
      console.log('consumer');
      this.data.consumer=1;
      
    }
    this.bannerassign.push({employee_login:this.data.emp==1?1:0,channel_partner:this.data.channel_partner==1?1:0,plumbing_man:this.data.plumbing_man==1?1:0,consumer:this.data.consumer==1?1:0,dealer:this.data.dealer==1?1:0});
    console.log(this.bannerassign);
    this.serve.fetchData({banner_id:this.banner_id ,data:this.bannerassign},"category_master/banner_update").subscribe((result=>{
      console.log(result);
      this.banner_detail_data = result;
      
    }))
    
  }
  
}
