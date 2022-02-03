import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from 'src/app/_models/api-response.model';
import { ProjectService } from 'src/app/_services/project.service';
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
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css'],
})
export class AddEditTaskComponent implements OnInit {
  @Input() addEditModeTask: string;
  @Input() selectedTask: TaskModel;
  @Input() editProjectId: number;

  @Output() mode = new EventEmitter<{ mode: string; opertaion: string }>();

  currentLoginUser: LoginResponseModel;
  TaskForm: FormGroup;
  isSubmit: boolean;
  dropDownProject: DropDownItemModel;
  dropDownStatus: DropDownItemModel;
  role: number;
  constructor(
    private dropDownServeice: DropdownListItemService,
    private authenticateService: AuthenticationService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private alertService: AlertService,
    private messageService: MessageService,
    private httpClient: HttpClient,
  ) {
    this.currentLoginUser = authenticateService.GetLoginUserDetail();
    this.role = this.currentLoginUser.RoleId;
  }

  ngOnInit(): void {
    this.GetProjectDropDownList(this.currentLoginUser.UserId);
    this.GetStatusList();
    this.InitilizeForm();
    if(this.addEditModeTask == undefined)
    {
      this.addEditModeTask = 'insert';
    }
    if (this.addEditModeTask.toLowerCase() === 'edit') {
      this.setEditModeData();
    }

    if (this.role === 2 || this.role === 6) {
      if (this.addEditModeTask.toLowerCase() === 'insert') {
        this.TaskForm.patchValue({
          DepartmentId: this.currentLoginUser.DepartmentId,
        });
      }
    }

    if(this.editProjectId != null)
    {
      this.TaskForm.patchValue({
        ProjectId: this.editProjectId
      });
    }
  }

  GetProjectDropDownList(UserId) {
    this.projectService
      .GetProjectDropDownListByUserId(UserId)
      .subscribe((res) => {
        if (res.StatusCode === 200) {
          this.dropDownProject = res.Result;
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
    this.TaskForm = new FormGroup({
      TaskId: new FormControl(0, [Validators.required]),
      Name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \b]+$')]),
      CompanyId: new FormControl(this.currentLoginUser.CompanyId, [
        //Validators.required,
      ]),
      CreatedBy: new FormControl(this.currentLoginUser.UserId.toString(), [
        Validators.required,
      ]),
      DepartmentId: new FormControl('', [
        //Validators.required
      ]),
      StatusId: new FormControl(null, [Validators.required]),
      LoginRoleId: new FormControl(this.role),
      LoginDepartmentId: new FormControl(this.currentLoginUser.DepartmentId),
      ProjectId: new FormControl(null, [Validators.required]),
    });
  }

  private setEditModeData() {
    this.TaskForm.patchValue({
      TaskId: this.selectedTask.TaskId,
      Name: this.selectedTask.Name,
      CompanyId: this.selectedTask.CompanyId,
      DepartmentId: this.selectedTask.DepartmentId,
      ProjectId: this.selectedTask.ProjectId,
      StatusId: this.selectedTask.StatusId,
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
    return this.TaskForm.controls;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.TaskForm.invalid) {
      return false;
    } else {
      if (
        this.addEditModeTask.toLowerCase() ===
        AddEditModes.insert.toLowerCase()
      ) {
        this.InsertTask();
      } else if (
        this.addEditModeTask.toLowerCase() ===
        AddEditModes.edit.toLowerCase()
      ) {
        this.UpdateTask();
      }
    }
  }

  private InsertTask() {
    this.taskService
      .InsertTask(this.TaskForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: AppMessages.TASK_SAVE,
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

  private UpdateTask() {
    this.taskService
      .UpdateTask(this.TaskForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: AppMessages.TASK_UPDATED,
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
