import {Type} from 'class-transformer';

export class MapInfoModel {
  id!: number;
  locale!: {
    en: string,
    ru: string
  };
  wiki!: string;
  description!: string;
  enemies!: string[];
  raidDuration!: { day: number, night: number };
  svg!: {
    file: string,
    floors: string[],
    defaultFloor: string
  }

}

export class MapsModel {
  @Type(() => MapInfoModel)
  factory!: MapInfoModel;
  @Type(() => MapInfoModel)
  customs!: MapInfoModel;
  @Type(() => MapInfoModel)
  woods!: MapInfoModel;
  @Type(() => MapInfoModel)
  shoreline!: MapInfoModel;
  @Type(() => MapInfoModel)
  interchange!: MapInfoModel;
  @Type(() => MapInfoModel)
  lab!: MapInfoModel;
  @Type(() => MapInfoModel)
  reserve!: MapInfoModel;
  @Type(() => MapInfoModel)
  lighthouse!: MapInfoModel;
}
