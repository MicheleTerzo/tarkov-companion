import {Component, OnInit}                           from '@angular/core';
import {LOCATIONS, QUEST_STATUS, TRADERS}            from '../../utils/enums';
import {DataService}  from '../../services/data.service';
import {QuestModel}   from '../../models/quest/quest.model';
import {CommonModule} from '@angular/common';
import {UserModel}                                   from '../../models/user.model';
import {CardModule}                                  from 'primeng/card';
import {TableModule}                                 from 'primeng/table';
import {ButtonModule}                                from 'primeng/button';
import {asInstance}                                  from '../../utils/constants';
import {ToggleButtonModule}                          from 'primeng/togglebutton';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TableFiltersFormInterface}                   from './interfaces/table-filters-form.interface';
import {InputTextModule}                             from 'primeng/inputtext';
import {TooltipModule}                               from 'primeng/tooltip';
import {QuestRowDetailComponent}                     from './components/quest-row-detail/quest-row-detail.component';

@Component({
  selector   : 'app-quests',
  templateUrl: './quests.component.html',
  standalone : true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule, ToggleButtonModule, ReactiveFormsModule, InputTextModule, TooltipModule, QuestRowDetailComponent],
  styleUrls  : ['./quests.component.scss']
})
export class QuestsComponent implements OnInit {
  userActiveQuests: QuestModel[] = [];
  filteredUserQuests: QuestModel[] = [];
  tableColumns: { header: string; field: keyof QuestModel }[] = [
    {
      header: 'Title',
      field : 'title'
    },
    {
      header: 'Status',
      field : 'statusIcon'
    },
    {
      header: 'Trader',
      field : 'giver'
    },
    {
      header: 'Location',
      field : 'location'
    }
  ]
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

  onToggleCompletedClick() {
    if (!this.tableFiltersForm.controls.showCompleted.value) {
      this.filteredUserQuests = this.userActiveQuests.filter(
        q => q.status !== QUEST_STATUS.COMPLETED && q.status !== QUEST_STATUS.FAILED)
    } else {
      this.filteredUserQuests = this.userActiveQuests
    }
  }

  private async initData(): Promise<void> {
    const profile = await this.dataService.getProfile();
    const questDb = this.dataService.questsDb;
    if (!questDb.length) {
      await this.dataService.getQuests();
    }
    this.userActiveQuests = this.findCommonQuests(profile, questDb);
    this.filteredUserQuests = this.userActiveQuests.filter(
      q => q.status !== QUEST_STATUS.COMPLETED && q.status !== QUEST_STATUS.FAILED);
  }

  private findCommonQuests(profile: UserModel, questsDB: QuestModel[]): QuestModel[] {
    if (!questsDB && !profile) {
      return [];
    }
    const pmcQuests = profile.characters.pmc.Quests;
    this.pmcQuests = pmcQuests
    return questsDB.filter((quest) => {
      const pmcQuest = pmcQuests.find((q) => q.qid === quest.gameId);
      if (!pmcQuest) {
        return;
      }
      quest.status = pmcQuest.status;
      return quest
    })
  }

  private initForm(): FormGroup<TableFiltersFormInterface> {
    return new FormGroup<TableFiltersFormInterface>({
      showCompleted: new FormControl<boolean>(false, {nonNullable: true})
    });
  }
}
