export class ItemInfoModel {
  id!: string
  name!: string;
  shortName!: string;
}

export class ItemModel {
  [key: string]: ItemInfoModel
}
