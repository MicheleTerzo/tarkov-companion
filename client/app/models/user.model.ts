import {Type} from "class-transformer";

class InfoModel {
  Nickname!: string;
  Side!: string;
  Level!: number;
  Experience!: number;
  RegistrationDate!: number;
}

class UserQuestModel {
  qid!: string;
  startTime!: number;
  status!: number;
  completedConditions!: string[];
  availableAfter!: number;
}

class PmcModel {
  @Type(() => InfoModel)
  Info!: InfoModel;
  @Type(() => UserQuestModel)
  Quests!: UserQuestModel[];
  SurvivorClass!: string;
}


class CharacterModel {
  @Type(() => PmcModel)
  pmc!: PmcModel
}

export class UserModel {
  @Type(() => CharacterModel)
  characters!: CharacterModel
}


