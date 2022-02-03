import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/weblist/home/home.component';
import { SignInComponent } from './components/weblist/sign-in/sign-in.component';
import { ForgetPasswordComponent } from './components/weblist/forget-password/forget-password.component';
import { AcceptInvitationComponent } from './components/weblist/accept-invitation/accept-invitation.component';
import { ResetPasswordComponent } from './components/weblist/reset-password/reset-password.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterHomeComponent } from './components/weblist/register-home/register-home.component';
import { CompanyDetailComponent } from './components/register-user/company-detail/company-detail.component';
import { InviteTeamComponent } from './components/register-user/invite-team/invite-team.component';

const routes: Routes =
  [
    {
      path: '', pathMatch: 'full', redirectTo: '/home'
    },
    // {
    //   path: 'home', component: HomeComponent, data: { title: 'TimeTrackerMt' }
    // },
    {
      path: 'login', component: SignInComponent, data: { title: 'Login' }
    },
    {
      path: 'forget-password', component: ForgetPasswordComponent, data: { title: 'Forget-Password' }
    },
    {
      path: 'reset-password', component: ResetPasswordComponent, data: { title: 'Reset-Password' }
    },
    {
      path: 'accept-invitation', component: AcceptInvitationComponent, data: { title: 'Accept-Invitation' }
    },
    {
      path: 'user', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
    },
    {
      path: 'register-user',
      component: RegisterUserComponent,
      children: [
        {
          path: '', pathMatch: 'full', redirectTo: 'company-detail'
        },
        {
          path: 'company-detail',
          component: CompanyDetailComponent,
          data: { title: 'Company Detail' }
        }
      ]
    },
    {
      path: 'register-user',
      component: RegisterUserComponent,
      children: [
        {
          path: 'invite-team',
          component: InviteTeamComponent,
          data: { title: 'Invite Team' }
        }
      ]
    },
    {
      path: 'home', component: RegisterHomeComponent, data: { title: 'Home' }
    },
    {
      path: 'electronPages',
      loadChildren: () => import('./components/electron-pages/electron-pages.module').then(m => m.ElectronPagesModule)
    },
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
