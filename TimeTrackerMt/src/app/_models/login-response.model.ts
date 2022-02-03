import { Role } from '../_app-constants/app-enum.config';

export interface LoginResponseModel {
  UserId: number;
  Password: string;
  Email: string;
  FirstName: string;
  LastName: string;
  DepartmentId: number;
  CompanyId: number;
  CreatedBy: number;
  Gender: number;
  RoleId: Role;
  StatusId: number;
  ReportingTo: number;
  JwtToken: string;
  IsLocalStorage: boolean;
}
