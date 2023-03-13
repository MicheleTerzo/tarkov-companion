import {QuestModel}                       from '../models/quest/quest.model';
import {LOCATIONS, QUEST_STATUS, TRADERS} from './enums';

export const asInstance = <T>() => (data: any) => data as T;
export const QUESTS_TABLE_COLUMNS: { header: string; field: keyof QuestModel }[] = [
  {
    header: 'Title',
    field : 'title'
  },
  {
    header: 'Status',
    field : 'statusIcon'
  },
  {
    header: 'Trader',
    field : 'giver'
  },
  {
    header: 'Location',
    field : 'location'
  },
  {
    header: 'Require',
    field: 'require'
  }
];
export const QUEST_STATUS_SELECT_OPTIONS = [
  {
    value: QUEST_STATUS.LOCKED,
    label: 'LOCKED'
  },
  {
    value: QUEST_STATUS.AVAILABLE,
    label: 'AVAILABLE'
  },
  {
    value: QUEST_STATUS.IN_PROGRESS,
    label: 'IN PROGRESS'
  },
  {
    value: QUEST_STATUS.FINISHED,
    label: 'FINISHED'
  },
  {
    value: QUEST_STATUS.COMPLETED,
    label: 'COMPLETED'
  },
  {
    value: QUEST_STATUS.FAILED,
    label: 'FAILED'
  }
];
export const TRADERS_SELECT_OPTIONS = [
  {
    value: TRADERS.PRAPOR,
    label: 'PRAPOR'
  },
  {
    value: TRADERS.THERAPIST,
    label: 'THERAPIST'
  },
  {
    value: TRADERS.SKIER,
    label: 'SKIER'
  },
  {
    value: TRADERS.PEACEKEEPER,
    label: 'PEACEKEEPER'
  },
  {
    value: TRADERS.MECHANIC,
    label: 'MECHANIC'
  },
  {
    value: TRADERS.RAGMAN,
    label: 'RAGMAN'
  },
  {
    value: TRADERS.JAEGER,
    label: 'JAEGER'
  },
  {
    value: TRADERS.FENCE,
    label: 'FENCE'
  }
];
export const LOCATION_SELECT_OPTIONS = [
  {
    value: LOCATIONS.ANY,
    label: 'ANY'
  },
  {
    value: LOCATIONS.FACTORY,
    label: 'FACTORY'
  },
  {
    value: LOCATIONS.CUSTOMS,
    label: 'CUSTOMS'
  },
  {
    value: LOCATIONS.WOODS,
    label: 'WOODS'
  },
  {
    value: LOCATIONS.SHORELINE,
    label: 'SHORELINE'
  },
  {
    value: LOCATIONS.INTERCHANGE,
    label: 'INTERCHANGE'
  },
  {
    value: LOCATIONS.LAB,
    label: 'THE LAB'
  },
  {
    value: LOCATIONS.RESERVE,
    label: 'RESERVE'
  },
  {
    value: LOCATIONS.LIGHTHOUSE,
    label: 'LIGHTHOUSE'
  },
  {
    value: LOCATIONS.STREETS_OF_TARKOV,
    label: 'STREETS OF TARKOV'
  }
];
