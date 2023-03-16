export class ModsInstalledModel {
  author!: string;
  dateAdded!: number;
  name!: string;
  version!: string;
}

export class AkiInfoModel {
  version!: string;
  mods!: ModsInstalledModel[];
}
