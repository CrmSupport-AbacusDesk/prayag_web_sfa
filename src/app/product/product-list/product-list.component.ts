import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';
import { DatabaseService } from 'src/_services/DatabaseService';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { sessionStorage } from 'src/app/localstorage.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  animations: [slideToTop()]
})
export class ProductListComponent implements OnInit {
  productlist: any = [];
  tmp_productList: any = [];
  filter: any = false;
  data: any = [];
  page_limit: any = 50;
  start: any = 0;
  brand_list: any = [];
  product_brand: any = [];
  count: any;
  category_list: any = [];
  subCategory_list: any = [];
  total_page: any = '';
  pagenumber: any = '';
  loader: any;
  data_not_found = false;
  skelton: any = {}
  tab_active = 'all';
  scheme_active_count: any;
  
  assign_login_data: any = [];
  view_edit : boolean = true;
  view_add : boolean = true;
  view_delete : boolean = true;
  
  constructor(public dialog: DialogComponent, public serve: DatabaseService, public rout: Router, public toast: ToastrManager,public session: sessionStorage) {
    
    this.assign_login_data = this.session.getSession();
    this.assign_login_data = this.assign_login_data.value;
    this.assign_login_data = this.assign_login_data.assignModule;
    console.log(this.assign_login_data);
    const index = this.assign_login_data.findIndex(row => row.module_name == 'Product Master');
    console.log(index);
    
    this.assign_login_data[index].add == 'true' ? this.view_add = true : this.view_add = false;
    this.assign_login_data[index].edit == 'true' ? this.view_edit = true : this.view_edit = false;
    this.assign_login_data[index].delete == 'true' ? this.view_delete = true : this.view_delete = false;
    
    console.log(this.view_add);
    console.log(this.view_edit);
    console.log(this.view_delete);


    this.getBrandList();
    // this.getCategoryList();
    this.getSubCategoryList();
    this.skelton = new Array(100);
  }
  
  ngOnInit() {
    this.getProductList('all');
  }
  
  
  
  getProductList(type) {
    
    
    const sendData = {
      search_key: this.data.product_name,
      product_code: this.data.prod_code,
      description: this.data.desc,
    };
    
    if(type != 'notype'){
      this.tab_active = type;
    }
    
    
    this.loader = 1;
    
    
    this.serve.fetchData({ filter: sendData ,'category':this.data.category}, "Product/product_list").subscribe((result) => {
      
      console.log(result);
      
      
      this.productlist = result['product_list'];
      this.count = result['count'];
      this.scheme_active_count = result['scheme_active_count'];
      if (this.productlist.length == 0) {
        console.log("yes");
      }
      this.total_page = Math.ceil(this.count / this.page_limit);
      this.pagenumber = Math.ceil(this.start / this.page_limit) + 1;
      this.tmp_productList = this.productlist;
      setTimeout(() => {
        this.loader = '';
      }, 700);
      if (this.productlist.length == 0) {
        this.data_not_found = true;
      } else {
        this.data_not_found = false;
        
      }
    })
    
    this.serve.count_list();
  }
  excel_data: any = [];
  districtAppend:any;
  state4xl:any;
  exportAsXLSX(): void {
    for (let i = 0; i < this.productlist.length; i++) {
      
      console.log("in if");
      console.log(this.productlist);

        // this.districtAppend = this.productlist[i].multi_products[j]['product_mrp'] + ',' + this.districtAppend;
        // this.state4xl = this.productlist[i].multi_products[j]['product_size']+ ',' + this.state4xl
      this.excel_data.push({ 'Category': this.productlist[i].category,'Product Name': this.productlist[i].product_name, 'Product Code': this.productlist[i].product_code,  'Hsn Code': this.productlist[i].hsn, 'Gst Percent': this.productlist[i].gst,'Unit': this.productlist[i].unit,'Mrp': this.productlist[i].mrp });

      console.log(this.districtAppend);
      
      
    }
    
    
    this.serve.exportAsExcelFile(this.excel_data, 'Product List');
    this.excel_data = [];
    
  }
  
  // exportAsXLSX(): void {
  //   for (let i = 0; i < this.productlist.length; i++) {
  //     this.excel_data.push({ 'Product Name': this.productlist[i].product_name, 'Product Code': this.productlist[i].product_code, 'Category': this.productlist[i].category, 'Subcategory': this.productlist[i].sub_category, 'Description': this.productlist[i].description });
  //   }
  //   this.serve.exportAsExcelFile(this.excel_data, 'PRODUCT SHEET');
  // }
  
  
  goToDetailHandler(pId) {
    
    console.log(pId);
    window.open(`/product-detail/` + pId);
  }
  
  
  deleteProduct(id) {
    this.dialog.delete('Product Data !').then((result) => {
      if (result) {
        console.log('Test Done');
        let value = { "id": id }
        this.serve.fetchData(value, "Product/delete_product").subscribe((result) => {
          if (result) {
            this.getProductList('all');
          }
        });
      }
    });
  }
  
  
  refresh() {
    this.getProductList('all');
  }
  
  
  productdetail: any = [];
  
  detailProduct(id) {
    let value = { "id": id }
    this.serve.fetchData(value, "Product/product_detail").subscribe((result => {
      this.productdetail = result['product_detail'];
      if (result) {
        this.rout.navigate(['/product-detail/' + id]);
      }
    }))
  }
  
  Filter() {
    this.filter = true;
  }
  close() {
    this.filter = false;
  }
  
  clear() {
    this.data.brand = "";
    this.data.category = "";
    this.data.sub_category = "";
    // this.serve.fetchData({'brand':this.data.brand,'category':this.data.category,'sub_category':this.data.sub_category,"product_name":this.data.product_name,"cat_no":this.data.cat_no,'start':this.start,'pagelimit':this.page_limit},"Product/product_list").subscribe((result)=>{
    //   this.productlist=result['product_list'];
    // })
    this.refresh();
  }
  
  getBrandList() {
    this.serve.fetchData(0, "/Product/product_brand_list/").subscribe((result) => {
      this.brand_list = result['brand'];
      this.product_brand = this.brand_list;
    });
  }
  
  brand;
  tmp_category: any = [];
  category;
  tmp_subcategory: any = [];
  getCategoryList() {
    this.serve.fetchData(0, "Product/product_category_list").subscribe((result) => {
      this.category_list = result['category'];
      this.tmp_category = this.category_list;
    });
  }
  
  
  getSubCategoryList() {
    // this.category=this.data.category;
    // let value={"brand":this.brand,"category":this.category};
    
    this.serve.fetchData('', "Product/product_sub_category_list").subscribe((result) => {
      this.subCategory_list = result['sub_category'];
      this.tmp_subcategory = this.subCategory_list;
      console.log(this.subCategory_list);
      
    });
  }
  
  brand_array_filter(data, array) {
    
    this.brand_list = this.filterList(data.toUpperCase(), array);
  }
  
  category_array_filter(data, array) {
    this.category_list = this.filterList(data.toUpperCase(), array);
  }
  sub_categoryy_array_filter(data, array) {
    this.subCategory_list = this.filterList(data.toUpperCase(), array);
  }
  
  new_array: any = [];
  filterList(search_word, search_array) {
    this.new_array = [];
    for (var i = 0; i < search_array.length; i++) {
      if (search_array[i].toUpperCase().search(search_word) !== -1) {
        this.new_array.push(search_array[i]);
      }
    }
    return this.new_array;
  }
  
  
}