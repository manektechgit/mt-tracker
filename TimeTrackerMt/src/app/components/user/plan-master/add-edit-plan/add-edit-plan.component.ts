import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlanMaster } from 'src/app/_models/Plan-master';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AppJsPath,
  AppMessages,
  AddEditModes,
} from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { PlanService } from 'src/app/_services/planMaster.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-edit-plan',
  templateUrl: './add-edit-plan.component.html',
  styleUrls: ['./add-edit-plan.component.css']
})
export class AddEditPlanComponent implements OnInit {
  @Input() addEditMode: string;
  @Input() selectedPlan: PlanMaster;

  @Output() mode = new EventEmitter<{ mode: string; opertaion: string }>();

  currentLoginUser: LoginResponseModel;
  PlanForm: FormGroup;
  isSubmit: boolean;
  IsError: boolean;
  Message: any;
  IsDefault:boolean = true;
  Is24Hour :boolean = false;
  constructor(
    private planService: PlanService,
    private router: Router,
    private authservice: AuthenticationService,
    private messageService: MessageService
  ) {
    this.currentLoginUser = this.authservice.GetLoginUserDetail();
  }

  ngOnInit(): void {
    this.planService.CheckAnyPlanDefault().subscribe(
      (data) => {
        if (data.StatusCode === 200) {
          if(data.Result != null){
            if(this.addEditMode.toLowerCase() === 'edit'){
              if(this.selectedPlan.PlanId == data.Result.PlanId){
                this.IsDefault = true;
              }
              else{
                this.IsDefault = false;
              }
            }
            else{
              this.IsDefault = false;
            }
          }
          else{
            this.IsDefault = true;
          }
        }
      },
      (err) => {
      }
    );
    this.InitilizeForm();
    if (this.addEditMode.toLowerCase() === 'edit') {
      this.setEditModeData();
    }
  }

  private InitilizeForm() {
    const urlRegex = '[Hh][Tt][Tt][Pp][Ss]?://(.*)';

    this.PlanForm = new FormGroup({
      PlanId: new FormControl(null),
      Name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \b]+$')]),
      AmountPerUser: new FormControl('', [Validators.required]),
      Is24HourSupport: new FormControl(false),
      IsTimeTracking: new FormControl(false),
      IsTaskAndProject: new FormControl(false),
      NoOfStorageMonth: new FormControl('', [Validators.required]),
      NoOfSupportDays: new FormControl('', [Validators.required]),
      NoOfDepartmentAllowed: new FormControl('', [Validators.required]),
      IsAllowClientAccess: new FormControl(false),
      IsDefaultPlan: new FormControl(false),
      CreatedBy: new FormControl(this.currentLoginUser.UserId, [
        Validators.required,
      ]),
    });
  }
  private setEditModeData() {
    this.planService.GetPlanByID(this.selectedPlan.PlanId)
    .subscribe(
      (data) => {
        if (data.StatusCode === 200) {
          if(data.Result.NoOfSupportDays == 0){
            this.Is24Hour = true;
          }
          else{
            this.Is24Hour = false;
          }
          this.PlanForm.patchValue({
            PlanId: data.Result.PlanId,
            Name: data.Result.Name,
            AmountPerUser: data.Result.AmountPerUser,
            Is24HourSupport: this.Is24Hour,
            IsTimeTracking: data.Result.IsTimeTracking,
            IsTaskAndProject: data.Result.IsTaskAndProject,
            NoOfStorageMonth: data.Result.NoOfStorageMonth,
            NoOfSupportDays: data.Result.NoOfSupportDays,
            NoOfDepartmentAllowed: data.Result.NoOfDepartmentAllowed,
            IsAllowClientAccess: data.Result.IsAllowClientAccess,
            IsDefaultPlan: data.Result.IsDefaultPlan,
            CreatedBy: this.currentLoginUser.UserId,
          });
        }
      },
      (err) => {
      }
    );


  }
  onSaveOrCancel(operation: 'save' | 'cancel') {
    this.mode.emit({ mode: AddEditModes.default, opertaion: operation });
  }
  // get the value of form control to validate on html file
  get f() {
    return this.PlanForm.controls;
  }


  onSubmit() {
    this.isSubmit = true;
    if (this.PlanForm.invalid) {
      return false;
    } else {
      if (
        this.addEditMode.toLowerCase() === AddEditModes.insert.toLowerCase()
      ) {
        this.AddPlan();
      } else if (
        this.addEditMode.toLowerCase() === AddEditModes.edit.toLowerCase()
      ) {
        this.UpdatePlan();
      }
    }
  }

  private UpdatePlan() {
    // tslint:disable-next-line: no-debugger
    if(this.PlanForm.value.Is24HourSupport == true){
      this.PlanForm.value.NoOfSupportDays = 0;
    }
    this.planService
      .UpdatePlan(this.PlanForm.value)
      .subscribe((data) => {
        if (data.StatusCode === 200) {
          if (data.Result != null) {
            this.IsError = true;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: AppMessages.PLAN_EXISTS,
              life: 3000,
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: AppMessages.Plan_Updated,
              life: 3000,
            });
            this.onSaveOrCancel('save');
          }
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

  private AddPlan() {
    debugger
    if(this.PlanForm.value.Is24HourSupport == true){
      this.PlanForm.value.NoOfSupportDays = 0;
    }
    this.planService.AddPlan(this.PlanForm.value).subscribe((data) => {
      if (data.StatusCode === 200) {
        if (data.Result != null) {
          this.IsError = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: AppMessages.PLAN_EXISTS,
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: AppMessages.Plan_ADD,
            life: 3000,
          });
          this.onSaveOrCancel('save');
        }
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

  checkValue(event) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
  }

}
