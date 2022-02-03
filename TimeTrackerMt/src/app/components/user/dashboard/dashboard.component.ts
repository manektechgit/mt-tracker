import { Component, OnInit, ViewChild } from '@angular/core';
import { AppJsPath } from 'src/app/_app-constants/app-constants.config';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { SelectItem } from 'primeng/api';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { DropdownListItemService } from 'src/app/_services/dropdown-list-item.service';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ReportsParameters } from 'src/app/_models/reports-parameters';
import * as moment from 'moment';
import 'moment-timezone';
import { Calendar } from 'primeng/calendar';


declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  ReportsForm: FormGroup;
  currentLoginUser: LoginResponseModel;
  dropDownUsersList: SelectItem;
  rangeDates:any
  userName:string
  userData:any
  UserDashboar: any;
  departmentId:number
  userId:number;
  activeTab:any
  companyId:number
  isFromDate = false;
  isToDate = false ;
  toDate = new Date();
  fromDate =  new Date();
  UserMostWorkingHours : any;
  UserLeastWorkingHours : any;
  filterType : number;
  @ViewChild('calendar') calendar: Calendar;

      items = [
        {label: 'TODAY'},
        {label: 'YESTERDAY'},
        {label: 'PAST 7 DAYS'},
        {label: 'PAST 30 DAYS'},
        {label: 'RANGE'}
      ];

      constructor(
          private dashboardService: DashboardService,
          private authenticationService: AuthenticationService,
          private dropDownServeice: DropdownListItemService)
           {

            this.currentLoginUser = this.authenticationService.GetLoginUserDetail();
            this.companyId = this.currentLoginUser.CompanyId;
            this.departmentId = this.currentLoginUser.DepartmentId;
            const ReportsParameters = this.setParameter();
            this.GetUserList(ReportsParameters)

          }


  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
    this.InitilizeForm();
   this.activeTab = this.items[0];
  }

  ngAfterViewInit(): void {
    this.calendar.inputfieldViewChild.nativeElement.style.display = "none";
  }


      private InitilizeForm() {
        this.ReportsForm = new FormGroup({
          UserId: new FormControl(''),
          rangeDates: new FormControl(''),
        });
      }


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
          this.GetUserData()
          this.GetUserWorkingHours(5,1);  // for most hour
          this.GetUserWorkingHours(5,0);  // for least hour
        }

      }

  onUserSelect(){
    this.GetUserData();
    this.GetUserWorkingHours(this.filterType,1);
    this.GetUserWorkingHours(this.filterType,0);
  }

  GetUserList(ReportsParameters : ReportsParameters){
    this.dropDownServeice.UserList(ReportsParameters).subscribe((response) => {
      if (response.StatusCode === 200) {
        this.dropDownUsersList = response.Result;
        this.ReportsForm.patchValue({
          UserId: this.currentLoginUser.UserId,
        })
        this.GetUserData();
        this.GetUserWorkingHours(1,1);  // for most hour
      this.GetUserWorkingHours(1,0);  // for least hour
      }
    });
  }

  getActiveItem(data:any){
    this.fromDate = new Date();
    this.toDate = new Date ();
    if(data.label == 'YESTERDAY'){
      this.toDate =  new Date(this.addDays(1))
      this.GetUserData();
      this.GetUserWorkingHours(2,1);  // for most hour
      this.GetUserWorkingHours(2,0);  // for least hour
    } else if (data.label === 'PAST 7 DAYS'){
       this.toDate = new Date(this.addDays(7))
      this.GetUserData();
      this.GetUserWorkingHours(3,1);  // for most hour
      this.GetUserWorkingHours(3,0);  // for least hour
    } else if (data.label === 'PAST 30 DAYS'){
       this.toDate = new Date(this.addDays(30))
      this.GetUserData();
      this.GetUserWorkingHours(4,1);  // for most hour
      this.GetUserWorkingHours(4,0);  // for least hour
    } else if (data.label === 'RANGE'){
      this.openCalendar();
   } else {
      this.GetUserData();
      this.GetUserWorkingHours(1,1);  // for most hour
      this.GetUserWorkingHours(1,0);  // for least hour
    }

  }

      addDays(days) {
        return moment().subtract(days,'d').format('YYYY-MM-DD');
      }

  private GetUserData() {
    let UID = this.ReportsForm.controls.UserId.value == null ? 0 : this.ReportsForm.controls.UserId.value;
    const obj = {
      UserId :UID,
      CompanyId: this.companyId,
      FromDate: formatDate(this.toDate, 'yyyy-MM-dd', 'en_US'),
      ToDate:formatDate(this.fromDate, 'yyyy-MM-dd', 'en_US'),
    }
    this.dashboardService
      .GetUserDashboardData(obj)
      .subscribe(
        (data) => {
          if (data.StatusCode === 200) {
            console.log(data.Result,"result")
            this.userData = data.Result;
          }
        },

      );
  }


  private GetUserWorkingHours(type : number,MostHr : number) {
    this.filterType = type;
    let UID = this.ReportsForm.controls.UserId.value == null ? 0 : this.ReportsForm.controls.UserId.value;
    const obj = {
      UserId :UID,
      FilterType: type,
      FromDate: formatDate(this.fromDate, 'yyyy-MM-dd', 'en_US'),
      ToDate:formatDate(this.toDate, 'yyyy-MM-dd', 'en_US'),
      IsMostWorkingHR:MostHr,
      IsDetailHourReport:0 // 0 for dashboard
    }
    this.dashboardService
      .GetUserWorkingHours(obj)
      .subscribe(
        (data) => {
          if (data.StatusCode === 200) {
            if(MostHr == 1)
            {
              this.UserMostWorkingHours = JSON.parse(data.Result);
            }
            else{
              this.UserLeastWorkingHours = JSON.parse(data.Result);
            }
          }
        },

      );
  }

    setTime(data){
       if(data){
        const time =  data.split(':');
        const hh = time[0];
        const mm = time[1];
        return  `${hh} h  ${mm} m`;
       }
       else {
        return '00h 00m';
      }

    }

    setProgreccbar(data){
        var hoursMinutes = data.split(/[.:]/);
        var hours = parseInt(hoursMinutes[0], 10);
        var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
        return hours + minutes / 60;
    }

    private setParameter() {
      const date = new Date();
      const firstday = new Date(date.setDate(date.getDate() - date.getDay() + 1));
      return {
        SelectedUserId: '',
        selectedProjectId: '',
        UId: this.currentLoginUser.UserId,
        RoleId: this.currentLoginUser.RoleId,
        CompanyId: this.currentLoginUser.CompanyId,
        fromDate: this.fromDate ? this.fromDate : formatDate(firstday, 'yyyy-MM-dd', 'en_US'),
        toDate: this.toDate ? this.toDate : formatDate(new Date(), 'yyyy-MM-dd', 'en_US'),
      } as ReportsParameters;
    }



   openCalendar() {
      this.calendar.showOverlay()
      this.calendar.inputfieldViewChild.nativeElement.dispatchEvent(new Event('focus'))
      this.calendar.inputfieldViewChild.nativeElement.dispatchEvent(new Event('click'))
   }
}
