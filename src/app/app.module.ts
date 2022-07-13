import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import{ addTravelListModal } from '../app/travel/add-travel-list/add-travel-list-modal.component'
import { Routes, RouterModule } from '@angular/router';
import { sessionStorage } from './localstorage.service';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MasterTabComponent } from './master-tab/master-tab/master-tab.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { MasterTabListComponent } from './master-tab-list/master-tab-list/master-tab-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { SaleUserListComponent } from './user/sale-user-list/sale-user-list.component';
import { SaleUserDetailComponent } from './user/sale-user-detail/sale-user-detail.component';
import { DatabaseService } from 'src/_services/DatabaseService'
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardLog } from './AuthGuardLog';
import { NgxPaginationModule} from 'ngx-pagination';
import { AuthComponentGuard } from './auth-component.guard';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { UserEmailModalComponent } from './user/user-email-modal/user-email-modal.component';
import { AddDiscountComponent } from './discount/add-discount/add-discount.component';
import { DiscountListComponent } from './discount/discount-list/discount-list.component';
import { SystemUserDetailComponent } from './user/system-user-detail/system-user-detail.component';
import { SystemUserListComponent } from './user/system-user-list/system-user-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { MatDialogModule, MatIconModule, MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { NgxEditorModule } from 'ngx-editor';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DialogComponent } from './dialog.component';
import { MyNetworkComponent } from './user/my-network/my-network.component';
import { AddHolidayComponent } from './leave-and-holiday/add-holiday/add-holiday.component';
import { AddLeaveRulesComponent } from './leave-and-holiday/add-leave-rules/add-leave-rules.component';
import { HolidayListComponent } from './leave-and-holiday/holiday-list/holiday-list.component';
import { LeaveRuleListComponent } from './leave-and-holiday/leave-rule-list/leave-rule-list.component';
import { AddDistributionComponent } from './distribution/add-distribution/add-distribution.component';
import { DistributionDetailComponent } from './distribution/distribution-detail/distribution-detail.component';
import { DistributionListComponent } from './distribution/distribution-list/distribution-list.component';
import { DistributionOrderListComponent } from './distribution/distribution-order-list/distribution-order-list.component';
import { FollowupListComponent } from './followup/followup-list/followup-list.component';
import { AddLeadComponent } from './lead/add-lead/add-lead.component';
import { LeadListComponent } from './lead/lead-list/lead-list.component';
import { LeadDetailComponent } from './lead/lead-detail/lead-detail.component';
import { UserLeadListComponent } from './user/user-lead-list/user-lead-list.component';
import { EditleadComponent } from './editlead/editlead.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AddAnnoucementComponent } from './annoucement/add-annoucement/add-annoucement.component';
import { AnnoucementListComponent } from './annoucement/annoucement-list/annoucement-list.component';
import { AddGiftComponent } from './pop_and_gift/add-gift/add-gift.component';
import { GiftListComponent } from './pop_and_gift/gift-list/gift-list.component';
import { TerritoryAddComponent } from './territory/territory-add/territory-add.component';
import { TerritoryListComponent } from './territory/territory-list/territory-list.component';
import { CategoryMasterComponent } from './category-master/category-master.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { DealerComponent } from './distribution/dealer/dealer.component';
import { DirectDealerComponent } from './distribution/direct-dealer/direct-dealer.component';
import { DistributionEditComponent } from './distribution/distribution-edit/distribution-edit.component';
import { CheckinComponent } from './checkin/checkin.component';
import { LiveTrackComponent } from './live-track/live-track.component';
import { LiveTrackDetailComponent } from './live-track-detail/live-track-detail.component';
import { DealerLeadListComponent } from './lead/dealer-lead-list/dealer-lead-list.component';
import { PlumberLeadListComponent } from './lead/plumber-lead-list/plumber-lead-list.component';
import { ConsumerLeadListComponent } from './lead/consumer-lead-list/consumer-lead-list.component';
import { StatusModalComponent } from './order/status-modal/status-modal.component';
import { SecondaryOrderListComponent } from './order/secondary-order-list/secondary-order-list.component';
import { ConsumerPlumberDetailComponent } from './consumer-plumber-detail/consumer-plumber-detail.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { ChartsModule } from 'ng2-charts';
import { ChartsModule } from 'ng2-charts';
import { BannerListComponent } from './banner/banner-list/banner-list.component';
import { BannerAddComponent } from './banner/banner-add/banner-add.component';
import { CurrencywordsPipe } from './currencywords.pipe';
import { NumericWordsPipe } from './numeric-words.pipe';
import { WishesComponent } from './wishes/wishes.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PlumberDetailComponent } from './lead/plumber-detail/plumber-detail.component';
import { OfferAddComponent } from './offers/offer-add/offer-add.component';
import { OfferListComponent } from './offers/offer-list/offer-list.component';
import { QrCodeModelComponent } from './qr-code-model/qr-code-model.component';
import { OfferDetailComponent } from './offers/offer-detail/offer-detail.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DwrComponent } from './dwr/dwr.component';
import { UserTargetComponent } from './user/user-target/user-target.component';
import { LeavesComponent } from './user_leaves/leaves/leaves.component';
import { ChangeStatusComponent } from './user_leaves/change-status/change-status.component';

