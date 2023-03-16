import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule}                 from '@angular/common';
import {ProfileService}               from '../../../../services/profile.service';
import {ProfileInfoModel, UserModel}  from '../../../../models/profile/user.model';
import {LevelModelContent}            from '../../../../models/profile/level.model';
import {Subject, takeUntil}           from 'rxjs';

@Component({
  selector   : 'app-profile',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls  : ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userProfile?: UserModel;
  levels!: Map<string, LevelModelContent>;
  levelGroup = '1';
  private destroy$ = new Subject<void>();

  constructor(private profileService: ProfileService) {
  }

  get profileInfo(): ProfileInfoModel | undefined {
    return this.userProfile?.characters.pmc.Info;
  }

  getRegistrationDate(unixTimestamp?: number): string {
    return new Date(unixTimestamp * 1000).toDateString();
  }

  ngOnInit(): void {
    this.initData().then();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async initData(): Promise<void> {
    await this.initLevels();
    this.initUserSubscription();
    // await this.profileService.getProfile();
  }

  private calculateLevelGroup(pmcLevel: string): string {
    return this.levels.get(pmcLevel)?.group ?? '1';
  }

  private async initLevels(): Promise<void> {
    this.levels = await this.profileService.getlevels();
  }

  private initUserSubscription(): void {
    this.profileService.userProfile$.pipe(takeUntil(this.destroy$)).subscribe(userProfile => {
      if (userProfile) {
        this.userProfile = userProfile;
        console.log(userProfile.characters.pmc);
        console.log(new Date(userProfile.characters.pmc.Info.RegistrationDate * 1000))
        this.levelGroup = this.calculateLevelGroup(userProfile.characters.pmc.Info.Level.toString());
      }
    });
  }
}
