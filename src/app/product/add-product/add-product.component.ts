import { Component, OnInit, Renderer2 } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import { DialogComponent } from '../../dialog.component';
import { ThrowStmt } from '@angular/compiler';
import { UpdateAdminModelComponent } from 'src/app/user/update-admin-model/update-admin-model.component';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common'
import {  sessionStorage} from 'src/app/localstorage.service';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  animations: [slideToTop()]
})
export class AddProductComponent implements OnInit {
  brand_list: any = [];
  category_list: any = [];
  subCategory_list: any = [];
  data: any = {};
  cat_list: any = [];
  feature: any = {};
  image: any = [];
  feature_cart = [];
  product_img: any = {};
  image_cart: File[] = [];
  type;
  value: any = [];
  tmp_category: any = [];
  product_brand = [];
  selectedFile = [];
  Isvalid: any;
  color_list: any = [];
  brand: any = [];
  color: any = [];
  extra_field: any = [];
  extra_field_list: any = [];
  active: any = {};
  formData = new FormData();
  loader: any;
  multipleProductPriceDetail: any = [];
  sizeArr: any = [];
  imgData : any =[];
  userData: any;
  userId: any;
  userName: any;



  constructor(
    private renderer: Renderer2,
    public location: Location,
    public serve: DatabaseService,
    public rout: Router,
    public session: sessionStorage,
    public dialog: DialogComponent,
    public dialog2: MatDialog) {
    this.getBrandList();
    this.getCategoryList();
    this.getSubCategoryList();
    this.getProductColor();
    this.getProductExtraField();
    this.getstate_price_list();
    this.userData = JSON.parse(localStorage.getItem('st_user'));
    this.userId=this.userData['data']['id'];
    this.userName=this.userData['data']['name'];
  }

  ngOnInit() {
  }

  // onSaveButtonClick(){
  //   this.product_price.id = tmp_product_price.id;


  // }




radiohide:boolean = true;
triggerError:boolean = false;
  showMRP = false;
  showSize = false;

  

  

  clearField() {
    this.data.multiple_product_size = '';
    this.data.multiple_product_price = '';
    // this.selectedFile = [];
    this.data.multiple_product_image='';

  }

  
  





  showMRPFunction() {
    this.showMRP = true;
    this.showSize = false;
    console.log(this.showSize);
    console.log(this.showMRP);
  }

  showSizeFunction() {
    this.showMRP = false;
    this.showSize = true;
  }




  emptyProductArray(){
    this.multipleProductPriceDetail.length = 0;
    this.radiohide=true
    this.showSizeRadioButton = false;
    // this.checkRadioValidation();


  }

  add_data() {
    // console.log("hello");
    // console.log(this.multipleProductPriceDetail.length);

    // if (this.multipleProductPriceDetail.length < 1) {
    //   this.multipleProductPriceDetail.push({
    //     size: this.data.multiple_product_size,
    //     price: this.data.multiple_product_price
    //   });
    // }
    // else {
    //   for (let i = 0; i <= this.multipleProductPriceDetail.length; i++) {
    //     if ((this.multipleProductPriceDetail[i].size == this.data.multiple_product_size) && (this.multipleProductPriceDetail[i].price == this.data.multiple_product_price)) {
    //       console.log("if block");
    //       console.log("already_Exist");
    //       break;
    //     }
    //     else {
    //       this.multipleProductPriceDetail.push({
    //         size: this.data.multiple_product_size,
    //         price: this.data.multiple_product_price
    //       });
    //     }
    //   }
    // }

    if (this.data.sizeRadio == '1') {
      this.multipleProductPriceDetail.length = 0;
      this.multipleProductPriceDetail.push({
        product_size: this.data.multiple_product_size,
        product_mrp: this.data.multiple_product_price,
        // product_img:this.data.multiple_product_image

      });
      console.log(this.multipleProductPriceDetail);
      
      this.radiohide=false;

    }

    else {

      this.multipleProductPriceDetail.push({
        product_size: this.data.multiple_product_size,
        product_mrp: this.data.multiple_product_price,
        // product_img:this.data.multiple_product_image
      });
      console.log(this.multipleProductPriceDetail);
     
      this.radiohide=true;

    }
    this.clearField();
    this.delete_img(this.indexes);
    this.showSizeRadioButton=false;
    this.triggerError=false;

  }






