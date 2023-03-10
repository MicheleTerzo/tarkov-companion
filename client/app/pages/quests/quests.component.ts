import {
  Component,
  OnInit
}                     from '@angular/core';
import {
  LOCATIONS,
  QUEST_STATUS,
  TRADERS
} from '../../utils/enums';
import {DataService}  from '../../services/data.service';
import {QuestModel}   from '../../models/quest.model';
import {CommonModule} from '@angular/common';
import {UserModel}    from '../../models/user.model';
import {CardModule}   from 'primeng/card';
import {TableModule}  from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {asInstance}   from '../../utils/constants';

@Component({
  selector   : 'app-quests',
  templateUrl: './quests.component.html',
  standalone : true,
  imports    : [CommonModule, CardModule, TableModule, ButtonModule],
  styleUrls  : ['./quests.component.scss']
})
export class QuestsComponent implements OnInit {
  userActiveQuests: QuestModel[] = [];
  readonly tradersNames = TRADERS;
  readonly questStatus = QUEST_STATUS;
  readonly locationNames = LOCATIONS;
  tableColumns: { header: string; field: keyof QuestModel }[] = [
    {
      header: 'Title',
      field : 'title'
    },
    {
      header: 'Status',
      field : 'status'
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

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.initData().then();
  }

  private async initData(): Promise<void> {
    const profile = await this.dataService.getProfile();
    const questDb = this.dataService.questsDb;
    const maps = await this.dataService.getMapsInfo();
    if (!questDb.length) {
      await this.dataService.getQuests();
    }
    console.log(profile.characters.pmc.Quests)
    this.userActiveQuests = this.findCommonQuests(profile, questDb);
  }

  private findCommonQuests(profile: UserModel, questsDB: QuestModel[]): QuestModel[] {
    if (!questsDB && !profile) {
      return [];
    }
    const pmcQuests = profile.characters.pmc.Quests;
    return questsDB.filter((quest) => {
      const pmcQuest = pmcQuests.find((q) => q.qid === quest.gameId);
      if (!pmcQuest) {
        return;
      }
      quest.status = pmcQuest.status;
      return quest
    })
  }
}
