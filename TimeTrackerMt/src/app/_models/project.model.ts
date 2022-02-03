export interface ProjectModel {
  UserId: number;
  Title: string;
  ProjectId: number;
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
}
