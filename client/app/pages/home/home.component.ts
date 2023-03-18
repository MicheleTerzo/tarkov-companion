import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule}                 from '@angular/common';
import {TabViewModule}                from 'primeng/tabview';
import {QuestsTableComponent}         from './components/quests-table/quests-table.component';
import {MapsComponent}                from './components/maps/maps.component';
import {ProfileComponent}             from './components/profile/profile.component';
import {QuestsService}                from '../../services/quests.service';
import {MapsService}                  from '../../services/maps.service';
import {ProfileService}               from '../../services/profile.service';
import {ProfileModel}                 from '../../models/profile/profile.model';
import {Subject, takeUntil}           from 'rxjs';
import {LevelModelContent}            from '../../models/profile/level.model';
import {QuestModel}                   from '../../models/quest/quest.model';
import {QUEST_STATUS}                 from '../../utils/enums';
import {MessageService}               from 'primeng/api';

@Component({
  selector   : 'app-home',
  standalone : true,
  imports    : [CommonModule, TabViewModule, QuestsTableComponent, MapsComponent, ProfileComponent],
  templateUrl: './home.component.html',
  styleUrls  : ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  userProfile?: ProfileModel;
  userActiveQuests: QuestModel[] = [];
  levelGroup = '1';
  private levels!: Map<string, LevelModelContent>;
  private destroy$ = new Subject<void>();

  constructor(private questsService: QuestsService,
    private mapsService: MapsService,
    private profileService: ProfileService,
    private messageService: MessageService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async ngOnInit(): Promise<void> {
    await this.initData();
  }

  async initData(): Promise<void> {
    this.levels = this.profileService.levels;
    this.initUserSubscription();
    await Promise.all([
      this.questsService.initData(),
      this.mapsService.initData(),
      this.profileService.initData()
    ]);
  }

  async refreshProfile(): Promise<void> {
    await this.profileService.getProfile();
    this.messageService.add({severity: 'success', summary: 'Profile updated'});
  }

  async onSaveProfile(path: string): Promise<void> {
    await this.profileService.saveProfilePath(path);
    await this.refreshProfile();
  }

  private calculateLevelGroup(pmcLevel: string): string {
    return this.levels.get(pmcLevel)?.group ?? '1';
  }

  private findCommonQuests(profile: ProfileModel, questsDB: QuestModel[]): QuestModel[] {
    if (!questsDB && !profile) {
      return [];
    }
    const pmcQuests = profile.Quests;
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

  private initUserSubscription(): void {
    this.profileService.userProfile$.pipe(takeUntil(this.destroy$)).subscribe(userProfile => {
      if (userProfile) {
        console.log(userProfile.Quests.find(quest => quest.qid === "5a27b80086f774429a5d7e20"));
        this.userProfile = userProfile;
        this.levelGroup = this.calculateLevelGroup(userProfile.Info.Level.toString());
        this.userActiveQuests = this.findCommonQuests(userProfile, this.questsService.questDbArray);
      }
    });
  }
}


