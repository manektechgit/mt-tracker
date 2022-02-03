import { Component, OnInit } from '@angular/core';
import { AppJsPath } from 'src/app/_app-constants/app-constants.config';
import { ElectronservService } from '../../../_services/electronserv.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(private electronService: ElectronservService, private modalService: NgbModal) { }

  ngOnInit(): void {
    $.getScript(AppJsPath.customJs);
  }
  openXl(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}
