import {Component, OnInit} from '@angular/core';
import {QuestsService}     from './services/quests.service';
import {MapsService}       from './services/maps.service';
import {ProfileService}    from './services/profile.service';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private questService: QuestsService,
    private mapsService: MapsService,
    private profileService: ProfileService) {
  }

  async ngOnInit(): Promise<void> {
    await this.initData();
  }

  async initData(): Promise<void> {
    await Promise.all([
      this.questService.initData(),
      this.mapsService.initData(),
      this.profileService.initData()
    ]);
  }
}
