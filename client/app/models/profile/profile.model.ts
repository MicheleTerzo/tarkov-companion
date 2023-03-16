import {plainToInstance, Type} from "class-transformer";
import {ProfileInfoModel} from './profile-info.model';
import {ProfileQuestsModel} from './profile-quests.model';
import {AkiInfoModel} from './aki-info.model';

export class ProfileModel {
  @Type(() => ProfileInfoModel)
  Info!: ProfileInfoModel;
  @Type(() => ProfileQuestsModel)
  Quests!: ProfileQuestsModel[];
  SurvivorClass!: string;
  @Type(() => AkiInfoModel)
  akiInfo!: AkiInfoModel;
  @Type(() => ProfileInfoModel)
  scavStats!: ProfileInfoModel;
  flea!: {
    rating: number;
    isRatingGrowing: number
  }

  static generateModel(res: any): ProfileModel {
    return plainToInstance(ProfileModel, {
      Info: res.characters.pmc.Info,
      Quests: res.characters.pmc.Quests,
      SurvivorClass: res.characters.pmc.SurvivorClass,
      akiInfo: res.aki,
      scavStats: res.characters.scav.Info,
      flea: res.characters.pmc.RagfairInfo
    });
  }
}
