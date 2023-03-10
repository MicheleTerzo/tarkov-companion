import {Type} from "class-transformer";
import {QUEST_STATUS} from "../utils/enums";

class QuestObjectiveModel {
  type!: string;
  target!: string;
  number!: number;
  location!: number;
  id!: number;
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
  status?: QUEST_STATUS
}
