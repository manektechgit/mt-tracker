export interface UserMasterModel {
  UserId: number;
  Email: string;
  Password: string;
  Title: string;
  Name: string;
  FirstName: string;
  LastName: string;
  ContactNo: string;
  DepartmentId: number;
  StatusId: number;
  ReportingTo: number;
  CompanyId: number;
  RoleId: number;
  LoginRoleId: number;
  IsActive: boolean;
  ModifiedBy?: number;
  Gender: any;
  CreatedBy: number;
  UpdatedBy: any;
  LoginDepartmentId: number;
  ProjectRoleId: number;
  ScreenCastId: number;
  DepartmentIds: string;
  ProjectIds: string;
  TimeZoneId : number;
}
