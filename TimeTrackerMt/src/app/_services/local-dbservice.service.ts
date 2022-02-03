import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AttandanceLogModel } from '../_models/attandancelog.model';

@Injectable({
  providedIn: 'root'
})
export class LocalDBServiceService {

  constructor(private dbService: NgxIndexedDBService) { }

  AddTimeLog(obj: AttandanceLogModel) {
    this.dbService.add('AttendenceLog', {
      Id: obj.Id,
      UserId: obj.UserId,
      ProjectId: obj.ProjectId,
      InTime: obj.InTime,
      OutTime: obj.OutTime,
      InOutFlage: true,
      Date: obj.Date,
      IsSynced: false
    })
      .subscribe((key) => {
      });

  }

  GetAttendenceLog() {
    return this.dbService.getAll('AttendenceLog');
  }

  UpdateOutTime(localAttedenceLogId: number, obj: AttandanceLogModel, inout: boolean) {
    const currentDate = formatDate(new Date(), 'HH:mm:ss', 'en-US');
    this.dbService
      .update('AttendenceLog', {
        Id: obj.Id,
        UserId: obj.UserId,
        ProjectId: obj.ProjectId,
        InTime: obj.InTime,
        InOutFlage: inout,
        Date: obj.Date,
        IsSynced: false,
        OutTime: currentDate,
        LocalAttedenceLogId: localAttedenceLogId
      })
      .subscribe((storeData) => {
      });
  }

  DeleteLocalDataByKey(localAttedenceLogId: number) {
    this.dbService.delete('AttendenceLog', localAttedenceLogId).subscribe((allPeople) => {
    });
  }
}
