import { Component }          from '@angular/core';
import { CommonModule }       from '@angular/common';
import {TabViewModule}        from 'primeng/tabview';
import {QuestsTableComponent} from './components/quests-table/quests-table.component';
import {MapsComponent}        from './components/maps/maps.component';
import {ProfileComponent}     from './components/profile/profile.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TabViewModule, QuestsTableComponent, MapsComponent, ProfileComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