  deleteProductDetail(arrayIndex) {

    if (this.data.sizeRadio == '1') {
      this.radiohide=true;
      console.log(arrayIndex);
      this.multipleProductPriceDetail.splice(arrayIndex, 1);
      console.log(this.multipleProductPriceDetail);

    }
    else {
      console.log(arrayIndex);
      this.multipleProductPriceDetail.splice(arrayIndex, 1);
      console.log(this.multipleProductPriceDetail);

    }


  }


  toggleterritory(key, action) {
    console.log(action);
    console.log(key);

    if (action == 'open') { this.active[key] = true; }
    if (action == 'close') { this.active[key] = false; }

    console.log(this.active);
  }

  getstate_price_list() {
    this.serve.fetchData(0, "/Product/state_price/").subscribe((result) => {
      console.log(result);
      this.data.region = result;
      // this.product_brand=this.brand_list;
    });
  }

  status: boolean = false;
  toggleHeader() {
    this.status = !this.status;
    if (this.status) {
      this.renderer.addClass(document.body, 'nav-active');
    }
    else {
      this.renderer.removeClass(document.body, 'nav-active');
    }
  }

  getBrandList() {
    this.serve.fetchData(0, "/Product/product_brand_list/").subscribe((result) => {
      console.log(result);
      this.brand_list = result;
      this.product_brand = this.brand_list;
    });
  }

  // brand;
  category;
  getCategoryList() {
    this.serve.fetchData({}, "Product/categoryList").subscribe((result) => {
      console.log(result);
      this.category_list = result;
      console.log(this.category_list);
      
      this.tmp_category = this.category_list;
    });
  }

  getSubCategoryList() {
    // this.category=this.data.category;
    // let value={"category":this.category};
    // console.log(value);

    this.serve.fetchData('', "Product/product_sub_category_list").subscribe((result) => {
      console.log(result);
      this.subCategory_list = result['sub_category'];
    });
  }

  getProductColor() {
    this.serve.fetchData(0, "Product/color_list").subscribe((result => {
      console.log(result);
      this.color_list = result['color_list'];
    }))
  }

  getProductExtraField() {
    this.serve.fetchData(0, "Product/extra_field_list").subscribe((result => {
      console.log(result);
      this.extra_field_list = result['extra_field_list'];
    }))
  }


  feature_list: any = [];

  imageSrc: any = {};
  urls = new Array<string>();
indexes:any;
  insertImage(data,size,index) {
    console.log(data);
    console.log(size);
    console.log(index);
    
    
    
    let files = data.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
    console.log(this.urls);
    console.log(data.target.files.length);
    for (var i = 0; i < data.target.files.length; i++) {
      this.selectedFile.push(data.target.files[i]);
      // this.selectedFile[i].tmp_name = (this.selectedFile[i].name);

    }
    console.log(this.selectedFile);
    // console.log(this.imgData);
    
      this.data.multiple_product_image=this.selectedFile;
      this.indexes=index;
    
  }


 


  insertvideo(data){
    let files = data.target.files;
    console.log(files);
    
  }

  i: any = 0;
  // Insert_product() {
  //   console.log(this.data);

  //   this.loader = true;

  //   for (let i = 0; i < this.data.region.length; i++) {
  //     for (let j = 0; j < this.data.region[i].state.length; j++) {
  //       if (!this.data.region[i].state[j].price) {
  //         this.data.region[i].state[j].price = 0;
  //       }
  //     }
  //   }

  //   for (let i = 0; i < this.data.region.length; i++) {
  //     if (this.data.region[i].price) {
  //       for (let j = 0; j < this.data.region[i].state.length; j++) {
  //         this.data.region[i].state[j].price = this.data.region[i].price;
  //         console.log(this.data.region[i].price);
  //         console.log(this.data.region[i].state[j].price);
  //       }
  //     }
  //   }
  //   console.log(this.data);


  //   //  console.log(this.data);
  //   if (this.data.flag == true) {
  //     this.data.flag = 1;

  //   }

  //   this.data.brand = this.brand;
  //   this.data.color = this.color;
  //   this.data.extra_field = this.extra_field;
  //   console.log(this.data);

  //   this.loader = true;
    

  //   this.serve.fetchData(this.data, "Product/add_product").subscribe((result) => {

  //     this.loader = false;
  //     console.log(result);

  //     let id = result['insert_product'];

  //     for (var i = 0; i < this.selectedFile.length; i++) {
  //       this.formData.append("image" + i, this.selectedFile[i], this.selectedFile[i].name);
  //     }

  //     this.formData.append('id', id);

