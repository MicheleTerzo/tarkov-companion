import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {plainToInstance} from "class-transformer";
import {QuestModel} from "../models/quest.model";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userProfile?: UserModel;

  questsDb: QuestModel[] = [];

  constructor(private http: HttpClient) {
  }

  async initData(): Promise<void> {
    await Promise.all([
      this.getProfile(),
      this.getQuests()
    ]);
  }

  async getQuests(): Promise<QuestModel[]> {
    const get$ = this.http.get<QuestModel[]>('assets/db/quests.json');
    const res = await firstValueFrom(get$);
    this.questsDb = plainToInstance(QuestModel, res);
    return this.questsDb;
  }

  async getProfile(): Promise<UserModel> {
    const get$ = this.http.get('http://localhost:3000/user-profile');
    const res = await firstValueFrom(get$)
    this.userProfile = plainToInstance(UserModel, res);
    return this.userProfile;
  }

}
