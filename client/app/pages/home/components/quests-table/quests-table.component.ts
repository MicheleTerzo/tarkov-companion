import {Component, OnInit}                                        from '@angular/core';
import {LOCATIONS, QUEST_STATUS, TRADERS}                         from '../../../../utils/enums';
import {QuestsService}                                            from '../../../../services/quests.service';
import {QuestModel}                                               from '../../../../models/quest/quest.model';
import {CommonModule}                                             from '@angular/common';
import {UserModel}                                                from '../../../../models/profile/user.model';
import {CardModule}                                               from 'primeng/card';
import {TableModule}                                              from 'primeng/table';
import {ButtonModule}                                             from 'primeng/button';
import {
  asInstance, LOCATION_SELECT_OPTIONS, QUEST_STATUS_SELECT_OPTIONS, QUESTS_TABLE_COLUMNS, TRADERS_SELECT_OPTIONS
}                                                                 from '../../../../utils/constants';
import {ToggleButtonModule}                                       from 'primeng/togglebutton';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableFiltersFormInterface}                                from '../../interfaces/table-filters-form.interface';
import {InputTextModule}                                          from 'primeng/inputtext';
import {TooltipModule}                                            from 'primeng/tooltip';
import {QuestRowDetailComponent}                                  from './quest-row-detail/quest-row-detail.component';
import {MultiSelectModule}                                        from 'primeng/multiselect';
import {AnimateModule}                                            from 'primeng/animate';
import {
  ObserverVisibilityDirective
}                                                                 from '../../../../directives/observer-visibility.directive';
import {ProfileService}                                           from '../../../../services/profile.service';
import {Subject, takeUntil}                                       from 'rxjs';

@Component({
  selector   : 'app-quests-table',
  templateUrl: './quests-table.component.html',
  standalone : true,
  imports    : [CommonModule, CardModule, TableModule, ButtonModule, ToggleButtonModule, ReactiveFormsModule, InputTextModule, TooltipModule, QuestRowDetailComponent, MultiSelectModule, FormsModule, AnimateModule, ObserverVisibilityDirective],
  styleUrls  : ['./quests-table.component.scss']
})
export class QuestsTableComponent implements OnInit {
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
  private destroy$ = new Subject<void>();

  constructor(private questsService: QuestsService,
    private profileService: ProfileService) {
    this.tableFiltersForm = this.initForm();
  }

  ngOnInit(): void {
    this.initData().then();
  }

  getRequiredQuest(reqQuestId: number): QuestModel | undefined {
    return this.questsService.questsDbMap.get(reqQuestId.toString());
  }

  private initUserSubscription(): void {
    this.profileService.userProfile$.pipe(takeUntil(this.destroy$)).subscribe(userProfile => {
      if (userProfile) {
        this.userActiveQuests = this.findCommonQuests(userProfile, this.questsService.questDbArray);
      }
    });
  }

  private async initData(): Promise<void> {
    this.initUserSubscription();
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
