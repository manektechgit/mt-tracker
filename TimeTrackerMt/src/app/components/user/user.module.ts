import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LoginUserHeaderComponent } from 'src/app/header/login-user-header/login-user-header.component';
import { LoginUserFooterComponent } from 'src/app/footer/login-user-footer/login-user-footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { UserAuthGuard } from 'src/app/_guards/user-auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { ManegeCompanyComponent } from './manege-company/manege-company.component';
import { AddEditCompanyComponent } from './manege-company/add-edit-company/add-edit-company.component';
import { FilterappsettingPipe } from 'src/app/Pipes/filter-appsetting.pipe';
import { FilterappsettingsPipe } from 'src/app/Pipes/filter-appsettings.pipe';
// import { FilterCompanyPipe } from 'src/app/Pipes/filter-company.pipe';
import { ReportsComponent } from './reports/reports.component';
import { AddEditComponent } from './department/add-edit/add-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterCategorySubCategoryPipe } from '../../pipes/filter-category-sub-category.pipe';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { InsertUpdateComponent } from './user-detail/insert-update/insert-update.component';
import { InviteComponent } from './invite/invite.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { AddEditProjectComponent } from './manage-projects/add-edit-project/add-edit-project.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { AddEditTaskComponent } from './manage-tasks/add-edit-task/add-edit-task.component';
import { AppsettingComponent } from './appsetting/appsetting.component';
import { AddEditAppsettingComponent } from './appsetting/add-edit-appsetting/add-edit-appsetting.component';
import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppsettingsComponent } from './appsettings/appsettings.component';
import { AddEditAppsettingsComponent } from './appsettings/add-edit-appsettings/add-edit-appsettings.component';
import { DashPipe } from 'src/app/Pipes/dash.pipe';
import { MenuComponent } from './menu/menu.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ReportSummaryComponent } from './report-summary/report-summary.component';
import { TabViewModule } from 'primeng/tabview';
import { UserReportComponent } from './user-report/user-report.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { AttendencehourComponent } from './attendencehour/attendencehour.component';
import { AddEditAttendencehourComponent } from './attendencehour/add-edit-attendencehour/add-edit-attendencehour.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ManageCardComponent } from './manage-card/manage-card.component';
import { AddEditCardComponent } from './manage-card/add-edit-card/add-edit-card.component';
import { SliderModule } from 'primeng/slider';
import { CompanyPlanComponent } from './company-plan/company-plan.component';
import { PlanMasterComponent } from './plan-master/plan-master.component';
import { AddEditPlanComponent } from './plan-master/add-edit-plan/add-edit-plan.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { NgxPayPalModule } from 'ngx-paypal';
import { PlanPaymentComponent } from './company-plan/plan-payment/plan-payment.component';
import { HoursTrackedReportComponent } from './hours-tracked-report/hours-tracked-report.component';
@NgModule({
  declarations: [
    UserComponent,
    LoginUserHeaderComponent,
    LoginUserFooterComponent,
    ManegeCompanyComponent,
    AddEditCompanyComponent,
    // FilterCompanyPipe,
    ReportsComponent,
    DashboardComponent,
    DepartmentComponent,
    AddEditComponent,
    FilterCategorySubCategoryPipe,
    UserDetailComponent,
    InsertUpdateComponent,
    ProfileComponent,
    ManageProjectsComponent,
    ManageTasksComponent,
    ManageCardComponent,
    AddEditProjectComponent,
    AddEditTaskComponent,
    AppsettingComponent,
    AddEditAppsettingComponent,
    FilterappsettingPipe,
    FilterappsettingsPipe,
    MyActivitiesComponent,
    AppsettingsComponent,
    AddEditAppsettingsComponent,
    DashPipe,
    MenuComponent,
    ReportSummaryComponent,
    UserReportComponent,
    ReportDetailComponent,
    AttendencehourComponent,
    AddEditAttendencehourComponent,
    InviteComponent,
    AddEditCardComponent,
    PlanMasterComponent,
    AddEditPlanComponent,
    CompanyPlanComponent,
    PlanPaymentComponent,
    HoursTrackedReportComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    NgbModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    NgMultiSelectDropDownModule.forRoot(),
    MultiSelectModule,
    CalendarModule,
    TabViewModule,
    RadioButtonModule,
    SliderModule,
    TabMenuModule,
    NgxPayPalModule
  ],
  providers: [UserAuthGuard]
})
export class UserModule { }
