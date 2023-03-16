import {FACTIONS} from '../../utils/enums';

export class ProfileInfoModel {
  Nickname!: string;
  Side!: FACTIONS;
  Level!: number;
  Experience!: number;
  RegistrationDate!: number;
}
