import {Injectable}      from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {QuestModel}      from '../models/quest/quest.model';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private _quests: BehaviorSubject<QuestModel[]> = new BehaviorSubject<QuestModel[]>([]);
  quests$ = this._quests.asObservable();

  constructor() {
  }

  updateQuests(quests: QuestModel[]): void {
    this._quests.next(quests);
  }

  getQuests(): QuestModel[] {
    return this._quests.value;
  }
}
