import {Type}                  from 'class-transformer';
import {QUEST_STATUS}          from '../../utils/enums';
import {QuestReputationModel}  from './quest-reputation.model';
import {QuestObjectiveModel}   from './quest-objective.model';
import {QuestRequirementModel} from './quest-requirement.model';
import {QuestMapInfoModel}     from './quest-map-info.model';

export class QuestModel {
  id!: number;
  @Type(() => QuestRequirementModel)
  require!: QuestRequirementModel;
  giver!: number;
  turnin!: number;
  title!: string;
  locales!: {
    en: string;
  };
  wiki!: string;
  exp!: number;
  unlocks!: string[];
  @Type(() => QuestReputationModel)
  reputation!: QuestReputationModel[];
  @Type(() => QuestObjectiveModel)
  objectives!: QuestObjectiveModel[];
  gameId!: string;
  status?: QUEST_STATUS;
  noKappa?: boolean;
  mapInfo?: QuestMapInfoModel[];

  get location(): number {
    if (this.objectives.length > 1) {
      let locationId = -1;
      this.objectives.reduce((acc, curr) => {
        if (acc.location === curr.location) {
          locationId = acc.location;
          return acc;
        } else {
          locationId = -1;
          return curr;
        }
      });
      return locationId;
    }
    return this.objectives[0]?.location ?? -1;
  }

  get statusIcon(): { name: string; css: string; tooltip: string } {
    const standardClasses = 'p-button-rounded p-button-outlined';
    switch (this.status) {
      case QUEST_STATUS.COMPLETED:
        return {name: 'pi pi-check', css: `${standardClasses} p-button-success`, tooltip: 'Completed'};
      case QUEST_STATUS.FAILED:
        return {name: 'pi pi-times', css: `${standardClasses} p-button-danger`, tooltip: 'Failed'};
      case QUEST_STATUS.IN_PROGRESS:
        return {name: 'pi pi-sync', css: `${standardClasses} p-button-info`, tooltip: 'In Progress'};
      case QUEST_STATUS.FINISHED:
        return {name: 'pi pi-verified', css: `${standardClasses} p-button-help`, tooltip: 'Finished'};
      case QUEST_STATUS.LOCKED:
        return {name: 'pi pi-lock', css: `${standardClasses} p-button-danger`, tooltip: 'Locked'};
      default:
        return {name: 'pi pi-lock-open', css: `${standardClasses} p-button-primary`, tooltip: 'Available'};
    }
  }
}
