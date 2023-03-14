import {Type} from 'class-transformer';

export class LeafLeftMapSetup {
  fileName!: string;
  minZoom!: number;
  maxZoom!: number;
  zoom!: number;
  center!: [number, number];
  widthPx!: number;
  heightPx!: number;
}

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
  @Type(() => LeafLeftMapSetup)
  leafletSetup!: LeafLeftMapSetup;
}

export class MapsModel {
  [key: string]: MapInfoModel;
}
