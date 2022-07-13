import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { SaleUserListComponent } from './user/sale-user-list/sale-user-list.component';
import { SaleUserDetailComponent } from './user/sale-user-detail/sale-user-detail.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardLog } from './AuthGuardLog';



// const routes: Routes = [
//   {path:'',component:LoginComponent},
//   {path:'dashboard',component:AppComponent,canActivate:[AuthGuard]},
//   { path: "add-product", component: AddProductComponent,canActivate:[AuthGuard] },
//   { path: "product-list", component: ProductListComponent,canActivate:[AuthGuard] },
//   { path: "user-add", component: UserAddComponent,canActivate:[AuthGuard] },
//   { path: "sale-user-list", component: SaleUserListComponent,canActivate:[AuthGuard]},
//   { path: "sale-user-detail", component: SaleUserDetailComponent,canActivate:[AuthGuard] },
// ];

@NgModule({


  imports: [
    // RouterModule.forRoot(routes),  
  ],
  // exports: [RouterModule]
})
export class AppRoutingModule { }
