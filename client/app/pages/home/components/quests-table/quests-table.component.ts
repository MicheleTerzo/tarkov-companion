import {Component, Input, OnInit}         from '@angular/core';
import {LOCATIONS, QUEST_STATUS, TRADERS} from '../../../../utils/enums';
import {QuestsService}                    from '../../../../services/quests.service';
import {QuestModel}                       from '../../../../models/quest/quest.model';
import {CommonModule}                     from '@angular/common';
import {CardModule}                       from 'primeng/card';
import {TableModule}                      from 'primeng/table';
import {ButtonModule}                     from 'primeng/button';
import {
  asInstance, LOCATION_SELECT_OPTIONS, QUEST_STATUS_SELECT_OPTIONS, QUESTS_TABLE_COLUMNS, TRADERS_SELECT_OPTIONS
}                                         from '../../../../utils/constants';
import {ToggleButtonModule}               from 'primeng/togglebutton';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule}                  from 'primeng/inputtext';
import {TooltipModule}                    from 'primeng/tooltip';
import {QuestRowDetailComponent}          from './quest-row-detail/quest-row-detail.component';
import {MultiSelectModule}                from 'primeng/multiselect';
import {AnimateModule}                    from 'primeng/animate';
import {ObserverVisibilityDirective}      from '../../../../directives/observer-visibility.directive';

@Component({
  selector   : 'app-quests-table',
  templateUrl: './quests-table.component.html',
  standalone : true,
  imports    : [CommonModule, CardModule, TableModule, ButtonModule, ToggleButtonModule, ReactiveFormsModule, InputTextModule, TooltipModule, QuestRowDetailComponent, MultiSelectModule, FormsModule, AnimateModule, ObserverVisibilityDirective],
  styleUrls  : ['./quests-table.component.scss']
})
export class QuestsTableComponent implements OnInit {
  @Input() userActiveQuests: QuestModel[] = [];
  tableColumns = QUESTS_TABLE_COLUMNS;
  tradersSelectOptions = TRADERS_SELECT_OPTIONS;
  statusSelectOptions = QUEST_STATUS_SELECT_OPTIONS;
  locationSelectOptions = LOCATION_SELECT_OPTIONS;
  asQuestModel = asInstance<QuestModel>();
  asQuestModelTableColumns = asInstance<{ header: string; field: keyof QuestModel }>();
  readonly tradersNames = TRADERS;
  readonly questStatus = QUEST_STATUS;
  readonly locationNames = LOCATIONS;

  constructor(private questsService: QuestsService) {
  }

  ngOnInit(): void {
  }

  getRequiredQuest(reqQuestId: number): QuestModel | undefined {
    return this.questsService.questsDbMap.get(reqQuestId.toString());
  }
}