import { AddPrimaryOrderValueComponent } from './distribution/add-primary-order-value/add-primary-order-value.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { TravelListComponent } from './travel/travel-list/travel-list.component';
import { PrimaryVsSecondaryComponent } from './primary-vs-secondary/primary-vs-secondary.component';
import { DistributionLegderModelComponent } from './distribution/distribution-legder-model/distribution-legder-model.component';
import { SecOrdReportModelComponent } from './sec-ord-report-model/sec-ord-report-model.component';
import { DistriutorSalesReportComponent } from './distriutor-sales-report/distriutor-sales-report.component';
import { ProductQrCodeModelComponent } from './product/product-qr-code-model/product-qr-code-model.component';
import { ChangeSchemeStatusModelComponent } from './product/change-scheme-status-model/change-scheme-status-model.component';
import { ExportexcelService } from './service/exportexcel.service';
import { PlumberEditModelComponent } from './lead/plumber-edit-model/plumber-edit-model.component';
import { MonthlyDwrComponent } from './monthly-dwr/monthly-dwr.component';
import { OrderEditModalComponent } from './order/order-edit-modal/order-edit-modal.component';
import { ProductWiseReportComponent } from './product-wise-report/product-wise-report.component';
import { DirectOrderComponent } from './order/direct-order/direct-order.component';
import { QrCodeListComponent } from './qr-code-list/qr-code-list.component';
import { SchemeMasterComponent } from './scheme-master/scheme-master.component';
import { MyFilterPipe } from './shared/pipes/my-filter.pipe';
import { RedeemRequestListComponent } from './redeem-request-list/redeem-request-list.component';
import { OrderDispatchComponent } from './order/order-dispatch/order-dispatch.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { UpdateAdminModelComponent } from './user/update-admin-model/update-admin-model.component';
import { DistributionComponent } from './distribution/distribution.component';
import { DrDiscountComponent } from './distribution/dr-discount/dr-discount.component';
import { DisOtpVarificationComponent } from './distribution/dis-otp-varification/dis-otp-varification.component';
import { DisExecutiveModelComponent } from './distribution/dis-executive-model/dis-executive-model.component';
import { AllowancesComponent } from './allowances/allowances.component';
import { AnnoucementDetailComponent } from './annoucement/annoucement-detail/annoucement-detail.component';
import { AddExpenseComponent } from './expense/add-expense/add-expense.component';
import { DetailExpenseComponent } from './expense/detail-expense/detail-expense.component';
import { ListExpenseComponent } from './expense/list-expense/list-expense.component';
import { ExpenseModalComponent } from './expense/expense-modal/expense-modal.component';
import { DirectDealerLeadComponent } from './lead/direct-dealer-lead/direct-dealer-lead.component';
import { UserTargetModalComponent } from './user/user-target-modal/user-target-modal.component';
import { TravelStatusModalComponent } from './travel/travel-status-modal/travel-status-modal.component';
import { ContractorMeetListComponent } from './contractor-meet/contractor-meet-list/contractor-meet-list.component';
import { ContractorMeetDetailComponent } from './contractor-meet/contractor-meet-detail/contractor-meet-detail.component';
import { ContractorMeetStatusModalComponent } from './contractor-meet/contractor-meet-status-modal/contractor-meet-status-modal.component';
import { VisitingCardListComponent } from './visiting-card/visiting-card-list/visiting-card-list.component';
import { VisitingCardStatusModalComponent } from './visiting-card/visiting-card-status-modal/visiting-card-status-modal.component';
import { LeadAddActivityModelComponent } from './lead/lead-add-activity-model/lead-add-activity-model.component';
import { LeadAddFollowupModelComponent } from './lead/lead-add-followup-model/lead-add-followup-model.component';
import { QuotationDetailModalComponent } from './lead/quotation-detail-modal/quotation-detail-modal.component';
import { PopGiftListComponent } from './pop-gift/pop-gift-list/pop-gift-list.component';
import { PopGiftAddComponent } from './pop-gift/pop-gift-add/pop-gift-add.component';
import { PopGiftDetailComponent } from './pop-gift/pop-gift-detail/pop-gift-detail.component';
import { PopGiftIssueModalComponent } from './pop-gift/pop-gift-issue-modal/pop-gift-issue-modal.component';
import { QuotationListComponent } from './quotation/quotation-list/quotation-list.component';
import { QuotationDetailComponent } from './quotation/quotation-detail/quotation-detail.component';

