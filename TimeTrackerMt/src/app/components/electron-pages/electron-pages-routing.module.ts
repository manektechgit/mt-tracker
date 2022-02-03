import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectronPagesComponent } from './electron-pages.component';
import { ElectronHomeComponent } from './electron-home/electron-home.component';
import { UserAuthGuard } from 'src/app/_guards/user-auth.guard';
import { ElectronSettingComponent } from './electron-setting/electron-setting.component';
const routes: Routes =
  [
    {
      path: '',
      component: ElectronPagesComponent,
      canActivate: [UserAuthGuard],
      canActivateChild: [UserAuthGuard],
      children: [
        {
          path: '', pathMatch: 'full', redirectTo: 'home'
        },
        {
          path: 'home',
          component: ElectronHomeComponent,
          data: { title: 'MtTracking' }
        },
        {
          path : 'setting',
          component: ElectronSettingComponent,
          data: { title: 'MtTracking-setting' }
        }]
    },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectronPagesRoutingModule { }
