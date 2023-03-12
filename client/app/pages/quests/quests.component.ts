import {Component, OnInit}                                        from '@angular/core';
import {LOCATIONS, QUEST_STATUS, TRADERS}                         from '../../utils/enums';
import {DataService}                                              from '../../services/data.service';
import {QuestModel}                                               from '../../models/quest/quest.model';
import {CommonModule}                                             from '@angular/common';
import {UserModel}                                                from '../../models/user.model';
import {CardModule}                                               from 'primeng/card';
import {TableModule}                                              from 'primeng/table';
import {ButtonModule}                                             from 'primeng/button';
import {
  asInstance, LOCATION_SELECT_OPTIONS, QUEST_STATUS_SELECT_OPTIONS, QUESTS_TABLE_COLUMNS, TRADERS_SELECT_OPTIONS
}                                                                 from '../../utils/constants';
import {ToggleButtonModule}                                       from 'primeng/togglebutton';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableFiltersFormInterface}                                from './interfaces/table-filters-form.interface';
import {InputTextModule}                                          from 'primeng/inputtext';
import {TooltipModule}                                            from 'primeng/tooltip';
import {
  QuestRowDetailComponent
}                                                                 from './components/quest-row-detail/quest-row-detail.component';
import {MultiSelectModule}                                        from 'primeng/multiselect';
import {AnimateModule}                                            from 'primeng/animate';
import {ObserverVisibilityDirective}                              from '../../directives/observer-visibility.directive';

@Component({
  selector   : 'app-quests',
  templateUrl: './quests.component.html',
  standalone : true,
  imports    : [CommonModule, CardModule, TableModule, ButtonModule, ToggleButtonModule, ReactiveFormsModule, InputTextModule, TooltipModule, QuestRowDetailComponent, MultiSelectModule, FormsModule, AnimateModule, ObserverVisibilityDirective],
  styleUrls  : ['./quests.component.scss']
})
export class QuestsComponent implements OnInit {
  userActiveQuests: QuestModel[] = [];
  filteredUserQuests: QuestModel[] = [];
  tableColumns = QUESTS_TABLE_COLUMNS;
  tradersSelectOptions = TRADERS_SELECT_OPTIONS;
  statusSelectOptions = QUEST_STATUS_SELECT_OPTIONS;
  locationSelectOptions = LOCATION_SELECT_OPTIONS;
  asQuestModel = asInstance<QuestModel>();
  asQuestModelTableColumns = asInstance<{ header: string; field: keyof QuestModel }>();
  tableFiltersForm: FormGroup<TableFiltersFormInterface>;
  pmcQuests: any;
  readonly tradersNames = TRADERS;
  readonly questStatus = QUEST_STATUS;
  readonly locationNames = LOCATIONS;

  constructor(private dataService: DataService) {
    this.tableFiltersForm = this.initForm();
  }

  ngOnInit(): void {
    this.initData().then();
  }

  getRequiredQuest(reqQuestId: number): QuestModel | undefined {
    return this.dataService.questsDbMap.get(reqQuestId.toString());
  }

  private async initData(): Promise<void> {
    const profile = await this.dataService.getProfile();
    await this.dataService.getQuests();
    const questDb = this.dataService.questDbArray;
    this.userActiveQuests = this.findCommonQuests(profile, questDb);
    this.filteredUserQuests = this.userActiveQuests;
  }

  private findCommonQuests(profile: UserModel, questsDB: QuestModel[]): QuestModel[] {
    if (!questsDB && !profile) {
      return [];
    }
    const pmcQuests = profile.characters.pmc.Quests;
    this.pmcQuests = pmcQuests;
    return questsDB.map((quest) => {
      const pmcQuest = pmcQuests.find((q) => q.qid === quest.gameId);
      if (pmcQuest) {
        quest.status = pmcQuest.status;
      } else {
        quest.status = QUEST_STATUS.LOCKED;
      }
      return quest;
    });
  }

  private initForm(): FormGroup<TableFiltersFormInterface> {
    return new FormGroup<TableFiltersFormInterface>({
      showCompleted: new FormControl<boolean>(false, {nonNullable: true})
    });
  }
}
