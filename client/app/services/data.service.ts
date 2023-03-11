import {Injectable}               from '@angular/core';
import {HttpClient}               from '@angular/common/http';
import {firstValueFrom}           from 'rxjs';
import {plainToInstance} from 'class-transformer';
import {QuestModel}      from '../models/quest/quest.model';
import {UserModel}                from '../models/user.model';
import {MapInfoModel, MapsModel}  from '../models/maps/maps.model';
import {ItemInfoModel, ItemModel} from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userProfile?: UserModel = plainToInstance(UserModel, {});
  questsDb: QuestModel[] = [];
  mapsInfoDb: Map<string, MapInfoModel> = new Map();
  itemInfoDb: Map<string, ItemInfoModel> = new Map();

  constructor(private http: HttpClient) {
  }

  async initData(): Promise<void> {
    await Promise.all([
      this.getProfile(),
      this.getQuests(),
      this.getMapsInfo(),
      this.getItemInfo()
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

  async getMapsInfo(): Promise<Map<string, MapInfoModel>> {
    const get$ = this.http.get<MapsModel>('assets/db/maps.json');
    const res = await firstValueFrom(get$);
    const instance = plainToInstance(MapsModel, res);
    this.mapsInfoDb = new Map<string, MapInfoModel>(Object.entries(instance));
    return this.mapsInfoDb;
  }

  async getItemInfo(): Promise<Map<string, ItemInfoModel>> {
    const get$ = this.http.get<ItemModel>('assets/db/items.en.json');
    const res = await firstValueFrom(get$);
    const instance = plainToInstance(ItemModel, res);
    this.itemInfoDb = new Map<string, ItemInfoModel>(Object.entries(instance));
    return this.itemInfoDb;
  }
}
