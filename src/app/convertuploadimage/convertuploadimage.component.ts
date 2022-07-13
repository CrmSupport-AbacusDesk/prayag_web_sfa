import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DatabaseService } from 'src/_services/DatabaseService';
import { sessionStorage } from 'src/app/localstorage.service';


@Component({
  selector: 'app-convertuploadimage',
  templateUrl: './convertuploadimage.component.html',
  styleUrls: ['./convertuploadimage.component.scss']
})
export class ConvertuploadimageComponent implements OnInit {


    urls=new Array<string>();
    selectedFile=[];
    submit = false;
    loader:any;
    formData=new FormData();
    login_data: any = {};
    login_data5: any = {};
    constructor(@Inject(MAT_DIALOG_DATA)public data,public dialog:MatDialog,public serve:DatabaseService,public session: sessionStorage) {
    console.log(this.data);
    }
    ngOnInit() {
      this.login_data = this.session.getSession();
      this.login_data = this.login_data.value;
      this.login_data5 = this.login_data.data;
    }
    remove_image(i:any)
    {
      console.log(i);
      this.urls.splice(i,1);
      this.selectedFile.splice(i,1);
    }
    insertImage(data)
    {
      let files = data.target.files;
      if (files)
      {
        for (let file of files)
        {
          let reader = new FileReader();
          reader.onload = (e: any) =>
          {
            this.urls[0]=(e.target.result);
          }
          reader.readAsDataURL(file);
        }
      }

      for(var i=0; i<data.target.files.length; i++)
      {
        this.selectedFile=(data.target.files[0]);
        console.log(this.selectedFile);

      }
    }
    image:any={}
    fileChange(event:any) {

      console.log(event.target.files);
      for (var i = 0; i < event.target.files.length; i++) {
        this.selectedFile.push(event.target.files[i]);

        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          console.log(this.urls);
          for (let urlIndex = 0; urlIndex < this.urls.length; urlIndex++) {
            this.image=this.urls[0]
            console.log(this.image);


          }
          for (let index = 0; index < this.selectedFile.length; index++) {

            for (let urlIndex = 0; urlIndex < this.urls.length; urlIndex++) {

              if(index == urlIndex) {
                this.selectedFile[index]['path'] = this.urls[urlIndex];
              }
            }
          }

          console.log(this.selectedFile);

        }

        reader.readAsDataURL(event.target.files[i]);

      }
    }
    submitdocument()
    {





          let id=this.data.id;
console.log(this.data.id);


          for(var i=0; i<this.selectedFile.length; i++)
          {
            this.formData.append("image"+i,this.selectedFile[i],this.selectedFile[i].name);
          }

          this.formData.append('id',id);

          if(this.selectedFile && this.selectedFile.length > 0)
          {
            this.loader = true;
            this.serve.fetchData({'dr_id':this.data.id,'visiting_card_image':this.image},"lead/update_visitingCard").subscribe((resp)=>
            {
              this.loader = false;
              console.log(resp);
              if(resp){
      this.dialog.closeAll();

              }

            });
          }


      }
      submitofficialdocument()
      {





            let id=this.data.id;

            for(var i=0; i<this.selectedFile.length; i++)
            {
              this.formData.append("image"+i,this.selectedFile[i],this.selectedFile[i].name);
            }


            this.formData.append('title',this.data.title);
            this.formData.append('login_id',this.login_data5.id);


            if(this.selectedFile && this.selectedFile.length > 0)
            {
              this.loader = true;
              this.serve.upload_image(this.formData,"User/upload_company_document").subscribe((resp)=>
              {
                this.loader = false;
                console.log(resp);
                if(resp){
        this.dialog.closeAll();

                }

              });
            }


        }

  }
