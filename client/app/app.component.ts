import {Component, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  profile = this.dataService.userProfile;

  constructor(private dataService: DataService) {
  }

 async ngOnInit(): Promise<void> {
   await this.initData();
  }

  async initData(): Promise<void> {
    await this.dataService.initData();
  }
}
