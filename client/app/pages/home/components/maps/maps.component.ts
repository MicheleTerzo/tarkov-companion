import {Component}                        from '@angular/core';
import {CommonModule}                     from '@angular/common';
import {SelectButtonModule}               from 'primeng/selectbutton';
import {QuestsService}                    from '../../../../services/quests.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MapInfoModel}                     from '../../../../models/maps/maps.model';
import {QuestModel}                       from '../../../../models/quest/quest.model';
import {QuestObjectiveModel}              from '../../../../models/quest/quest-objective.model';
import {LOCATIONS, QUEST_STATUS, TRADERS} from '../../../../utils/enums';
import {SvgMapComponent}                  from '../../../../components/svg-map/svg-map.component';
import {CheckboxModule}                   from 'primeng/checkbox';
import {ButtonModule}                     from 'primeng/button';
import {MapsService}                      from '../../../../services/maps.service';

@Component({
  selector   : 'app-maps',
  standalone : true,
  imports    : [CommonModule, SelectButtonModule, ReactiveFormsModule, SvgMapComponent, CheckboxModule, ButtonModule],
  templateUrl: './maps.component.html',
  styleUrls  : ['./maps.component.scss']
})
export class MapsComponent {
  mapsSelectionOptions: { label: string; value: number }[] = [];
  selectedMapKey = new FormControl<number>(0, {nonNullable: true});
  selectedMap!: MapInfoModel;
  questsToShow: QuestModel[] = [];
  readonly traders = TRADERS;
  readonly locations = LOCATIONS;

  constructor(private questsService: QuestsService,
    private mapsService: MapsService) {
    this.initButtons();
  }

  isObjectiveOnThisMap(objLocationId: number): boolean {
    return objLocationId === this.selectedMap.id;
  }

  onMapChange(): void {
    const mapKey = this.selectedMapKey.getRawValue();
    this.selectedMap = this.mapsService.mapsInfoDb.get(mapKey)!;
    this.initData();
  }

  resetSelection(): void {
    this.mapsService.updateQuests([...this.questsToShow]);
  }

  onSelectionChange(quest: QuestModel) {
    if (this.isVisible(quest)) {
      const fQuests = this.mapsService.getQuests();
      const index = fQuests.findIndex(fquest => fquest.id === quest.id);
      fQuests.splice(index, 1);
      this.mapsService.updateQuests(fQuests);
    } else {
      const fQuests = this.mapsService.getQuests();
      fQuests.push(quest);
      this.mapsService.updateQuests(fQuests);
    }
  }

  isVisible(quest: QuestModel): boolean {
    return !!this.mapsService.getQuests().find(q => q.id === quest.id);
  }

  private initData(): void {
    this.questsToShow = [];
    this.questsToShow = this.filterQuestsToShow();
    this.resetSelection();
  }

  private initButtons(): void {
    for (let map of this.mapsService.mapsInfoDb.values()) {
      this.mapsSelectionOptions.push({
        label: map.locale.en.toUpperCase(),
        value: map.id
      });
    }
    this.selectedMap = this.mapsService.mapsInfoDb.get(0)!;
    this.initData();
  }

  private filterQuestsToShow(): QuestModel[] {
    return this.questsService.questDbArray.filter((quest) => {
      if (quest.status !== QUEST_STATUS.IN_PROGRESS) {
        return;
      }
      const hasSelectedLocation = (obj: QuestObjectiveModel) => obj.location === this.selectedMapKey.getRawValue() && obj.gps;
      if (quest.objectives.some(hasSelectedLocation)) {
        return quest;
      }
      return;
    });
  }
}
