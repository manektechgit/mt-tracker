import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { AppJsPath } from 'src/app/_app-constants/app-constants.config';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NgbDateParserFormatter,} from '@ng-bootstrap/ng-bootstrap';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { formatDate } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.css']
})
export class ReportSummaryComponent implements OnInit {
  @Input() ReportSummeryDetails:any;      
  currentLoginUser: LoginResponseModel;
  
 
  constructor(   
    public formatter: NgbDateParserFormatter,
    private authenticationService: AuthenticationService
  ) {
   
    this.currentLoginUser = this.authenticationService.GetLoginUserDetail();    
  }
  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);      
  }
  ngOnChanges(changes: SimpleChanges) {
    changes.ReportSummeryDetails.currentValue;
    this.ReportSummeryDetails=changes.ReportSummeryDetails.currentValue; 
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.ReportSummeryDetails);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Report");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      let filename = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en_US');
      FileSaver.saveAs(data, filename + EXCEL_EXTENSION);
    });
  }

  setCustomDateRange() {
    var date = new Date();
    date.setDate(date.getDate() - 7);   
  }

  removeZero(time: any) {
    let timeData = (time.split(":"));
    return timeData[0] + ':' + timeData[1] + ':' + timeData[2]
  }
}
