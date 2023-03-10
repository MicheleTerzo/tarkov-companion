import {Type}         from 'class-transformer';
import {QUEST_STATUS} from '../utils/enums';

class QuestGpsPosition {
  leftPercent!: number;
  topPercent!: number;
  floor!: string;
}

class QuestObjectiveModel {
  type!: string;
  target!: string;
  number!: number;
  location!: number;
  id!: number;
  @Type(() => QuestGpsPosition)
  gps?: QuestGpsPosition;
  with?: {
    type: string,
    name?: string,
    value?: string;
    id: { id: string }[]
  }
}

class QuestReputationModel {
  trader!: number;
  rep!: number
}

class QuestRequirementModel {
  level!: number;
  quests!: string[]
}

export class QuestModel {
  id!: number;
  @Type(() => QuestRequirementModel)
  require!: QuestRequirementModel;
  giver!: number;
  turnin!: number;
  title!: string;
  locales!: {
    en: string;
    ru: string;
    cs: string
  };
  wiki!: string;
  exp!: number;
  unlocks!: string[];
  @Type(() => QuestReputationModel)
  reputation!: QuestReputationModel[];
  @Type(() => QuestObjectiveModel)
  objectives!: QuestObjectiveModel[];
  gameId!: string
  status?: QUEST_STATUS;

  get location(): number {
    if (this.objectives.length > 1) {
      let locationId = -1;
      this.objectives.reduce((acc, curr) => {
        if (acc.location === curr.location) {
          locationId = acc.location
          return acc
        } else {
          locationId = -1
          return curr
        }
      });
      return locationId;
    }
    return this.objectives[0].location ?? -1;
  }
}
