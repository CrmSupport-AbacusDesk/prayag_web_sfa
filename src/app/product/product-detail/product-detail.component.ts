import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import { MatDialog } from '@angular/material';
import { UserEmailModalComponent } from 'src/app/user/user-email-modal/user-email-modal.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DialogService } from 'src/app/dialog.service';
import { ProductQrCodeModelComponent } from '../product-qr-code-model/product-qr-code-model.component';
import { ChangeSchemeStatusModelComponent } from '../change-scheme-status-model/change-scheme-status-model.component';
import * as XLSX from 'xlsx';
import { ExportexcelService } from 'src/app/service/exportexcel.service';
import {  sessionStorage} from 'src/app/localstorage.service';

// import { NgxImageCompressService } from 'ngx-image-compress';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  animations: [slideToTop()]

})
export class ProductDetailComponent implements OnInit {

  productDetail: any;
  newProductDetail: any;
  product_id;
  selectedFile = [];
  formData = new FormData();
  brandList: any = [];
  colorList: any = [];
  extraDetailList: any = [];
  checkBrand: any = [];
  checkcolor: any = [];
  checkDetail: any = [];
  multipleProductPriceDetail: any = [];
  product_state_price: any = [];
  id: any = [];
  sizeOfOriginalImage: number;
  localCompressedURl: any;
  sizeOFCompressedImage: number;
  // editProductID:any;



  scheme_tab_active = 'coupons';
  data: any = {}
  @ViewChild('table') table: ElementRef;

  enableInput: boolean = false;
  disableInput = true;
  showSave = false;
  showEdit = true;
  product_size: any;
  direct_dealer_price: any;
  add: any;
  update: any;
  size: any[];
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  userData: any;
  userId: any;
  userName: any;

