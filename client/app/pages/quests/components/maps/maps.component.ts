import {Component}                        from '@angular/core';
import {CommonModule}                     from '@angular/common';
import {SelectButtonModule}               from 'primeng/selectbutton';
import {DataService}                      from '../../../../services/data.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MapInfoModel}                     from '../../../../models/maps/maps.model';
import {QuestModel}                       from '../../../../models/quest/quest.model';
import {QuestObjectiveModel}              from '../../../../models/quest/quest-objective.model';
import {QUEST_STATUS}                     from '../../../../utils/enums';
import {SvgMapComponent}                  from '../../../../components/svg-map/svg-map.component';
import {CheckboxModule} from 'primeng/checkbox';

@Component({
  selector   : 'app-maps',
  standalone : true,
  imports: [CommonModule, SelectButtonModule, ReactiveFormsModule, SvgMapComponent, CheckboxModule],
  templateUrl: './maps.component.html',
  styleUrls  : ['./maps.component.scss']
})
export class MapsComponent {
  mapsSelectionOptions: { label: string; value: number }[] = [];
  selectedMapKey = new FormControl<number>(0, {nonNullable: true});
  selectedMap!: MapInfoModel;
  questsToShow: QuestModel[] = [];
  filteredQuests: QuestModel[] = [];

  constructor(private dataService: DataService) {
    this.initButtons();
  }

 private initButtons(): void {
    for (let map of this.dataService.mapsInfoDb.values()) {
      this.mapsSelectionOptions.push({
        label: map.locale.en.toUpperCase(),
        value: map.id
      });
    }
    this.selectedMap = this.dataService.mapsInfoDb.get(0)!;
    this.questsToShow = this.filterQuestsToShow();
  }

  onMapsChange(): void {
    const mapKey = this.selectedMapKey.getRawValue();
    this.selectedMap = this.dataService.mapsInfoDb.get(mapKey)!;
    this.questsToShow = this.filterQuestsToShow();
    this.filteredQuests = this.questsToShow;
  }

  private filterQuestsToShow(): QuestModel[] {
    return this.dataService.questDbArray.filter((quest) => {
      if(quest.status !== QUEST_STATUS.IN_PROGRESS){
        return;
      }
      const hasSelectedLocation = (obj: QuestObjectiveModel) => obj.location === this.selectedMapKey.getRawValue();
      if (quest.objectives.some(hasSelectedLocation)) {
        return quest;
      }
      return;
    });
  }

  resetSelection(): void {
    this.filteredQuests = this.questsToShow;
  }

  onSelectionChange(quest: QuestModel, index: number) {

  }

   isVisible(quest: QuestModel): boolean {
    return !!this.filteredQuests.find(q => q.id === quest.id);
  }
}
