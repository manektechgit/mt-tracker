import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserScreenShotsService } from 'src/app/_services/user-screen-shots.service';
import { ScreenShotRequest } from 'src/app/_models/screen-shot-request';
import { UserScreenshot } from 'src/app/_models/UserScreenshot.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-screen-log',
  templateUrl: './user-screen-log.component.html',
  styleUrls: ['./user-screen-log.component.css']
})
export class UserScreenLogComponent implements OnInit {
  curretloginUser: LoginResponseModel;
  screenShotLog: UserScreenshot;
  currentScreenShotDirectoryPath: string;
  selectedImageForPreview: string;
  seletedImageDateTime: Date;
  @Input() UserId: number;
  @Input() ProjectId: number;
  @Input() fromtime: string;
  @Input() totime: string;
  @Input() Sdate: Date;
  @Input() displayBasic: boolean;
  images: any[];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '960px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(
    private authService: AuthenticationService,
    private scrrenlogService: UserScreenShotsService) {
    this.curretloginUser = this.authService.GetLoginUserDetail();
    this.currentScreenShotDirectoryPath = environment.screenshotPath + this.curretloginUser.UserId + '/';
  }

  ngOnInit(): void {
    const screenLogRequest = {
      UserId: this.UserId,
      ProjectId: this.ProjectId,
      fromtime: this.fromtime,
      totime: this.totime,
      SDate: this.Sdate
    } as ScreenShotRequest;

    this.scrrenlogService.GetUserScreenShots(screenLogRequest).subscribe((data) => {
      if (data.StatusCode === 200) {
        this.images = data.Result;
        this.currentScreenShotDirectoryPath = environment.screenshotPath + this.images[0].UserId + '/';
      }
    });
  }
  ShowSelectedImage(selectedImage: UserScreenshot) {
    this.selectedImageForPreview = this.currentScreenShotDirectoryPath + selectedImage.Image;
    this.seletedImageDateTime = selectedImage.CreationDate;
  }

}
