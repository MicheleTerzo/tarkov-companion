import {Injectable}                      from '@angular/core';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import {QuestModel}                      from '../models/quest/quest.model';
import {MapInfoModel, MapsModel}         from '../models/maps/maps.model';
import {plainToInstance}                 from 'class-transformer';
import {HttpClient}                      from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  mapsInfoDb: Map<number, MapInfoModel> = new Map();
  private _quests: BehaviorSubject<QuestModel[]> = new BehaviorSubject<QuestModel[]>([]);
  quests$ = this._quests.asObservable();

  constructor(private http: HttpClient) {
  }

  async initData(): Promise<void>{
    await this.getMapsInfo();
  }

  updateQuests(quests: QuestModel[]): void {
    this._quests.next(quests);
  }

  getQuests(): QuestModel[] {
    return this._quests.value;
  }

  async getMapsInfo(): Promise<Map<number, MapInfoModel>> {
    const get$ = this.http.get<MapsModel>('assets/db/maps.json');
    const res = await firstValueFrom(get$);
    const instance = plainToInstance(MapsModel, res);
    this.mapsInfoDb = this.buildLocationsMap(instance);
    return this.mapsInfoDb;
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
