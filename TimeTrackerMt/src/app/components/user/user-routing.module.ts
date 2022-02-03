import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserAuthGuard } from 'src/app/_guards/user-auth.guard';
import { ManegeCompanyComponent } from './manege-company/manege-company.component';
import { ReportsComponent } from './reports/reports.component';
import { DepartmentComponent } from './department/department.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { AppsettingComponent } from './appsetting/appsetting.component';
import { AppsettingsComponent } from './appsettings/appsettings.component';
import { MyActivitiesComponent } from './my-activities/my-activities.component';
import { MenuComponent } from './menu/menu.component';
import { ReportSummaryComponent } from './report-summary/report-summary.component';
import { UserReportComponent } from './user-report/user-report.component';
import { AttendencehourComponent } from './attendencehour/attendencehour.component';
import { from } from 'rxjs';
import { ManageCardComponent } from './manage-card/manage-card.component';
import { CompanyPlanComponent } from './company-plan/company-plan.component';
import { PlanMasterComponent } from './plan-master/plan-master.component';
import { HoursTrackedReportComponent } from './hours-tracked-report/hours-tracked-report.component';
const routes: Routes = [{
  path: '', component: UserComponent, canActivate: [UserAuthGuard], canActivateChild: [UserAuthGuard], children: [
    {
      path: '', pathMatch: 'full', redirectTo: 'dashboard'
    },
    {
      path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' }
    },
    {
      path: 'department', component: DepartmentComponent, data: { title: 'Department' }
    },
    {
      path: 'profile', component: ProfileComponent, data: { title: 'Profile' }
    },
    {
      path: 'manage-projects', component: ManageProjectsComponent, data: { title: 'Project' }
    },
    {
      path: 'manage-tasks', component: ManageTasksComponent, data: { title: 'Task' }
    },
    {
      path: 'user-detail', component: UserDetailComponent, data: { title: 'UserDetail' }
    },
    {
      path: 'company', component: ManegeCompanyComponent, data: { title: 'Company' }

    },
    {
      path: 'reports', component: ReportsComponent, data: { title: 'Reports' }
    },
    {

      path: 'appsetting', component: AppsettingComponent, data: { title: 'AppSetting' }
    },
    {

      path: 'appsettings', component: AppsettingsComponent, data: { title: 'AppSettings' }
    },
    {
      path: 'my-activities', component: MyActivitiesComponent, data: { title: 'My Activities' }
    },

    {
      path: 'menu', component: MenuComponent, data: { title: 'Menu' }
    },
    {
      path: 'report-summary', component: ReportSummaryComponent, data: { title: 'Report Summary' }
    },
    {
      path: 'user-report', component: UserReportComponent, data: { title: 'User-Report' }
    },
    {
      path: 'attendencehour', component: AttendencehourComponent, data: { title: 'Attendencehour' }
    },
    {
      path: 'manage-card', component: ManageCardComponent, data: { title: 'Card' }
    },
    {
      path: 'billing', component: CompanyPlanComponent, data: { title: 'Billing' }
    },
    {
      path: 'plan-master', component: PlanMasterComponent, data: { title: 'Plan Master' }
    },
    {
      path: 'hours-tracked-report', component: HoursTrackedReportComponent, data: { title: 'Hours Tracked Report' }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
