import { Component }          from '@angular/core';
import { CommonModule }       from '@angular/common';
import {TabViewModule}        from 'primeng/tabview';
import {QuestsTableComponent} from './components/quests-table/quests-table.component';
import {MapsComponent}        from './components/maps/maps.component';

@Component({
  selector: 'app-quests',
  standalone: true,
  imports: [CommonModule, TabViewModule, QuestsTableComponent, MapsComponent],
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.scss']
})
export class QuestsComponent {

}
