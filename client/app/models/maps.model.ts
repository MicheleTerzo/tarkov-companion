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
  [key: string]: MapInfoModel;
}
