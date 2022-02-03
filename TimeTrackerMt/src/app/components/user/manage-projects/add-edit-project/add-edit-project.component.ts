import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  AppMessages,
  AddEditModes,
} from 'src/app/_app-constants/app-constants.config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DropDownItemModel } from 'src/app/_models/drop-down-item';
import { ProjectModel } from 'src/app/_models/project.model';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ProjectService } from 'src/app/_services/project.service';
import { AlertService } from 'src/app/_services/alert.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.css'],
})
export class AddEditProjectComponent implements OnInit {
  @Input() addEditModeProject: string;
  @Input() selectedProject: ProjectModel;

  @Output() mode = new EventEmitter<{ mode: string; opertaion: string }>();

  currentLoginUser: LoginResponseModel;
  ProjectForm: FormGroup;
  isSubmit: boolean;
  dropDownDepartment: DropDownItemModel;
  dropDownStatus: DropDownItemModel;
  role: number;
  constructor(
    private dropDownServeice: DropdownListItemService,
    private authenticateService: AuthenticationService,
    private projectService: ProjectService,
    private alertService: AlertService,
    private messageService: MessageService
  ) {
    this.currentLoginUser = authenticateService.GetLoginUserDetail();
    this.role = this.currentLoginUser.RoleId;
  }

  ngOnInit(): void {
    this.GetDepartmentList();
    this.GetStatusList();
    this.InitilizeForm();
    if (this.addEditModeProject.toLowerCase() === 'edit') {
      this.setEditModeData();
    }

    if (this.role === 2 || this.role === 6) {
      debugger;
      if (this.addEditModeProject.toLowerCase() === 'insert') {
        this.ProjectForm.patchValue({
          DepartmentId: this.currentLoginUser.DepartmentId,
        });
      }
    }
  }

  private GetDepartmentList() {
    this.dropDownServeice
      .GetDepartmentList(this.currentLoginUser.CompanyId)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.dropDownDepartment = data.Result;
        }
      });
  }

  private GetStatusList() {
    this.dropDownServeice.GetStatusList().subscribe((res) => {
      if (res.StatusCode === 200) {
        this.dropDownStatus = res.Result;
      }
    });
  }

  private InitilizeForm() {
    this.ProjectForm = new FormGroup({
      ProjectId: new FormControl(0, [Validators.required]),
      Name: new FormControl('', [Validators.required]),
      CompanyId: new FormControl(this.currentLoginUser.CompanyId, [
        Validators.required,
      ]),
      CreatedBy: new FormControl(this.currentLoginUser.UserId.toString(), [
        Validators.required,
      ]),
      DepartmentId: new FormControl('', [Validators.required]),
      StatusId: new FormControl('', [Validators.required]),
      LoginRoleId: new FormControl(this.role),
      LoginDepartmentId: new FormControl(this.currentLoginUser.DepartmentId),
    });
  }

  private setEditModeData() {
    this.ProjectForm.patchValue({
      ProjectId: this.selectedProject.ProjectId,
      Name: this.selectedProject.Name,
      CompanyId: this.selectedProject.CompanyId,
      DepartmentId: this.selectedProject.DepartmentId,
      StatusId: this.selectedProject.StatusId,
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
    return this.ProjectForm.controls;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.ProjectForm.invalid) {
      return false;
    } else {
      if (
        this.addEditModeProject.toLowerCase() ===
        AddEditModes.insert.toLowerCase()
      ) {
        this.InsertProject();
      } else if (
        this.addEditModeProject.toLowerCase() ===
        AddEditModes.edit.toLowerCase()
      ) {
        this.UpdateProject();
      }
    }
  }

  private InsertProject() {
    this.projectService
      .InsertProject(this.ProjectForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: AppMessages.PROJECT_SAVE,
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

  private UpdateProject() {
    this.projectService
      .UpdateProject(this.ProjectForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: AppMessages.PROJECT_UPDATED,
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
