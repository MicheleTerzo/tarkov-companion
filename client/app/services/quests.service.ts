import {Injectable}               from '@angular/core';
import {HttpClient}               from '@angular/common/http';
import {firstValueFrom}           from 'rxjs';
import {plainToInstance}          from 'class-transformer';
import {QuestModel}               from '../models/quest/quest.model';
import {ItemInfoModel, ItemModel} from '../models/item.model';
import {LOCATIONS, TRADERS}       from '../utils/enums';

@Injectable({
  providedIn: 'root'
})
export class QuestsService {
  questsDbMap: Map<string, QuestModel> = new Map();
  itemInfoDb: Map<string, ItemInfoModel> = new Map();
  questDbArray: QuestModel[] = [];

  constructor(private http: HttpClient) {
  }

  async initData(): Promise<void> {
    await Promise.all([
      this.getItemInfo(),
      this.getQuests()
    ]);
  }

  async getQuests(): Promise<Map<string, QuestModel>> {
    const get$ = this.http.get<QuestModel[]>('assets/db/quests.json');
    const res = await firstValueFrom(get$);
    const instance = plainToInstance(QuestModel, res);
    this.parseQuestObjectives(instance);
    this.questDbArray = instance;
    this.questsDbMap = new Map<string, QuestModel>(Object.entries(instance));
    return this.questsDbMap;
  }

  async getItemInfo(): Promise<Map<string, ItemInfoModel>> {
    const get$ = this.http.get<ItemModel>('assets/db/items.en.json');
    const res = await firstValueFrom(get$);
    const instance = plainToInstance(ItemModel, res);
    this.itemInfoDb = new Map<string, ItemInfoModel>(Object.entries(instance));
    return this.itemInfoDb;
  }

  private parseQuestObjectives(instance: QuestModel[]): void {
    instance.forEach(quest => {
      quest.objectives.forEach(objective => {
        let string = '';
        const target = this.itemInfoDb.get(objective.target)?.name ?? objective.target;
        const location = LOCATIONS[objective.location];
        const tool = this.itemInfoDb.get(objective.tool!)?.name ?? null;
        const withArray = objective.with as string[];
        switch (objective.type) {
          case 'key':
            string = `find ${target} `;
            break;
          case 'pickup':
            string = `${objective.type} ${target} in ${location} ${objective.location === LOCATIONS.ANY ? 'location' : ''}`;
            break;
          case 'find':
            string = `${objective.type} ${objective.number} ${target}`;
            break;
          case 'reputation':
            string = `reach level ${objective.number} with ${TRADERS[objective.target as unknown as number]}`;
            break;
          case 'locate':
            string = `${objective.type} ${target} in ${location}`;
            break;
          case 'skill':
            string = `reach level ${objective.number} in ${target} ${objective.type}`;
            break;
          case 'mark':
            string = `${tool ? 'use ' + tool + ' to' : ''} ${objective.type} ${target} in ${location}`;
            break;
          case 'build':
            string = `${objective.type} ${target}`;
            break;
          case 'survive':
            string = `${objective.type} and extract from ${target} in ${location}`;
            break;
          default:
            string = `${objective.type} ${objective.number} ${target} in ${location} ${objective.location === LOCATIONS.ANY ? 'location' : ''}`;
        }
        if (withArray && withArray.length) {
          withArray.forEach(keyword => {
            string = `${string} (${this.itemInfoDb.get(keyword)?.name ?? keyword})`;
          });
        }
        objective.completeString = string.toUpperCase();
      });
    });
  }
}
