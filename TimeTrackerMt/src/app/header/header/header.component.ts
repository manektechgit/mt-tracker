import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  exePath = environment.exePath;
  exePathMAC = environment.exePathMAC;
  isElectron=false;
  constructor(private electronService:ElectronService) { }

  ngOnInit(): void {
    this.isElectron=this.electronService.isElectronApp;
  }

}
