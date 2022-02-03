import { Component, OnInit } from '@angular/core';
import {
  AddEditModes,
  AppJsPath,
  AppMessages,
} from 'src/app/_app-constants/app-constants.config';
import { TaskModel } from 'src/app/_models/task.model';
import { PaginationModel } from 'src/app/_models/pagination.model';
import { SearchModel } from 'src/app/_models/serach.model';
import { TaskService } from 'src/app/_services/task.service';
import { from } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { DropDownItemModel } from 'src/app/_models/drop-down-item';
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
declare var $: any;

@Component({
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.css'],
})
export class ManageTasksComponent implements OnInit {

  mode = AddEditModes.default;
  TaskForm: FormGroup;
  itemForm: FormGroup;
  selectedTask: TaskModel;
  pagination: PaginationModel;
  currentLoginUser: LoginResponseModel;
  searchText = '';
  closeResult = '';
  task: any;
  startIndex = 0;
  endIndex = 10;
  totalRecordsInDb = 0;
  loading: boolean;
  showTotalRecords = 10;
  dropDownRole: DropDownItemModel;
  dropDownUsers: DropDownItemModel;
  selectedTaskId;
  rows: FormArray;
  IsShow: boolean; 
  ModelArray = [];
  IsUserDelete: boolean;
  isSubmit: boolean;  
  constructor(
    private dropDownServeice: DropdownListItemService,
    private AuthService: AuthenticationService,
    private TaskServiceData: TaskService,
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
      DepartmentId: this.currentLoginUser.DepartmentId,
      LoginRoleId: this.currentLoginUser.RoleId,
      Search: this.searchText,
      SortCol: '',
      SortDir: 'desc',
    } as PaginationModel;
    this.GetSearchedTask();
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
    this.selectedTaskId = data.TaskId;   
    this.dropDownServeice.GetRoleList().subscribe((res) => {
      if (res.StatusCode === 200) {
        this.dropDownRole = res.Result;
      }
    });
    this.dropDownServeice.GetUserList(data.CompanyId,data.DepartmentId).subscribe((response) => {
      if (response.StatusCode === 200) {
        this.dropDownUsers = response.Result;
      }
    });
     this.GetTaskUserList();
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

GetTaskUserList(){   
  this.TaskServiceData.GetTaskUsers(this.selectedTaskId).subscribe((res) => {
    if (res.StatusCode === 200) {
       this.ModelArray = res.Result;
    }
  });
  
}

  onSubmit() {
    this.TaskForm.value.TaskId = this.selectedTaskId;    
    this.isSubmit = true;
    if (this.TaskForm.invalid) {
       this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.SOME_THING_WENT_WRONG, life: 3000 });
       return false;     
        
    } else {
     
      this.AuthService.InsertTaskWiseUsers(this.TaskForm.value).subscribe((data) => { 
            if (data.Result == true) {          
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: AppMessages.SAVE_SUCCESS, life: 3000 });                      
            this.GetTaskUserList();
            this.TaskForm.reset();            
          }
          else{           
            this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.USER_EXIST, life: 3000 });           
            this.TaskForm.reset();           
          }
        }
      );
    } 
  }

  private GetSearchedTask() {
    // this.loading = true;
    this.TaskServiceData.GetTaskDatalist(this.pagination).subscribe((data) => {
        if (data.StatusCode === 200) {
          this.task = data.Result;
          this.totalRecordsInDb = this.task[0].recordsTotal;
          this.loading = false;
        } else {
          this.task = null;
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
      this.GetSearchedTask();
    }
  }
  NextPage() {
    if (this.endIndex <= this.task[0].recordsTotal) {
      this.startIndex = +this.startIndex + +this.showTotalRecords;
      this.endIndex = +this.endIndex + +this.showTotalRecords;
      this.GetSearchedTask();
    }
  }
  PrevPage() {
    if (this.startIndex !== 0) {
      this.startIndex = +this.startIndex - +this.showTotalRecords;
      this.endIndex = +this.endIndex - +this.showTotalRecords;
      this.GetSearchedTask();
    }
  }
  private InitilizeForm() {
    this.TaskForm = new FormGroup({
      UserId: new FormControl('', [Validators.required]),
      RoleId: new FormControl('', [Validators.required]),
      TaskId: new FormControl(0),
      CreatedBy: new FormControl(this.currentLoginUser.UserId),
    });
  }
  get f() {
    return this.TaskForm.controls;
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

  loadTaskData(event: LazyLoadEvent) {
    this.setPagination(event);
    this.GetSearchedTask();
  }


  SetInsertMode() {
    this.selectedTask = null;
    this.mode = AddEditModes.insert;
  }

  SetEditMode(selectedTask: TaskModel) {
    this.mode = AddEditModes.edit;
    this.selectedTask = selectedTask;
  }

 
  SetDefaultMode($event: any) {
    this.mode = $event.mode;
    if ($event.opertaion === 'save') {
      this.GetSearchedTask();
    }
  }
  SearchData() {
    this.GetSearchedTask();
  }

 
  SetDeleteMode(selectedTask: TaskModel) {
    this.confirmationDialogService
      .confirm(
        'Are you sure you want to delete the Task ' +
        selectedTask.Name +
          ', ',
        'if yes then this task will  be obsolete and will not visible after deleting !',
        'Ok',
        'Cancel',
        'lg'
      )
      .then((confirmed) => {
        debugger
        if (confirmed) {
          selectedTask.IsDelete = true;
          this.UpdateTaskStatus(selectedTask);
        }
      });
  }

  private UpdateTaskStatus(selectedTask: TaskModel) {
    this.TaskServiceData
      .SoftDeleteTask(selectedTask)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: AppMessages.TASK_DELETE,
            life: 3000,
          });
        }

        this.GetSearchedTask();
      });
  }
  
}