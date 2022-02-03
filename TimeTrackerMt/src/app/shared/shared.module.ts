import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { UserScreenLogComponent } from './user-screen-log/user-screen-log.component';
// import { AssignUsersComponent } from './assign-users/assign-users.component';
import { GalleriaModule } from 'primeng/galleria';
import { HeaderComponent } from '../header/header/header.component';
import { FooterComponent } from '../footer/footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GalleriaModule,
    RouterModule
  ],
  declarations: [
    AlertComponent,
    ConfirmationDialogComponent,
    PasswordStrengthComponent,
    UserScreenLogComponent,
    HeaderComponent,
    FooterComponent,
    // AssignUsersComponent
  ],
  exports: [
    AlertComponent,
    ConfirmationDialogComponent,
    PasswordStrengthComponent,
    UserScreenLogComponent,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [],
})
export class SharedModule { }
