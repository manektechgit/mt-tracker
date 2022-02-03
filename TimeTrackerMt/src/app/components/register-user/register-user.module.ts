import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StepsModule } from 'primeng/steps';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { RegisterUserComponent } from './register-user.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { InviteTeamComponent } from './invite-team/invite-team.component';
import { DataServiceService } from './data-service/data-service.service';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    RegisterUserComponent,
    CompanyDetailComponent,
    InviteTeamComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StepsModule,
    SharedModule,
    CardModule
  ],
  providers: [DataServiceService]
})
export class RegisterUserModule { }
