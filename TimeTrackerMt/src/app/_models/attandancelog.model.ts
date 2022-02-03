
export interface AttandanceLogModel {
  Id: number;
  UserId: number;
  CompanyId?: any;
  ProjectId: number;
  TaskId: number;
  Name: string;
  InTime: string;
  OutTime: string;
  InOutFlage: boolean;
  fromDate: any;
  toDate: any;
  SelectedUserId: string;
  selectedProjectId: string;
  Date: Date;
  UId?: any;
  RoleId?: any;
  ImageCount: number;
}