import { LocationMasterComponent } from './location-master/location-master.component';
import { from } from 'rxjs';
import { TravelPlanDetailComponent } from './travel/travel-plan-detail/travel-plan-detail.component';

import { DistributorModelComponent } from '../app/distribution/distributor-model/distributor-model.component';
import { AgmCoreModule } from '@agm/core';
import {NgxImageCompressService} from 'ngx-image-compress';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ImageModuleComponent } from './image-module/image-module.component';
import { DailyactivityComponent } from './dailyactivity/dailyactivity.component';
import * as $ from "jquery";
import { QuotationAddComponent } from './quotation/quotation-add/quotation-add.component';
import { FollowupDetailComponent } from './followup/followup-detail/followup-detail.component';
import { FollowupEditComponent } from './followup/followup-edit/followup-edit.component';
import { ExpesneEditComponent } from './expense/expesne-edit/expesne-edit.component';
import { MatTimepickerModule } from 'mat-timepicker';
import { UserviewTargetComponent } from './userview-target/userview-target.component';
import { DistributorTargetComponent } from './distributor-target/distributor-target.component';
import { UploadFileModalComponent } from './upload-file-modal/upload-file-modal.component';
import { ActivityreportComponent } from './activityreport/activityreport.component';
import { ConvertuploaddocumentComponent } from './convertuploaddocument/convertuploaddocument.component';
import { DocumentsComponent } from './documents/documents.component';
import { ConvertuploadimageComponent } from './convertuploadimage/convertuploadimage.component';
import { AttendancemodalComponent } from './attendancemodal/attendancemodal.component';
import { JointmodalComponent } from './jointmodal/jointmodal.component';
import { TargetReportComponent } from './target-report/target-report.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { CheckindocumentComponent } from './checkindocument/checkindocument.component';
import { BnNgIdleService } from 'bn-ng-idle';





// import { PopGiftListPage } from './pop-gift/pop-gift-list/pop-gift-list';
// import { PopGiftAddPage } from './pop-gift/pop-gift-add/pop-gift-add';
// import { ComplaintsChangeStatusComponent } from './complaints/complaints-change-status/complaints-change-status.component';
// import { DatePikerFormat } from 'src/_Pipes/DatePikerFormat.pipe';
// import { VideoSafe } from 'src/_Pipes/VideoSafe.pipe';
// import { ComplaintsNatureProblemComponent } from './complaints/complaints-nature-problem/complaints-nature-problem.component';
// import { ComplaintsAssignPlumberComponent } from './complaints/complaints-assign-plumber/complaints-assign-plumber.component';
// import { ComplaintsComponent } from './complaints/complaints.component';
// import { ComplaintRemarkComponent } from './complaints/complaint-remark/complaint-remark.component';
// import { ComplaintsAddComponent } from './complaints/complaints-add/complaints-add.component';
// import { ComplaintsEditGalleryComponent } from './complaints/complaints-edit-gallery/complaints-edit-gallery.component';
// import { ComplaintsDetailComponent } from './complaints/complaints-detail/complaints-detail.component';
// import { Crypto } from 'src/_Pipes/Crypto.pipe';

