import {Type} from "class-transformer";

export class ProfileInfoModel {
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
  @Type(() => ProfileInfoModel)
  Info!: ProfileInfoModel;
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


