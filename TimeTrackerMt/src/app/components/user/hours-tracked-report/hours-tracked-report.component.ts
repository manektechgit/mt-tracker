import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppJsPath } from 'src/app/_app-constants/app-constants.config';
import * as moment from 'moment';
import 'moment-timezone';
import { Calendar } from 'primeng/calendar';
import { formatDate } from '@angular/common';
import { DashboardService } from 'src/app/_services/dashboard.service';
declare var $: any;
@Component({
  selector: 'app-hours-tracked-report',
  templateUrl: './hours-tracked-report.component.html',
  styleUrls: ['./hours-tracked-report.component.css']
})
export class HoursTrackedReportComponent implements OnInit {

  //#region CLASS PROPERTIS
          activeTab:any
          ReportsForm: FormGroup;
          isFromDate = false;
          isToDate = false ;
          toDate = new Date();
          fromDate =  new Date();
          @ViewChild('calendar') calendar: Calendar;
          UserWorkingHours : any;
          rowGroupMetadata: any;
          ActivityLog = [];
  //#endregion CLASS PROPERTIS

  //#region  TAB SELECTION ITEMS
          items = [
            {label: 'TODAY'},
            {label: 'YESTERDAY'},
            {label: 'WEEK'},
            {label: 'MONTH'},
            {label: 'RANGE'}
          ];
  //#endregion TAB SELECTION ITEMS

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.InitilizeForm();
   this.activeTab = this.items[0];
  }

  ngAfterViewInit(): void {
    this.calendar.inputfieldViewChild.nativeElement.style.display = "none";
  }

  //#region  INITILIZATION FOR DROP DOWN
    private InitilizeForm() {
      this.ReportsForm = new FormGroup({
        rangeDates: new FormControl('')
      });
    }
  //#endregion INITILIZATION FOR DROP DOWN

  //#region DATE SELECTION FOR RANG
      onSelectRange(event){
        let d = new Date(Date.parse(event));
        let data = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
        if (this.isFromDate === false) {
        const fromDate = formatDate(data, 'yyyy-MM-dd', 'en_US');
          this.fromDate = new Date(fromDate)
          this.isFromDate = true
        }
        else {
          const toDate  = formatDate(data, 'yyyy-MM-dd', 'en_US');
          this.toDate = new Date(toDate)
          this.isFromDate = false
          this.GetUserWorkingHours(5);
        }

      }
   //#endregion DATE SELECTION FOR RANG

   //#region GET ACTIVE ITEMS
      getActiveItem(data:any){
        this.fromDate = new Date();
        this.toDate = new Date ();
        if(data.label == 'YESTERDAY'){
          this.toDate =  new Date(this.addDays(1))
          this.GetUserWorkingHours(2);
        } else if (data.label === 'WEEK'){
          this.toDate = new Date(this.addDays(7))
          this.GetUserWorkingHours(3);
        } else if (data.label === 'MONTH'){
          this.toDate = new Date(this.addDays(30))
          this.GetUserWorkingHours(4);
        } else if (data.label === 'RANGE'){
          this.openCalendar();
      } else {
          this.GetUserWorkingHours(1);
        }

      }
//#endregion GET ACTIVE ITEMS

  addDays(days) {
    return moment().subtract(days,'d').format('YYYY-MM-DD');
  }

  openCalendar() {
    this.calendar.showOverlay()
    this.calendar.inputfieldViewChild.nativeElement.dispatchEvent(new Event('focus'))
    this.calendar.inputfieldViewChild.nativeElement.dispatchEvent(new Event('click'))
 }

 //#region GET HOURS TRACK REPORT DATE
      private GetUserWorkingHours(type : number) {
        const obj = {
          UserId :0,
          FilterType: type,
          FromDate: formatDate(this.fromDate, 'yyyy-MM-dd', 'en_US'),
          ToDate:formatDate(this.toDate, 'yyyy-MM-dd', 'en_US'),
          IsMostWorkingHR:0,
          IsDetailHourReport:1
        }
        this.dashboardService
          .GetUserWorkingHours(obj)
          .subscribe(
            (data) => {
              if (data.StatusCode === 200) {
                console.log(data.Result);
                  this.UserWorkingHours = JSON.parse(data.Result);
                  this.updateRowGroupMetaData();
              }
            },

          );
      }
//#endregion GET HOURS TRACK REPORT DATE

  onSort() {
    this.updateRowGroupMetaData();
  }

//#region FOR UPDATING THE REPORT GRID IN TREE
        updateRowGroupMetaData() {
          this.rowGroupMetadata = {};
          if (this.UserWorkingHours) {
            for (let i = 0; i < this.UserWorkingHours.length; i++) {
              const rowData = this.UserWorkingHours[i];
              const representativeUser = rowData.UserName;

              if (i === 0) {
                this.rowGroupMetadata[representativeUser] = { index: 0, size: 1 };
              } else {
                const previousRowData = this.UserWorkingHours[i - 1];
                const previousRowGroup = previousRowData.UserName;
                if (representativeUser === previousRowGroup) {
                  this.rowGroupMetadata[representativeUser].size++;
                }
                else {
                  this.rowGroupMetadata[representativeUser] = { index: i, size: 1 };
                }
              }
            }
          }
        }
//#endregion FOR UPDATING THE REPORT GRID IN TREE

  setProgreccbar(data){
      var hoursMinutes = data.split(/[.:]/);
      var hours = parseInt(hoursMinutes[0], 10);
      var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
      return hours + minutes / 60;
  }
}