  //     if (this.selectedFile && this.selectedFile.length > 0) {
  //       this.loader = true;
  //       this.serve.upload_image(this.formData, "Product/add_image").subscribe((resp) => {
  //         this.loader = false;
  //         console.log(resp);
  //         if (resp) {
  //           this.dialog.success("Product", "Inserted");
  //           this.rout.navigate(['/product-list']);
  //         }
  //       });
  //     }
  //     else {
  //       this.dialog.success("Product", "Inserted");
  //       this.rout.navigate(['/product-list']);
  //     }
  //   })
  // }

  // remove_feature(index:any) 
  // {

  // console.log(index);

  // this.feature_cart.splice(index,1);

  // console.log(this.feature_cart);

  // }   

  product_Brand(value, index, event) {
    if (event.checked) {
      this.brand.push(value);
      console.log(this.brand);
    }
    else {
      for (var j = 0; j < this.brand_list.length; j++) {
        if (this.brand_list[index]['brand_name'] == this.brand[j]) {
          this.brand.splice(j, 1);
        }
      }
      console.log(this.brand);
    }


  }

  product_Color(value, index, event) {
    if (event.checked) {
      this.color.push(value['color_name']);
      console.log(this.color);
    }
    else {
      console.log(index);
      console.log(this.color[0]);
      for (var j = 0; j < this.color_list.length; j++) {
        if (this.color_list[index]['color_name'] == this.color[j]) {
          this.color.splice(j, 1);
        }
      }
      console.log(this.color);
    }
  }

  product_ExtraField(value, index, event) {
    if (event.checked) {
      this.extra_field.push(value['label']);
      console.log(this.extra_field);

    }
    else {
      for (var j = 0; j < this.extra_field_list.length; j++) {
        if (this.extra_field_list[index]['label'] == this.extra_field[j]) {
          this.extra_field.splice(j, 1);
        }
      }
      console.log(this.extra_field);
    }
  }

  delete_img(index: any) {
    console.log(index);
    this.urls.splice(index, 1)
  }

  new_array = [];

  filter(search_word, search_array) {
    this.new_array = [];
    for (var i = 0; i < search_array.length; i++) {
      if (search_array[i].toUpperCase().search(search_word) !== -1) {
        this.new_array.push(search_array[i]);
      }
    }
    return this.new_array;
  }

  brand_array_filter(data, array) {
    console.log(data);

    this.brand_list = this.filter(data.toUpperCase(), array);
  }

  category_array_filter(data, array) {
    this.category_list = this.filter(data.toUpperCase(), array);
  }
  sub_categoryy_array_filter(data, array) {
    this.subCategory_list = this.filter(data.toUpperCase(), array);
  }

  showSizeRadioButton = false;

 

  checkRadioValidation() {
    if(this.data.sizeRadio == 1 || this.data.sizeRadio == 2 ){
        this.showSizeRadioButton = false;
      }
      else{
        this.showSizeRadioButton = true;

      }}
  check_product_code() {
   

   



      for(var i=0; i<this.selectedFile.length; i++)
        {
            this.formData.append("image"+i,this.selectedFile[i],this.selectedFile[i].name);
        }



      console.log(this.data.sizeRadio);

      const requestData = {

        product_name: this.data.product_name,
        product_code: this.data.cat_no?this.data.cat_no:'',
        description: this.data.description,
        hsn: this.data.hsn,
        gst: this.data.gst,
        category:this.data.category,
        mrp:this.data.mrp,
        unit:this.data.mrp,
        uid:this.userId,
        uname:this.userName
        // uploadImages: this.formData,

      };
      console.log(requestData);

      this.serve.fetchData(requestData, "product/add_product").subscribe((result => {
        console.log(result);
        this.rout.navigate(['/product-list']);
        let id = result['insert_product'];

      for (var i = 0; i < this.selectedFile.length; i++) {
        this.formData.append("image" + i, this.selectedFile[i], this.selectedFile[i].name);
      }

      this.formData.append('id', id);

      if (this.selectedFile && this.selectedFile.length > 0) {
        this.loader = true;
        this.serve.upload_image(this.formData, "Product/add_image").subscribe((resp) => {
          this.loader = false;
          console.log(resp);
          if (resp) {
            this.dialog.success("Product", "Inserted");
            this.rout.navigate(['/product-list']);
          }
        });
      }
      else {
        this.dialog.success("Product", "Inserted");
        this.rout.navigate(['/product-list']);
      }
      }))



    
  }

  openModal() {
    console.log('test');

    const dialogRef = this.dialog2.open(UpdateAdminModelComponent, {
      width: '500px',
      data: {
        type: 'category'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');

    });

  }


  back(): void {
    console.log("location back method calss");
    console.log(this.location);
    this.location.back()
  }
}