  constructor(public alert: DialogComponent, public serve: DatabaseService, public editdialog: DialogService, public session: sessionStorage, public dialog: MatDialog, public route: ActivatedRoute, public rout: Router, public toast: ToastrManager, public excelservice: ExportexcelService, public dialog1: DialogComponent) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.product_id = params.id;
      console.log(this.product_id);
      console.log(this.serve.imgurl);
      this.userData = JSON.parse(localStorage.getItem('st_user'));
    this.userId=this.userData['data']['id'];
    this.userName=this.userData['data']['name'];
    
    });
    this.detailProduct();
    // this.scheme_data('coupons');
  }
  ngOnInit() {

  }

  active: any = {};
  mode: any;

  // editProductDetails(arrayIndex){
  //   console.log(arrayIndex);



  // }




  deleteProductDetail(imageId) {



    console.log(imageId);
    console.log(this.product_id);

    this.serve.fetchData({ id: imageId, product_id: this.product_id }, "/product/delete_product_size").subscribe((result) => {
      this.alert.success("Size Deleted", "Successfully");
      this.detailProduct();

    });



  }
  productId: any;
  add_data() {
    // if (this.data.sizeRadio == '1') {
    // this.multipleProductPriceDetail.length = 0;
    // this.productDetail.sizemrp.push({
    //   product_size: "",
    //   product_mrp: this.data.multiple_product_price
    // });
    // console.log(this.productDetail.sizemrp);
    // this.radiohide=false;
    // }
    // else {
    // this.newProductDetail.sizemrp.push({
    //   // product_id:this.
    //   product_size: this.data.add_multiple_product_size,
    //   product_mrp: this.data.add_multiple_product_price,
    //   product_id:this.productId,
    // });
    // this.radiohide=true;

    this.newProductDetail = { product_id: this.product_id, product_mrp: this.data.add_multiple_product_price, product_size: this.data.add_multiple_product_size };
    console.log(this.newProductDetail);



    this.serve.fetchData({ "sizeArr": this.newProductDetail }, "/Product/add_product_size_mrp").subscribe((result) => {
      console.log(result);
      this.detailProduct();
      this.data.add_multiple_product_size = '';
      this.data.add_multiple_product_price = ''
    });





  }



  // this.clearField();
  // this.showSizeRadioButton=false;
  // this.triggerError=false;

  // }


  toggleterritory(key, action) {
    console.log(action);
    console.log(key);

    if (action == 'open') { this.active[key] = true; }
    if (action == 'close') { this.active[key] = false; }

    console.log(this.active);
  }
  loader: any;
  stateDetail: any;
  detailProduct() {
    this.loader = 1;
    let value = { "id": this.product_id, "from": "web" };
    let product_id = { "product_id": this.product_id };
    console.log(this.product_id);

    this.serve.fetchData(value, "product/product_detail").subscribe((result => {
      console.log(result);


      this.productDetail = result['product_detail'];
      this.productDetail.product_info = this.productDetail.product_info[0];
      this.productId = this.productDetail.product_info.id;
      this.stateDetail = this.productDetail.statePriceList;
      console.log(this.productId);



      // this.getBrandList();
      // this.getProductColor();
      // this.getProductExtraField();
      // this.checkBrand=result['product_detail']['brand'];
      // this.checkcolor=result['product_detail']['color'];
      // this.checkDetail=result['product_detail']['extra_field'];
      // this.product_state_price=result['product_detail']['region'];
      // console.log(this.product_state_price);
      // console.log(this.checkBrand,this.checkDetail,this.checkcolor);

      setTimeout(() => {
        this.loader = '';

      }, 700);
    }))


    // this.serve.fetchData(product_id, "app/enquery/state_list").subscribe((result) => {
    //   console.log(result);
    //   this.stateDetail=result;
    //   console.log(this.stateDetail);


    // });




  }




  MobileNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  update_product_value(index, state_name: any, price) {
    console.log(index);
    console.log(state_name);
    console.log(price);
    console.log(this.product_id);
    this.serve.fetchData({ 'state_name': state_name, 'price': price, 'product_id': this.product_id }, "Product/update_region_price").subscribe((result) => {
      console.log(result);
      if (result['msg'] == 'success') {
        this.toast.successToastr("sucess");
        // this.detailProduct();
        this.data = {};
      } else {
        this.toast.successToastr("Something Went Wrong");
      }
    })
  }


  update_region_value(region_name, region_price) {
    console.log(region_name);
    console.log(region_price);
    console.log(this.product_id);


    this.serve.fetchData({ 'region_price': region_price, 'region_name': region_name, 'product_id': this.product_id }, "Product/update_region_value").subscribe((result => {
      console.log(result);
      if (result['msg'] == 'success') {
        this.detailProduct();
        this.toast.successToastr("Region Price Updated !!");
      } else {
        this.toast.successToastr("Something Went Wrong");
      }
    }))
  }


  category = "product";
  openEditDialog(value, type): void {
    const dialogRef = this.dialog.open(UserEmailModalComponent, {
      width: '300px',
      data: {
        value,
        type,
        product_id: this.productDetail['id'],
        category: this.category
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
      this.detailProduct();
    });
  }

  sizeid: any;
  urls = new Array<string>();
  insertImage(data) {
    console.log(data);

    var fileName: any;
    this.selectedFile = [];
    let files = data.target.files;
    fileName = files['name'];
    console.log(files);
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          // this.compressFile(this.urls, fileName)
        }
        reader.readAsDataURL(file);
      }
    }
    console.log(this.urls);
    console.log(data.target.files.length);
    for (var i = 0; i < data.target.files.length; i++) {
      this.selectedFile.push(data.target.files[i]);
    }
    // console.log(id);

    // this.sizeid = id;
    // console.log(this.sizeid);

    console.log(this.selectedFile);
    this.Insert_Image();
  }

  // compressFile(image, fileName) {
  //   var orientation = -1;
  //   this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
  //   console.warn('Size in bytes is now:', this.sizeOfOriginalImage);
  //   this.imageCompress.compressFile(image, orientation, 50, 50).then(
  //     result => {
  //       this.imgResultAfterCompress = result;
  //       this.localCompressedURl = result;
  //       this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024)
  //       console.warn('Size in bytes after compression:', this.sizeOFCompressedImage);
  //       // create file from byte
  //       const imageName = fileName;
  //       // call method that creates a blob from dataUri
  //       const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
  //       //imageFile created below is the new compressed file which can be send to API in form data
  //       const imageFile = new File([result], imageName, { type: 'image/jpeg' });
  //       console.log(imageFile);
        
  //     });
  // }


  // dataURItoBlob(dataURI) {
  //   const byteString = window.atob(dataURI);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);
  //   for (let i = 0; i < byteString.length; i++) {
  //   int8Array[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([int8Array], { type: 'image/jpeg' });
  //   return blob;
  //   }





