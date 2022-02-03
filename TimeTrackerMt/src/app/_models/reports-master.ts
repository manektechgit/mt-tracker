import { Time } from '@angular/common';

export interface ReportsMaster {
  Id?: number;
  UserId?: number;
  AttandanceDate?: Date;
  WorkingHours?: string;
  Total?: string;
  CompanyName: string;
  NumberOfUser?: number;
  ProjectId?: number;
  FirstName: string;
  Name: string;
  fromDate: string;
  toDate: string;
}
