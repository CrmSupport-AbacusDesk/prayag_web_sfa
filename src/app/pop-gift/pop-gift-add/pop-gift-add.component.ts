import { Component, OnInit } from '@angular/core';
// import { PearlService } from 'src/app/pearl.service';
import { DialogComponent } from 'src/app/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/_services/DatabaseService';
import { sessionStorage } from 'src/app/localstorage.service'



// import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-gift-add',
  templateUrl: './pop-gift-add.component.html'
})
export class PopGiftAddComponent implements OnInit {

  formData = new FormData();
  data: any = {};
  urls: any = [];
  selectedFile: any = [];
  loader: any;
  id: any;
  logIN_user: any;
  userName:any;
  userId:any;



  constructor(
    public route: ActivatedRoute,
    public serve: DatabaseService,
    public dialog: DialogComponent,
    public session: sessionStorage,
    public rout: Router) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.id = params.id;
      console.log(this.id);
      
    });
    this.logIN_user = JSON.parse(localStorage.getItem('st_user'));
    console.log(this.logIN_user);
    this.userName=this.logIN_user['data']['name'];
    this.userId=this.logIN_user['data']['id'];
    if (this.id != 0) {
      this.edit_detail();

    }
  }

  ngOnInit() {
    console.log(this.logIN_user.data.userId);
  }

  insertImage(event) {
    console.log(event);

    let files = event.target.files;
    console.log(files);
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        
        reader.onload = (e: any) => {
          console.log(e);
          
          this.urls.push(e.target.result);
          console.log(e);
          
        }
        reader.readAsDataURL(file);
      }
    }
    console.log(this.urls);

    for (var i = 0; i < event.target.files.length; i++) {
      this.selectedFile.push(event.target.files[i]);
    }
    console.log(this.selectedFile);

  }

  delete_img(index: any) {
    this.urls.splice(index, 1)
    this.selectedFile=[];

  }
  errorMsg: any;
  add_gift() {
    if (this.id == 0) {
      if (this.selectedFile.length > 0) {
        console.log(this.data);
        this.data.uid = this.logIN_user.data.id;
        this.data.userName = this.logIN_user.data.name;

        console.log(this.data);

        this.serve.fetchData(this.data, "PopGift/submit_pop_gift").subscribe((result => {
          console.log(result);
          this.errorMsg = result;
          console.log(this.errorMsg);

          if (this.errorMsg.msg == 'Item Already') {
            this.dialog.error("Item Already Exist");
          }
          else {
            console.log(this.data);
            let id = result['id'];
            for (var i = 0; i < this.selectedFile.length; i++) {
              this.formData.append("image" + i, this.selectedFile[i], this.selectedFile[i].name);
            }

            this.formData.append('id', id);

            if (this.selectedFile && this.selectedFile.length > 0) {
              this.loader = true;
              this.serve.upload_image(this.formData, "PopGift/insert_image").subscribe((resp) => {
                this.loader = false;
                console.log(resp);
                if (resp) {
                  this.dialog.success("POP Gift", "Added");
                  this.rout.navigate(['/pop-gift-list']);
                }
              });
            }
            else {
              this.dialog.success("POP Gift", "Added");
              this.rout.navigate(['/pop-gift-list']);
            }
          }
        }
        ))
      }
      else {
        this.dialog.error("Add Image also");
      }
    }
    else {
      this.serve.fetchData(this.data, "/PopGift/update_pop_gift").subscribe((result => {
        console.log(result);
        this.errorMsg = result;
        let id = result['id'];
        console.log(this.errorMsg);
        if (this.errorMsg.msg == 'Item Already') {
          this.dialog.error("Item Already Exist");
        }
        else{
          this.dialog.success("POP Gift", "update");
          this.rout.navigate(['/pop-gift-list']);

            // ----------Image update---------------------
            for (var i = 0; i < this.selectedFile.length; i++) {
              this.formData.append("image" + i, this.selectedFile[i], this.selectedFile[i].name);
            }

            this.formData.append('id', id);


            if (this.selectedFile && this.selectedFile.length > 0) {
              this.loader = true;
              this.serve.upload_image(this.formData, "PopGift/insert_image").subscribe((resp) => {
                this.loader = false;
                console.log(resp);
                if (resp) {
                  this.dialog.success("POP Gift", "Updated");
                  this.rout.navigate(['/pop-gift-list']);
                }
              });
            }
            else {
              this.dialog.success("POP Gift", "Updated");
              this.rout.navigate(['/pop-gift-list']);
            }


            // ---------------------------------


        }
        
      }))
    }
  }




  edit_detail() {
    this.serve.fetchData({ "id": this.id }, "/PopGift/popDetail").subscribe((result => {
      console.log(result);
      this.data = result['data'];
      this.urls.push(this.serve.myurl+'api/uploads/pop_gift/'+this.data.pop_image);
    }))
  }


  back()
    {
        window.history.go(-1);
    }



}
