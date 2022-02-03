import { Component, OnInit } from '@angular/core';
import {
  AddEditModes,
  AppJsPath,
  AppMessages,
} from 'src/app/_app-constants/app-constants.config';
import { PaginationModel } from 'src/app/_models/pagination.model';
import { SearchModel } from 'src/app/_models/serach.model';
import { CardService } from 'src/app/_services/card.service';
import { from } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { LazyLoadEvent, MessageService } from 'primeng/api';
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
import { CardModel } from 'src/app/_models/card.model';
declare var $: any;

@Component({
  selector: 'app-manage-card',
  templateUrl: './manage-card.component.html',
  styleUrls: ['./manage-card.component.css']
})

export class ManageCardComponent implements OnInit {

  mode = AddEditModes.default;
  CardForm: FormGroup;
  itemForm: FormGroup;
  selectedCard: CardModel;
  pagination: PaginationModel;
  currentLoginUser: LoginResponseModel;
  searchText = '';
  closeResult = '';
  card: any;
  startIndex = 0;
  endIndex = 10;
  totalRecordsInDb = 0;
  loading: boolean;
  showTotalRecords = 10;
  selectedCardId;
  rows: FormArray;
  IsShow: boolean; 
  ModelArray = [];
  IsUserDelete: boolean;
  isSubmit: boolean;  
  constructor(
    private AuthService: AuthenticationService,
    private CardServiceData: CardService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.currentLoginUser = AuthService.GetLoginUserDetail();   
  }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.pagination = {
      DisplayLength: +this.showTotalRecords,
      DisplayStart: +this.startIndex,
      CompanyId: this.currentLoginUser.CompanyId,
      LoginRoleId: this.currentLoginUser.RoleId,
      Search: this.searchText,
      SortCol: '',
      SortDir: 'desc',
    } as PaginationModel;
    this.GetSearchedCard();
    this.InitilizeForm();
  }

  

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  OpenModel(content, data) {
    this.selectedCardId = data.CardId;   
     //this.GetCardUserList();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  onSubmit() {
    this.CardForm.value.CardId = this.selectedCardId;    
    this.isSubmit = true;
    if (this.CardForm.invalid) {
       this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.SOME_THING_WENT_WRONG, life: 3000 });
       return false;     
        
    } else {
     
      // this.AuthService.InsertCardWiseUsers(this.CardForm.value).subscribe((data) => { 
      //       if (data.Result == true) {          
      //       this.messageService.add({ severity: 'success', summary: 'Successful', detail: AppMessages.SAVE_SUCCESS, life: 3000 });                      
      //       this.GetCardUserList();
      //       this.CardForm.reset();            
      //     }
      //     else{           
      //       this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.USER_EXIST, life: 3000 });           
      //       this.CardForm.reset();           
      //     }
      //   }
      // );
    } 
  }

  private GetSearchedCard() {
    // this.loading = true;
    this.CardServiceData.GetCardDatalist(this.pagination).subscribe((data) => {
        if (data.StatusCode === 200) {
          this.card = data.Result;
          this.totalRecordsInDb = this.card[0].recordsTotal;
          this.loading = false;
        } else {
          this.card = null;
          this.loading = false;
        }
      }, (err) => {
        this.loading = false;
      });
  }


  IncreasePaging() {
    if (+this.showTotalRecords > 0) {
      this.startIndex = 0;
      this.endIndex = +this.showTotalRecords;
      this.GetSearchedCard();
    }
  }
  NextPage() {
    if (this.endIndex <= this.card[0].recordsTotal) {
      this.startIndex = +this.startIndex + +this.showTotalRecords;
      this.endIndex = +this.endIndex + +this.showTotalRecords;
      this.GetSearchedCard();
    }
  }
  PrevPage() {
    if (this.startIndex !== 0) {
      this.startIndex = +this.startIndex - +this.showTotalRecords;
      this.endIndex = +this.endIndex - +this.showTotalRecords;
      this.GetSearchedCard();
    }
  }
  private InitilizeForm() {
    this.CardForm = new FormGroup({
      UserId: new FormControl('', [Validators.required]),
      RoleId: new FormControl('', [Validators.required]),
      CardId: new FormControl(0),
      CreatedBy: new FormControl(this.currentLoginUser.UserId),
    });
  }

  get f() {
    return this.CardForm.controls;
  }

  private setPagination(event: LazyLoadEvent) {
    this.showTotalRecords = event.rows;
    let sorDir = '';
    if (event.sortOrder === 1) {
      sorDir = 'asc';
    }
    else {
      sorDir = 'desc';
    }
    this.pagination = {
      DisplayLength: +this.showTotalRecords,
      DisplayStart:  event.first,
      CompanyId: this.currentLoginUser.CompanyId,
      DepartmentId: this.currentLoginUser.DepartmentId,
      LoginRoleId: this.currentLoginUser.RoleId,
      Search:  event.globalFilter,
      SortCol:  event.sortField,
      SortDir: sorDir,
    } as PaginationModel;
  }

  loadCardData(event: LazyLoadEvent) {
    this.setPagination(event);
    this.GetSearchedCard();
  }

  SetInsertMode() {
    this.selectedCard = null;
    this.mode = AddEditModes.insert;
  }

  SetEditMode(selectedCard: CardModel) {
    this.mode = AddEditModes.edit;
    this.selectedCard = selectedCard;
  }

  SetDefaultMode($event: any) {
    this.mode = $event.mode;
    if ($event.opertaion === 'save') {
      this.GetSearchedCard();
    }
  }

  SearchData() {
    this.GetSearchedCard();
  }

  SetDeleteMode(selectedCard: CardModel) {
    this.confirmationDialogService
      .confirm(
        'Are you sure you want to delete the Card ' +
        selectedCard.FullName +
          ', ',
        'if yes then this card will  be obsolete and will not visible after deleting !',
        'Ok',
        'Cancel',
        'lg'
      )
      .then((confirmed) => {
        debugger
        if (confirmed) {
          selectedCard.IsDelete = true;
          this.UpdateCardStatus(selectedCard);
        }
      });
  }

  private UpdateCardStatus(selectedCard: CardModel) {
    this.CardServiceData
      .SoftDeleteCard(selectedCard)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: AppMessages.CARD_DELETE,
            life: 3000,
          });
        }

        this.GetSearchedCard();
      });
  }
  
}
