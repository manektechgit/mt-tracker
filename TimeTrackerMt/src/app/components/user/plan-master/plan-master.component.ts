import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AppJsPath,
  AppMessages,
  AddEditModes,
} from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { PlanService } from 'src/app/_services/planMaster.service';
import { PlanMaster,PlanPagination } from 'src/app/_models/Plan-master';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
declare var $: any;
@Component({
  selector: 'app-plan-master',
  templateUrl: './plan-master.component.html',
  styleUrls: ['./plan-master.component.css']
})
export class PlanMasterComponent implements OnInit {
  //#region Variables
  Plans: any;
  selectedPlan: PlanMaster;
  mode = AddEditModes.default;
  pagination: PlanPagination;

  // paging
  startIndex = 0;
  showTotalRecords = 10;
  totalRecordsInDb = 0;
  loading: boolean;
  //#endregion
  constructor(
    private planService: PlanService,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.pagination = {
      DisplayLength: +this.showTotalRecords,
      DisplayStart: +this.startIndex,
      Search: '',
      SortCol: '',
      SortDir: 'desc',
    } as PlanPagination;
    this.GetAllPlans();
    // this.InitilizeLoginForm();
  }
  //#region "SetModes"
  SetInsertMode() {
    this.selectedPlan = null;
    this.mode = AddEditModes.insert;
  }

  SetEditMode(selectedPlan: PlanMaster) {
    this.mode = AddEditModes.edit;
    this.selectedPlan = selectedPlan;
  }

  SetDefaultMode($event: any) {
    this.mode = $event.mode;
    if ($event.opertaion === 'save') {
      this.GetAllPlans();
    }
  }
  //#endregion

    //#region Fetch And Update Apidata
    private GetAllPlans() {
      this.loading = true;
      this.planService.GetPlanlist(this.pagination).subscribe((data) => {
          if (data.StatusCode === 200) {
            this.Plans = data.Result;
            this.totalRecordsInDb = this.Plans[0].recordsTotal;
            this.loading = false;
          } else {
            this.Plans = null;
            this.loading = false;
          }
        }, (err) => {
          this.loading = false;
        });
    }
    ActiveDeactivePlan(isChecked: boolean, item: PlanMaster) {
      let active = '';
      if (isChecked) {
        active = 'active';
      } else {
        active = 'inactive';
      }
      this.confirmationDialogService
        .confirm(
          'Please confirm..',
          'Do you really want to ' + active + ' this Plan ?',
          'Ok',
          'Cancel',
          'lg'
        )
        .then((confirmed) => {
          if (confirmed) {
            item.IsActive = isChecked;
            this.UpdatePlan(item);
          } else {
            item.IsActive = isChecked ? false : true;
          }
        })
        .catch(() => {
          item.IsActive = isChecked ? false : true;
        });
    }
    private UpdatePlan(Plan: PlanMaster) {
      this.planService.ActiveDeactivePlan(Plan).subscribe((data) => {
        if (data.StatusCode === 200) {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: AppMessages.Plan_Updated, life: 3000 });
        }
      });
    }
    loadPlans(event: LazyLoadEvent) {
      this.setPagination(event);
      this.GetAllPlans();
    }
    //#endregion
    //#region Paging
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
        Search: event.globalFilter,
        SortCol: event.sortField,
        SortDir: sorDir,
      } as PlanPagination;
    }
    //#endregion
}
