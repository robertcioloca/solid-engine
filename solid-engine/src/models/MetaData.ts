export interface MetaDataModelChaper {
  number: number;
  current: boolean;
}

export interface MetaDataModel {
  title: string;
  chapters: MetaDataModelChaper[];
}
