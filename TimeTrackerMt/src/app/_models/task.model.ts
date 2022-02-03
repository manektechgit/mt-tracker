export interface TaskModel {
  UserId: number;
  Title: string;
  TaskId: number;
  Name: string;
  CompanyId: number;
  DepartmentId: number;
  CreatedBy?: number;
  StatusId: boolean;
  UpdatedBy: any;
  searchText: any;
  IsDelete: boolean;
  LoginRoleId: number;
  LoginDepartmentId: number;
  ProjectId: number;
  TotalWorkingHours: any;
  ProjectName: string;
}
