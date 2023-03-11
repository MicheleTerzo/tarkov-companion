import {MapInfoModel}        from '../maps/maps.model';
import {QuestObjectiveModel} from './quest-objective.model';

export class QuestMapInfoModel {
  mapName!: string;
  mapData!: MapInfoModel;
  objectives!: QuestObjectiveModel[];
}
