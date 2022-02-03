import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  AddEditModes,
  AppJsPath,
  AppMessages,
} from 'src/app/_app-constants/app-constants.config';
import { CardModel } from 'src/app/_models/card.model';
import { PaginationModel } from 'src/app/_models/pagination.model';
import { SearchModel } from 'src/app/_models/serach.model';
import { CardService } from 'src/app/_services/card.service';
import { from } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { DropDownItemModel } from 'src/app/_models/drop-down-item';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from 'src/app/_models/api-response.model';
import {
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { map, filter } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
declare var $: any;

@Component({
  selector: 'app-add-edit-card',
  templateUrl: './add-edit-card.component.html',
  styleUrls: ['./add-edit-card.component.css']
})

export class AddEditCardComponent implements OnInit {
  @Input() addEditModeCard: string;
  @Input() selectedCard: CardModel;

  @Output() mode = new EventEmitter<{ mode: string; opertaion: string }>();

  currentLoginUser: LoginResponseModel;
  CardForm: FormGroup;
  isSubmit: boolean;
  role: number;
  constructor(
    private dropDownServeice: DropdownListItemService,
    private authenticateService: AuthenticationService,
    private cardService: CardService,
    private alertService: AlertService,
    private messageService: MessageService,
    private httpClient: HttpClient,
  ) {
    this.currentLoginUser = authenticateService.GetLoginUserDetail();
    this.role = this.currentLoginUser.RoleId;
  }

  ngOnInit(): void {
    this.InitilizeForm();
    if(this.addEditModeCard == undefined)
    {
      this.addEditModeCard = 'insert';
    }
    if (this.addEditModeCard.toLowerCase() === 'edit') {
      this.setEditModeData();
    }

    if (this.role === 2 || this.role === 6) {
      if (this.addEditModeCard.toLowerCase() === 'insert') {
        this.CardForm.patchValue({
          DepartmentId: this.currentLoginUser.DepartmentId,
        });
      }
    }
  }

  private InitilizeForm() {
    this.CardForm = new FormGroup({
      CardId: new FormControl(0, [Validators.required]),
      FullName: new FormControl('', [Validators.required]),
      CardNumber: new FormControl('', [Validators.required]),
      CardExpiryDate: new FormControl('', [Validators.required]),
      CardCVC: new FormControl('', [Validators.required]),
      PostalCode: new FormControl('', [Validators.required]),
      CompanyId: new FormControl(this.currentLoginUser.CompanyId),
      CreatedBy: new FormControl(this.currentLoginUser.UserId, [
        Validators.required,
      ]),
      LoginRoleId: new FormControl(this.role),
      LoginDepartmentId: new FormControl(this.currentLoginUser.DepartmentId)
    });
  }

  private setEditModeData() {
    this.CardForm.patchValue({
      CardId: this.selectedCard.CardId,
      FullName: this.selectedCard.FullName,
      CardNumber: this.selectedCard.CardNumber,
      CompanyId: this.selectedCard.CompanyId,
      CardExpiryDate: this.selectedCard.CardExpiryDate,
      CardCVC: this.selectedCard.CardCVC,
      PostalCode: this.selectedCard.PostalCode,
      UpdatedBy: this.currentLoginUser.UserId,
      LoginRoleId: this.role,
      LoginDepartmentId: this.currentLoginUser.DepartmentId,
    });
  }

  onSaveOrCancel(operation: 'save' | 'cancel') {
    this.mode.emit({ mode: AddEditModes.default, opertaion: operation });
  }
  // get the value of form control to validate on html file
  get f() {
    return this.CardForm.controls;
  }

  onSubmit() {
    debugger
    this.isSubmit = true;
    if (this.CardForm.invalid) {
      return false;
    } else {
      if (
        this.addEditModeCard.toLowerCase() ===
        AddEditModes.insert.toLowerCase()
      ) {
        this.InsertCard();
      } else if (
        this.addEditModeCard.toLowerCase() ===
        AddEditModes.edit.toLowerCase()
      ) {
        this.UpdateCard();
      }
    }
  }

  private InsertCard() {
    this.cardService
      .InsertCard(this.CardForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: AppMessages.CARD_SAVE,
            life: 3000,
          });
          this.onSaveOrCancel('save');
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: AppMessages.SOME_THING_WENT_WRONG,
            life: 3000,
          });
        }
      });
  }

  private UpdateCard() {
    this.cardService
      .UpdateCard(this.CardForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: AppMessages.CARD_UPDATED,
            life: 3000,
          });
          this.onSaveOrCancel('save');
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: AppMessages.SOME_THING_WENT_WRONG,
            life: 3000,
          });
        }
      });
  }
}

