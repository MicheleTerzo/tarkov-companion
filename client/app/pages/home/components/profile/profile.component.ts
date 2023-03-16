import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule}                 from '@angular/common';
import {ProfileService}               from '../../../../services/profile.service';
import {ProfileModel}                 from '../../../../models/profile/profile.model';
import {LevelModelContent}            from '../../../../models/profile/level.model';
import {Subject, takeUntil}           from 'rxjs';
import {FieldsetModule}               from 'primeng/fieldset';
import {DividerModule}                from 'primeng/divider';
import {InputTextModule}              from 'primeng/inputtext';
import {ButtonModule}                 from 'primeng/button';
import {FormsModule}                  from '@angular/forms';

@Component({
  selector   : 'app-profile',
  standalone : true,
  imports    : [CommonModule, FieldsetModule, DividerModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls  : ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userProfile?: ProfileModel;
  levels!: Map<string, LevelModelContent>;
  levelGroup = '1';
  path = '';
  private destroy$ = new Subject<void>();

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.initData().then();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async saveProfilePath(): Promise<void> {
    if (this.path !== '') {
      await this.profileService.saveProfilePath(this.path);
    }
  }

  private async initData(): Promise<void> {
    await this.initLevels();
    this.initUserSubscription();
  }

  private calculateLevelGroup(pmcLevel: string): string {
    return this.levels.get(pmcLevel)?.group ?? '1';
  }

  private async initLevels(): Promise<void> {
    this.levels = await this.profileService.getLevels();
  }

  private initUserSubscription(): void {
    this.profileService.userProfile$.pipe(takeUntil(this.destroy$)).subscribe(userProfile => {
      if (userProfile) {
        this.userProfile = userProfile;
        this.levelGroup = this.calculateLevelGroup(userProfile.Info.Level.toString());
      }
    });
  }
}
