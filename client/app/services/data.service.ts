import {Injectable}      from '@angular/core';
import {HttpClient}      from '@angular/common/http';
import {firstValueFrom}  from 'rxjs';
import {plainToInstance} from 'class-transformer';
import {QuestModel}      from '../models/quest.model';
import {UserModel}       from '../models/user.model';
import {
  MapInfoModel,
  MapsModel
}                        from '../models/maps.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userProfile?: UserModel;

  questsDb: QuestModel[] = [];

  mapsInfoDb: Map<number, MapInfoModel> = new Map();

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

  async getMapsInfo(): Promise<Map<number, MapInfoModel>> {
    const get$ = this.http.get<MapsModel>('assets/db/maps.json');
    const res = await firstValueFrom(get$);
    const instance = plainToInstance(MapsModel, res);
    this.mapsInfoDb = this.parseMapInfo(instance);
    return this.mapsInfoDb;
  }

  private parseMapInfo(instance: MapsModel): Map<number, MapInfoModel> {
    const mapsMap = new Map<number, MapInfoModel>();
    const mapsNames = Object.keys(instance);
    // @ts-ignore
    mapsNames.forEach((mapName: keyof MapsModel) => {
      const map = instance[mapName];
      mapsMap.set(map.id, map);
    });
    return mapsMap;
  }

}