const routes: Routes = [
    {path:'',component:LoginComponent,canActivate:[AuthGuard]},
    {path:'',component:NavigationComponent},
    {path:'add-tavel',component: addTravelListModal,canActivate:[AuthComponentGuard], data:{expectedRole:['1']}},
    {path:'activityreport',component: ActivityreportComponent,canActivate:[AuthComponentGuard], data:{expectedRole:['1']}},
    {path:'documents',component: DocumentsComponent,canActivate:[AuthComponentGuard], data:{expectedRole:['1']}},


    {path:'add-quotation',component: QuotationAddComponent,canActivate:[AuthComponentGuard], data:{expectedRole:['1']}},
    // {path:'dashboard',component:DashboardComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1','24','19','10','14','9','23','29','28','25','15','20','26','27','21','16','22']}},
    {path:'travel-detail/:id',component: TravelPlanDetailComponent,canActivate:[AuthComponentGuard], data:{expectedRole:['1']}},
    {path:'dashboard',component:DashboardComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: 'add-product', component: AddProductComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: 'location-Master', component: LocationMasterComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "product-list", component: ProductListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "product-detail/:id", component:ProductDetailComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "user-add", component: UserAddComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "sale-user-list", component: SaleUserListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "sale-user-target/:id", component: UserTargetComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "sale-user-detail/:id", component: SaleUserDetailComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "add-discount/:id", component: AddDiscountComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "discount-list", component: DiscountListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "system-user-detail/:id", component:SystemUserDetailComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "system-user-list", component:SystemUserListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "add-order", component:AddOrderComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "order-list", component:OrderListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1','2']}},
    { path: "secondary-order-list", component:SecondaryOrderListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "order-detail/:id", component:OrderDetailComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1','2']}},
    { path: "my-network/:id", component: MyNetworkComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "add-holiday", component: AddHolidayComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "add-leave-rules", component: AddLeaveRulesComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "holiday-list", component: HolidayListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "leave-rule-list", component: LeaveRuleListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "add-distribution/:type", component: AddDistributionComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "distribution-detail/:id", component: DistributionDetailComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1','2']}},
    { path: "distribution-list/:id/:type", component: DistributionListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "distribution-order-list", component: DistributionOrderListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "followup-list", component: FollowupListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "followup-detail/:id", component: FollowupDetailComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1','2']}},

    { path: "add-lead/:id", component: AddLeadComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "lead-list/:id/:type", component: LeadListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "lead-detail/:id", component: LeadDetailComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "user-lead-list/:id", component: UserLeadListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "categorymaster", component: CategoryMasterComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "attendance", component: AttendenceComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "quotation", component: QuotationListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "quotation-detail/:id", component: QuotationDetailComponent,canActivate:[AuthComponentGuard],data:{ expectedRole: ['1','2']}},

    { path: "dealer", component: DealerComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "direct-dealer", component: DirectDealerComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "checkin", component: CheckinComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "live_track", component: LiveTrackComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "livetrack-detail/:id/:date", component: LiveTrackDetailComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "dealer-lead-list", component: DealerLeadListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "direct-dealer-lead", component: DirectDealerLeadComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "consumer-lead-list", component: ConsumerLeadListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "plumber-lead-list", component: PlumberLeadListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "banner-banner-list", component: BannerListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "banner-banner-add", component: BannerAddComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "banner-banner-detail/:id", component: BannerAddComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "wishes", component: WishesComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "dwr", component: DwrComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "monthly-dwr", component: MonthlyDwrComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "leave-list", component: LeavesComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "travel-list", component: TravelListComponent, canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "add-order/:dr_id", component: AddOrderComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1','2']}},
    { path: "primary-vs-secondary", component: PrimaryVsSecondaryComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "distriutor-sales-report", component: DistriutorSalesReportComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "plumber-detail.component/:id", component: PlumberDetailComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "product-wise-report", component: ProductWiseReportComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "direct-order", component: DirectOrderComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "qr-code-list", component: QrCodeListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},

    { path: "redeem-request-list", component: RedeemRequestListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "schememaster", component: SchemeMasterComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},

    { path: "followup-list", component: FollowupListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},

    { path: "expense-list", component: ListExpenseComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "expense-add", component: AddExpenseComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "expense-detail/:id", component: DetailExpenseComponent, canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},

    { path: "allowances", component: AllowancesComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},

    { path: "announcement-list", component: AnnoucementListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "add-announcement", component: AddAnnoucementComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "detail-announcement/:id", component: AnnoucementDetailComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},

    { path: "contractor-meet", component: ContractorMeetListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "contractor-detail/:id", component: ContractorMeetDetailComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},

    { path: "visiting-card", component: VisitingCardListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "pop-gift-list", component: PopGiftListComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "pop-gift-add/:id", component: PopGiftAddComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "pop-gift-detail/:id", component: PopGiftDetailComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "quotation-add", component: QuotationAddComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "distributor-target", component: DistributorTargetComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "userview-target", component: UserviewTargetComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},
    { path: "upload-file-modal", component: UploadFileModalComponent,canActivate:[AuthComponentGuard], data:{ expectedRole: ['1']}},


];


@NgModule({
    declarations: [
        addTravelListModal,
        AppComponent,
        GiftListComponent,
        // DatePikerFormat,
        // VideoSafe,
        // ComplaintsChangeStatusComponent,
        // ComplaintsNatureProblemComponent,
        // ComplaintsAssignPlumberComponent,
        // ComplaintsComponent,
        // ComplaintsEditGalleryComponent,
        // ComplaintsDetailComponent,
        // ComplaintsAddComponent,
        // ComplaintRemarkComponent,
        // Crypto,
        AddGiftComponent,
        TerritoryListComponent,
        TerritoryAddComponent,
        LoginComponent,
        HeaderComponent,
        OfferAddComponent,
        PlumberDetailComponent,
        AnnoucementListComponent,
        OfferListComponent,
        OfferDetailComponent,
        FooterComponent,
        QrCodeModelComponent,
        NavigationComponent,
        MasterTabComponent,
        AddProductComponent,
        MasterTabListComponent,
        ProductListComponent,
        UserAddComponent,
        SaleUserListComponent,
        AddAnnoucementComponent,
        SaleUserDetailComponent,
        DashboardComponent,
        UserEmailModalComponent,
        AddDiscountComponent,
        DiscountListComponent,
        SystemUserDetailComponent,
        SystemUserListComponent,
        ProductDetailComponent,
        ConfirmDialogComponent,
        EditAddressComponent,
        AddOrderComponent,
        OrderListComponent,
        OrderDetailComponent,
        MyNetworkComponent,
        AddHolidayComponent,
        AddLeaveRulesComponent,
        HolidayListComponent,
        AddDistributionComponent,
        DistributionDetailComponent,
        DistributionListComponent,
        DistributionOrderListComponent,
        LeaveRuleListComponent,
        FollowupListComponent,
        AddLeadComponent,

        LeadListComponent,
        LeadDetailComponent,
        UserLeadListComponent,
        EditleadComponent,
        CategoryMasterComponent,
        AddCategoryComponent,
        AttendenceComponent,
        DealerComponent,
        DirectDealerComponent,
        DistributionEditComponent,
        CheckinComponent,
        LiveTrackComponent,
        LiveTrackDetailComponent,
        DealerLeadListComponent,
        PlumberLeadListComponent,
        ConsumerLeadListComponent,
        StatusModalComponent,
        SecondaryOrderListComponent,
        ConsumerPlumberDetailComponent,
        BannerListComponent,
        BannerAddComponent,
        CurrencywordsPipe,
        NumericWordsPipe,
        WishesComponent,
        DwrComponent,
        UserTargetComponent,
        LeavesComponent,
        ChangeStatusComponent,
        AddPrimaryOrderValueComponent,
        TravelListComponent,
        PrimaryVsSecondaryComponent,
        DistributionLegderModelComponent,
        SecOrdReportModelComponent,
        DistriutorSalesReportComponent,
        ProductQrCodeModelComponent,
        ChangeSchemeStatusModelComponent,
        PlumberEditModelComponent,
        MonthlyDwrComponent,
        OrderEditModalComponent,
        ProductWiseReportComponent,
        DirectOrderComponent,
        QrCodeListComponent,
        SchemeMasterComponent,
        MyFilterPipe,
        RedeemRequestListComponent,
        OrderDispatchComponent,
        UpdateAdminModelComponent,
        DistributionComponent,
        DrDiscountComponent,
        DisOtpVarificationComponent,
        DisExecutiveModelComponent,
        AllowancesComponent,
        AnnoucementDetailComponent,
        AddExpenseComponent,
        DetailExpenseComponent,
        ListExpenseComponent,
        ExpenseModalComponent,
        DirectDealerLeadComponent,
        UserTargetModalComponent,
        TravelStatusModalComponent,
        ContractorMeetListComponent,
        ContractorMeetDetailComponent,
        ContractorMeetStatusModalComponent,
        VisitingCardListComponent,
        VisitingCardStatusModalComponent,
        LeadAddActivityModelComponent,
        LeadAddFollowupModelComponent,
        QuotationDetailModalComponent,
        PopGiftListComponent,
        PopGiftAddComponent,
        PopGiftDetailComponent,
        PopGiftIssueModalComponent,
        QuotationListComponent,
        LocationMasterComponent,
        TravelPlanDetailComponent,
        DistributorModelComponent,
        QuotationDetailComponent,
        ImageModuleComponent,
        DailyactivityComponent,
        QuotationAddComponent,
        FollowupDetailComponent,
        FollowupEditComponent,
        ExpesneEditComponent,
        UserviewTargetComponent,
        DistributorTargetComponent,
        UploadFileModalComponent,
        ActivityreportComponent,
        ConvertuploaddocumentComponent,
        DocumentsComponent,
        ConvertuploadimageComponent,
        AttendancemodalComponent,
        JointmodalComponent,
        TargetReportComponent,
        OrderdetailsComponent,
        CheckindocumentComponent

    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCcc41_Zu1s8GeOSTbIRbCxU8iZlCogz2c'
            /* apiKey is required, unless you are a
            premium customer, in which case you can
            use clientId
            */
          }),
        BrowserModule,
        FormsModule,
        ChartsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NgxPaginationModule,
        NoopAnimationsModule,
        MatDialogModule,
        FilterPipeModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        ToastrModule.forRoot(),
        MatButtonToggleModule,
        NgxEditorModule,
        AngularFontAwesomeModule,
        InfiniteScrollModule,
        AutocompleteLibModule,
        RichTextEditorAllModule,
        MatTimepickerModule,
        MatIconModule,
        NgMultiSelectDropDownModule.forRoot()
        // FusionChartsModule
    ],
    providers: [
        DatabaseService,
        AuthGuard,
        AuthGuardLog,
        AuthComponentGuard,
        sessionStorage,
        DialogComponent,
        BnNgIdleService,
        ExportexcelService,
        NgxImageCompressService,
    ],

    entryComponents: [ConvertuploaddocumentComponent,
         DailyactivityComponent,OrderdetailsComponent,CheckindocumentComponent,
        ImageModuleComponent ,DisExecutiveModelComponent,DisOtpVarificationComponent,DrDiscountComponent,UpdateAdminModelComponent,UserEmailModalComponent,ConfirmDialogComponent,EditAddressComponent,EditleadComponent,AddCategoryComponent,DistributionEditComponent,StatusModalComponent,ChangeStatusComponent,AddPrimaryOrderValueComponent,DistributionLegderModelComponent,SecOrdReportModelComponent,ProductQrCodeModelComponent,ChangeSchemeStatusModelComponent,PlumberEditModelComponent,OrderEditModalComponent,OrderDispatchComponent,
        ExpenseModalComponent,UserTargetModalComponent,JointmodalComponent,AttendancemodalComponent,TravelStatusModalComponent, ContractorMeetStatusModalComponent, VisitingCardStatusModalComponent, LeadAddActivityModelComponent, LeadAddFollowupModelComponent, QuotationDetailModalComponent,PopGiftIssueModalComponent,addTravelListModal,TravelPlanDetailComponent,DistributorModelComponent, FollowupEditComponent, ExpesneEditComponent,ConvertuploadimageComponent

    ],

    exports: [RouterModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
