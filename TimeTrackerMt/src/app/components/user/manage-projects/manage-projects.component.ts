import { Component, OnInit } from '@angular/core';
import {
  AddEditModes,
  AppJsPath,
  AppMessages,
} from 'src/app/_app-constants/app-constants.config';
import { ProjectModel } from 'src/app/_models/project.model';
import { PaginationModel } from 'src/app/_models/pagination.model';
import { SearchModel } from 'src/app/_models/serach.model';
import { ProjectService } from 'src/app/_services/project.service';
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
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css'],
})
export class ManageProjectsComponent implements OnInit {
  mode = AddEditModes.default;
  ProjectForm: FormGroup;
  itemForm: FormGroup;
  selectedProject: ProjectModel;
  editProjectId: number;
  pagination: PaginationModel;
  currentLoginUser: LoginResponseModel;
  searchText = '';
  closeResult = '';
  project: any;
  startIndex = 0;
  endIndex = 10;
  totalRecordsInDb = 0;
  loading: boolean;
  showTotalRecords = 10;
  dropDownRole: DropDownItemModel;
  dropDownUsers: DropDownItemModel;
  selectedProjectId;
  rows: FormArray;
  IsShow: boolean;
  ModelArray = [];
  IsUserDelete: boolean;
  isSubmit: boolean;

  adminRoleId: any;

  constructor(
    private dropDownServeice: DropdownListItemService,
    private AuthService: AuthenticationService,
    private ProjectServiceData: ProjectService,
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
    this.GetSearchedProject();
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
    this.selectedProjectId = data.ProjectId;
    this.dropDownServeice.GetRoleList().subscribe((res) => {
      if (res.StatusCode === 200) {
        this.dropDownRole = res.Result;
      }
    });
    this.dropDownServeice.GetUserList(data.CompanyId, data.DepartmentId).subscribe((response) => {
      if (response.StatusCode === 200) {
        this.dropDownUsers = response.Result;
      }
    });
    this.GetProjectUserList();
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

  GetProjectUserList() {
    this.ProjectServiceData.GetProjectUsers(this.selectedProjectId).subscribe((res) => {
      if (res.StatusCode === 200) {
        this.ModelArray = res.Result;
      }
    });

  }

  onSubmit() {
    this.ProjectForm.value.ProjectId = this.selectedProjectId;
    this.isSubmit = true;
    if (this.ProjectForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.SOME_THING_WENT_WRONG, life: 3000 });
      return false;

    } else {

      this.AuthService.InsertProjectWiseUsers(this.ProjectForm.value).subscribe((data) => {
        if (data.Result == true) {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: AppMessages.SAVE_SUCCESS, life: 3000 });
          this.GetProjectUserList();
          this.ProjectForm.reset();
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.USER_EXIST, life: 3000 });
          this.ProjectForm.reset();
        }
      }
      );
    }
  }

  private GetSearchedProject() {
    // this.loading = true;
    this.ProjectServiceData.GetProjectDatalist(this.pagination).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.project = data.Result;
        this.totalRecordsInDb = this.project[0].recordsTotal;
        this.loading = false;
      } else {
        this.project = null;
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
      this.GetSearchedProject();
    }
  }
  NextPage() {
    if (this.endIndex <= this.project[0].recordsTotal) {
      this.startIndex = +this.startIndex + +this.showTotalRecords;
      this.endIndex = +this.endIndex + +this.showTotalRecords;
      this.GetSearchedProject();
    }
  }
  PrevPage() {
    if (this.startIndex !== 0) {
      this.startIndex = +this.startIndex - +this.showTotalRecords;
      this.endIndex = +this.endIndex - +this.showTotalRecords;
      this.GetSearchedProject();
    }
  }
  private InitilizeForm() {
    this.ProjectForm = new FormGroup({
      UserId: new FormControl('', [Validators.required]),
      RoleId: new FormControl('', [Validators.required]),
      ProjectId: new FormControl(0),
      CreatedBy: new FormControl(this.currentLoginUser.UserId),
    });
  }
  get f() {
    return this.ProjectForm.controls;
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
      DisplayStart: event.first,
      CompanyId: this.currentLoginUser.CompanyId,
      DepartmentId: this.currentLoginUser.DepartmentId,
      LoginRoleId: this.currentLoginUser.RoleId,
      Search: event.globalFilter,
      SortCol: event.sortField,
      SortDir: sorDir,
    } as PaginationModel;
  }

  loadProjectData(event: LazyLoadEvent) {
    this.setPagination(event);
    this.GetSearchedProject();
  }


  SetInsertMode() {
    this.selectedProject = null;
    this.mode = AddEditModes.insert;
  }

  SetEditMode(selectedProject: ProjectModel) {
    this.mode = AddEditModes.edit;
    this.selectedProject = selectedProject;
  }

  SetAddTaskMode(selectedProject: ProjectModel) {
    this.mode = "AddTask";
    this.editProjectId = selectedProject.ProjectId;
  }

  SetDefaultMode($event: any) {
    this.mode = $event.mode;
    if ($event.opertaion === 'save') {
      this.GetSearchedProject();
    }
  }
  SearchData() {
    this.GetSearchedProject();
  }


  SetDeleteMode(selectedProject: ProjectModel) {
    this.confirmationDialogService
      .confirm(
        'Are you sure you want to delete the Project ' +
        selectedProject.Name +
        ', ',
        'if yes then this project will  be obsolete and will not visible after deleting !',
        'Ok',
        'Cancel',
        'lg'
      )
      .then((confirmed) => {
        if (confirmed) {
          selectedProject.IsDelete = true;
          this.UpdateProjectStatus(selectedProject);
        }
      });
  }

  private UpdateProjectStatus(selectedProject: ProjectModel) {
    this.ProjectServiceData
      .SoftDeleteProject(selectedProject)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: AppMessages.PROJECT_DELETE,
            life: 3000,
          });
        }

        this.GetSearchedProject();
      });
  }

  UserDeleteMode(date) {
    this.confirmationDialogService
      .confirm(
        'Are you sure you want to delete the User ' +
        date.UserName +
        ', ',
        'if yes then this User will  be obsolete and will not visible after deleting !',
        'Ok',
        'Cancel',
        'lg'
      )
      .then((confirmed) => {
        if (confirmed) {
          this.IsUserDelete = true;
          this.DeleteProjectUsers(date.Id);
        }
      });
  }
  private DeleteProjectUsers(Id) {
    this.ProjectServiceData
      .DeleteProjectUsers(Id)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: AppMessages.USER_DELETE,
            life: 3000,

          });
          this.GetProjectUserList();
        }
      });
  }
}
