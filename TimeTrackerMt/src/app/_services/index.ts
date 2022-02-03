import { AuthenticationService } from './authentication.service';
import { LoaderService } from './loader.service';
import { TitleService } from './title.service';
import { AlertService } from './alert.service';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { DepartmentService } from './Department.service';
import { UserMasterService } from './user-master.service';
import { ProjectService } from './project.service';
import { TaskService } from './task.service';
import { CompanyService } from './company.service';
import { UserScreenShotsService } from './user-screen-shots.service';
import {DynamicuserService } from 'src/app/_services/dynamicuser.service';
import { LocalDBServiceService } from './local-dbservice.service';
import { CardService } from './card.service';
import { PlanService } from './planMaster.service';
import { DashboardService } from './dashboard.service';
export const allServices = [
  AuthenticationService,
  LoaderService,
  TitleService,
  AlertService,
  ConfirmationDialogService,
  DropdownListItemService,
  DepartmentService,
  UserMasterService,
  ProjectService,
  TaskService,
  CardService,
  CompanyService,
  UserScreenShotsService,
  DynamicuserService,
  LocalDBServiceService,
  PlanService,
  DashboardService
];
