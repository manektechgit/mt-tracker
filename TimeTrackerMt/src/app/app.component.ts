import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { TitleService } from './_services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dbService: NgxIndexedDBService) {
  }
}
