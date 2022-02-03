import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronPagesRoutingModule } from './electron-pages-routing.module';
import { ElectronPagesComponent } from './electron-pages.component';
import { ElectronHomeComponent } from './electron-home/electron-home.component';
import { UserAuthGuard } from 'src/app/_guards/user-auth.guard';
import { ElectronSettingComponent } from './electron-setting/electron-setting.component';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ElectronPagesComponent, ElectronHomeComponent, ElectronSettingComponent],
  imports: [
    CommonModule,
    ElectronPagesRoutingModule,
    DropdownModule,
    FormsModule
  ],
  providers: [UserAuthGuard]
})
export class ElectronPagesModule { }
