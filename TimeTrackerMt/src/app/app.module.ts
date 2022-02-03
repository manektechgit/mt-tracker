import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { NgxImageCompressService } from 'ngx-image-compress';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
// import { DashPipe } from './Pipes/dash.pipe';
import { ToastModule } from 'primeng/toast';
import { MenuService } from 'src/app/_services/menu.service';
import { ReportsService } from 'src/app/_services/reports.service';
import { ReportSummeryService } from 'src/app/_services/reportSummery.service';
import { NgxElectronModule } from '../../node_modules/ngx-electron';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserModule } from './components/register-user/register-user.module';
import { allNonLoginComponents } from './components/weblist';
import { AcceptInvitationComponent } from './components/weblist/accept-invitation/accept-invitation.component';
import { FooterComponent } from './footer/footer/footer.component';
import { HeaderComponent } from './header/header/header.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { SharedModule } from './shared/shared.module';
import { ApiPrefixInterceptor } from './_interceptors/api-prefix.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoaderInterceptor } from './_interceptors/loader.interceptor';
import { allServices } from './_services';
import { ElectronservService } from './_services/electronserv.service';
import { TitleService } from './_services/title.service';
import { UserReportsService } from './_services/userReports.service';
import { CardModule } from 'primeng/card';
import { CompanyPlanService } from './_services/companyplan.service';
import { NgxPayPalModule } from 'ngx-paypal';
import { PlanPaymentService } from './_services/planpayment.service';
//import {MenubarModule} from 'primeng/primeng';


const dbConfig: DBConfig = {
  name: 'MtTrackerDB',
  version: 1,
  objectStoresMeta: [{
    store: 'AttendenceLog',
    storeConfig: { keyPath: 'LocalAttedenceLogId', autoIncrement: true },
    storeSchema: [
      { name: 'Id', keypath: 'Id', options: { unique: false } },
      { name: 'UserId', keypath: 'UserId', options: { unique: false } },
      { name: 'ProjectId', keypath: 'ProjectId', options: { unique: false } },
      { name: 'InTime', keypath: 'InTime', options: { unique: false } },
      { name: 'OutTime', keypath: 'OutTime', options: { unique: false } },
      { name: 'InOutFlage', keypath: 'InOutFlage', options: { unique: false } },
      { name: 'Date', keypath: 'Date', options: { unique: false } },
      { name: 'IsSynced', keypath: 'IsSynced', options: { unique: false } }
    ]
  }],
};

@NgModule({
  declarations: [
    AppComponent,
    ...allNonLoginComponents,
    LoaderComponent,
    AcceptInvitationComponent
    // DashPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    SharedModule,
    NgxElectronModule,
    ToastModule,
    BrowserAnimationsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    RegisterUserModule,
    CardModule,
    NgxPayPalModule
    //MenubarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ...allServices,
    NgxImageCompressService,
    ReportsService,
    ElectronservService,
    MenuService,
    MessageService,
    ConfirmDialogModule,
    ButtonModule,
    MessagesModule,
    ReportSummeryService,
    UserReportsService,
    CompanyPlanService,
    PlanPaymentService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(titleService: TitleService, electronService: ElectronservService) {
    titleService.init();
  }
}
