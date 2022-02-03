export interface AttendencehourMaster {

  Id?: number;
  CompanyId ?: number;
  StartDate: Date;
  EndDate?: Date;
  FullDayHours ?: number;
  HalfDayHours ?: number;
  CompanyName: string;
  IsActive: boolean;
  stringStartDate : string;
  stringEndDate: string;

}