Insert_Image() {

  console.log(this.sizeid);

  this.formData = new FormData;
  for (var i = 0; i < this.selectedFile.length; i++) {
    this.formData.append("image" + i, this.selectedFile[i], this.selectedFile[i].name);
  }
  let value = { "id": this.product_id };
  console.log(this.product_id);
  this.formData.append('id', this.product_id);
  this.formData.append('size', this.sizeid);
  this.formData.append('uid',this.userId);
  this.formData.append('uname',this.userName);
  console.log(this.formData);
  
  this.serve.upload_image(this.formData, "Product/add_image").subscribe((resp) => {
    console.log(resp);
    if (resp) {
      this.alert.success("Image", "Updated");
      this.detailProduct();
      //  this.rout.navigate(['/product-list']);
    }
  });
}



deleteImage(id, index) {
  this.alert.delete("Image").then((result) => {
    if (result) {
      console.log("hello");
      console.log(id);
      let value = { 'id': id }
      this.serve.fetchData(value, "Product/delete_image").subscribe((result => {

        console.log(result);

        this.productDetail.imageData.splice(index, 1)
        this.detailProduct();

      }))
    }
  })
}

editCategoryDialog(type): void {
  const dialogRef = this.dialog.open(UserEmailModalComponent, {
    width: '600px',
    data: {
      type,
      data: this.productDetail
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    console.log('The dialog was closed');
    this.detailProduct();

  });
}



editProduct(id) {
  console.log(id);
  this.enableInput = true;
  this.showSave = true;
  this.mode = id;
  // this.editProductID = id;
  // this.showError=true;
}
apidata: any;
updateProductDetail(size, price) {

  console.log(size);
  console.log(price);



  if (size && price) {
    // this.showError=false;
    console.log(this.mode);

    this.showSave = false;

    this.apidata = { id: this.mode, product_mrp: price, product_size: size };
    console.log(this.apidata);
    this.mode = 0;
    this.serve.fetchData({ "sizemrp": this.apidata }, "/Product/update_product_detail").subscribe((result) => {
      console.log(result);
      this.detailProduct();
      this.data.update_multiple_product_size = '';
      this.data.update_multiple_product_price = ''
    });

  }
  else {
    // this.showError=true;
  }
}

getBrandList() {
  this.serve.fetchData(0, "/Product/product_brand_list/").subscribe((result) => {
    console.log(result);
    this.brandList = result;

    if (this.brandList) {
      for (let i = 0; i < this.brandList.length; i++) {
        for (let j = 0; j < this.checkBrand.length; j++) {
          if (this.brandList[i]['brand_name'] == this.checkBrand[j]['brand_name']) {
            this.brandList[i].check = true;
          }
        }

      }
    }

    // this.product_brand=this.brand_list;
  });
}

getProductColor() {
  this.serve.fetchData(0, "Product/color_list").subscribe((result => {
    console.log(result);
    this.colorList = result['color_list'];

    console.log(this.checkcolor[0]['color_name']);

    if (this.colorList) {
      for (let i = 0; i < this.colorList.length; i++) {
        for (let j = 0; j < this.checkcolor.length; j++) {
          if (this.colorList[i]['color_name'] == this.checkcolor[j]['color_name']) {
            this.colorList[i].check = true;
          }
        }

      }
    }
  }))
}

getProductExtraField() {
  this.serve.fetchData(0, "Product/extra_field_list").subscribe((result => {
    console.log(result);
    this.extraDetailList = result['extra_field_list'];
    if (this.extraDetailList) {
      for (let i = 0; i < this.extraDetailList.length; i++) {
        for (let j = 0; j < this.checkDetail.length; j++) {
          if (this.extraDetailList[i]['label'] == this.checkDetail[j]['extra_field_name']) {
            this.extraDetailList[i].check = true;
          }
        }

      }
    }
  }))
}

product_Brand(value, index, event) {

  if (event.checked) {
    this.checkBrand.push({ 'brand_name': value });
    console.log(this.checkBrand);
    this.serve.fetchData({ "id": this.product_id, 'brand': this.checkBrand }, "Product/productupdate").subscribe((result => {
      console.log(result);
      this.toast.successToastr("changes update");

    }))
  }
  else {
    for (var j = 0; j < this.checkBrand.length; j++) {

      if (this.brandList[index]['brand_name'] == this.checkBrand[j]['brand_name']) {
        this.checkBrand.splice(j, 1);
        console.log(this.checkBrand);
      }
    }
    this.serve.fetchData({ "id": this.product_id, 'brand': this.checkBrand }, "Product/productupdate").subscribe((result => {
      console.log(result);
      this.toast.successToastr("changes update");

    }))
  }
}



product_Color(value, index, event) {
  if (event.checked) {
    this.checkcolor.push({ "color_name": value });
    console.log(this.checkcolor);
    this.serve.fetchData({ "id": this.product_id, 'color': this.checkcolor }, "Product/productupdate").subscribe((result => {
      console.log(result);
      this.toast.successToastr("changes update");
    }))
  }
  else {

    for (var j = 0; j < this.checkcolor.length; j++) {
      if (this.colorList[index]['color_name'] == this.checkcolor[j]['color_name']) {
        this.checkcolor.splice(j, 1);
      }
    }
    console.log(this.checkcolor);
    this.serve.fetchData({ "id": this.product_id, 'color': this.checkcolor }, "Product/productupdate").subscribe((result => {
      console.log(result);
      this.toast.successToastr("changes update");

    }))
  }
}

product_ExtraField(value, index, event) {
  console.log(value);


  if (event.checked) {
    this.checkDetail.push({ "extra_field_name": value });
    console.log(this.checkDetail);
    this.serve.fetchData({ "id": this.product_id, 'extra_field': this.checkDetail }, "Product/productupdate").subscribe((result => {
      console.log(result);
      this.toast.successToastr("changes update");

    }))

  }
  else {
    console.log(this.extraDetailList);
    console.log(this.checkDetail[0]);

    for (var j = 0; j < this.checkDetail.length; j++) {
      if (this.extraDetailList[index]['label'] == this.checkDetail[j]['extra_field_name']) {
        this.checkDetail.splice(j, 1);
      }
    }
    console.log(this.checkDetail);

    this.serve.fetchData({ "id": this.product_id, 'extra_field': this.checkDetail }, "Product/productupdate").subscribe((result => {
      console.log(result);
      this.toast.successToastr("changes update");

    }))
  }
}

open_qrCode_model() {
  const dialogRef = this.dialog.open(ProductQrCodeModelComponent, {
    width: '700px',

    data: {
      product_id: this.productDetail['id'],
      product_name: this.productDetail['product_name'],
      product_code: this.productDetail['cat_no']
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    console.log('The dialog was closed');
    this.detailProduct();
  });
}

change_scheme_status() {
  const dialogRef = this.dialog.open(ChangeSchemeStatusModelComponent, {
    width: '700px',

    data: {
      product_id: this.productDetail['id']
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    console.log('The dialog was closed');
    this.detailProduct();
  });
}

coupon_data: any = [];
qrCode_data: any = [];
total_page: any = '';
count: any;
page_limit: any = 50;
pagenumber: any = '';
start: any = 0;
state_name: any = [];
distributor_price: any = [];
retailer_price: any =[];


// scheme_data(type) {
//   this.scheme_tab_active = type;

//   this.serve.fetchData({ "id": this.product_id, 'type': type, 'start': this.start, 'pagelimit': this.page_limit }, "Product/scheme_data").subscribe(result => {
//     console.log(result);
//     this.coupon_data = result['coupon_data'];
//     this.count = result['count'];
//     this.total_page = Math.ceil(this.count / this.page_limit);
//     this.pagenumber = Math.ceil(this.start / this.page_limit) + 1;
//     console.log(this.pagenumber, this.total_page);

//     // this.tmp_productList=this.productlist;
//   });
// }

deleteCoupons(coupon_date) {
  this.dialog1.delete('Coupon Data !').then(result => {
    if (result) {
      this.serve.fetchData({ "id": this.product_id, 'coupon_date': coupon_date }, "Product/delete_coupon").subscribe(result => {
        console.log(result);
        // this.scheme_data('coupons');
        this.detailProduct();
      });
    }
  });
}

ExportCouponCode(coupon_date): void {
  this.serve.fetchData({ "id": this.product_id, 'coupon_date': coupon_date }, "Product/fetch_coupons").subscribe(result => {
    console.log(result);
    this.qrCode_data = result;
    console.log('*** QR Code Data ***');
    console.log(this.qrCode_data);
    if (this.qrCode_data) {
      console.log('** Export Coupon Code **');
      this.excelservice.exportAsExcelFile(this.qrCode_data, 'sample', this.productDetail.cat_no);
    }
  });
}

stateID: any;
editStatePrice(id) {
  console.log(id);
  this.stateID = id;
}

updateStateDetail(size, price) {
  console.log(this.stateID);

  // this.showSave = false;

  this.apidata = { id: this.stateID, product_mrp: price, product_size: size };
  console.log(this.apidata);
  // this.mode = 1;
  // this.serve.fetchData({ "sizemrp": this.apidata }, "/Product/update_product_detail").subscribe((result) => {
  //   console.log(result);
  //   this.detailProduct();
  // this.data.update_multiple_product_size = '';
  // this.data.update_multiple_product_price = ''
  // });

}

state_data: any = {};
savedata(action, i, j) {
  let stateWise = []
  console.log(this.state_data);

  if (action == 'all') {
    for (let index = 0; index < this.stateDetail.length; index++) {
      stateWise.push({ 'state_name': this.stateDetail[index].state_name, 'product_size': this.state_data['product_size'], 'product_id': this.product_id, "distributor_price": this.state_data.distributor_price,"retailer_price": this.state_data.retailer_price ,'direct_dealer_price': this.state_data.direct_dealer_price, })
    }


  }

  console.log(this.state_data);


  if (action == 'single') {
    stateWise.push({ 'state_name': this.stateDetail[i].state_name, 'product_size': this.stateDetail[i].sizeList[j].product_size, 'product_id': this.stateDetail[i].sizeList[j].product_id, "retailer_price": this.stateDetail[i].sizeList[j].retailer_price,"distributor_price": this.stateDetail[i].sizeList[j].distributor_price, 'direct_dealer_price': this.stateDetail[i].sizeList[j].direct_dealer_price, 'id': this.stateDetail[i].sizeList[j].id })
    if (stateWise[0].id == 0) {
      action = 'add';
    }
    else {
      action = 'update';
    }
  }

  let req_type = action

  this.serve.fetchData({ 'stateWise': stateWise, req_type: req_type }, "/Product/state_wise_price_update").subscribe((result) => {
    console.log(result);
    console.log(this.state_data);

    this.state_data = {};



    this.detailProduct();



  })

}

}


