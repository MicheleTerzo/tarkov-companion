import {Type}                 from 'class-transformer';
import {QuestGpsPosition}     from './quest-gps-position.model';
import {GunsmithRequirements} from './gunsmith-requirements.model';

export class QuestObjectiveModel {
  completeString?: string;
  type!: string ;
  target!: string;
  tool?: string;
  number!: number;
  location!: number;
  id!: number;
  @Type(() => QuestGpsPosition)
  gps?: QuestGpsPosition;
  with?: string[] | GunsmithRequirements;
}
