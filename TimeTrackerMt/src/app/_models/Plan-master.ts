export interface PlanMaster {
  PlanId?: number;
  Name: string;
  AmountPerUser: number;
  IsTimeTracking?: boolean;
  IsTaskAndProject?: boolean;
  NoOfStorageMonth: number;
  NoOfSupportDays: number;
  NoOfDepartmentAllowed: boolean;
  IsAllowClientAccess?: boolean;
  IsDefaultPlan?: boolean;
  IsActive?: boolean;
  CreateBy?: boolean;
}

export interface PlanPagination {
  DisplayLength: number;
  DisplayStart: number;
  Search: string;
  SortCol: string;
  SortDir: 'asc' | 'desc';

}
