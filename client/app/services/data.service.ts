import {Injectable}               from '@angular/core';
import {HttpClient}               from '@angular/common/http';
import {firstValueFrom}           from 'rxjs';
import {plainToInstance}          from 'class-transformer';
import {QuestModel}               from '../models/quest/quest.model';
import {UserModel}                from '../models/user.model';
import {MapInfoModel, MapsModel}  from '../models/maps/maps.model';
import {ItemInfoModel, ItemModel} from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userProfile?: UserModel = plainToInstance(UserModel, {});
  questsDbMap: Map<string, QuestModel> = new Map();
  mapsInfoDb: Map<number, MapInfoModel> = new Map();
  itemInfoDb: Map<string, ItemInfoModel> = new Map();
  questDbArray: QuestModel[] = [];
  private mockProfileUrl = 'assets/db/mock-profile.json';

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

  async getQuests(): Promise<Map<string, QuestModel>> {
    const get$ = this.http.get<QuestModel[]>('assets/db/quests.json');
    const res = await firstValueFrom(get$);
    const instance = plainToInstance(QuestModel, res);

    this.questDbArray = instance;
    this.questsDbMap = new Map<string, QuestModel>(Object.entries(instance));
    return this.questsDbMap;
  }

  async getProfile(): Promise<UserModel> {
    //'http://localhost:3000/user-profile'
    const get$ = this.http.get(this.mockProfileUrl);
    const res = await firstValueFrom(get$);
    this.userProfile = plainToInstance(UserModel, res);
    return this.userProfile;
  }

  async getMapsInfo(): Promise<Map<number, MapInfoModel>> {
    const get$ = this.http.get<MapsModel>('assets/db/maps.json');
    const res = await firstValueFrom(get$);
    const instance = plainToInstance(MapsModel, res);
    this.mapsInfoDb = this.buildLocationsMap(instance);
    return this.mapsInfoDb;
  }

  async getItemInfo(): Promise<Map<string, ItemInfoModel>> {
    const get$ = this.http.get<ItemModel>('assets/db/items.en.json');
    const res = await firstValueFrom(get$);
    const instance = plainToInstance(ItemModel, res);
    this.itemInfoDb = new Map<string, ItemInfoModel>(Object.entries(instance));
    return this.itemInfoDb;
  }

  private buildLocationsMap(instance: MapsModel): Map<number, MapInfoModel> {
    const mapsArray = Object.entries(instance);
    const locationMap = new Map<number, MapInfoModel>();
    mapsArray.forEach((map) => {
      locationMap.set(map[1].id, map[1]);
    });
    return locationMap;
  }
}
