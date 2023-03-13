import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataService} from '../../../../services/data.service';
import {QuestModel} from '../../../../models/quest/quest.model';
import {LOCATIONS, QUEST_STATUS, TRADERS} from '../../../../utils/enums';
import {QuestObjectiveModel} from '../../../../models/quest/quest-objective.model';
import {SvgMapComponent} from '../../../../components/svg-map/svg-map.component';
import {asInstance} from '../../../../utils/constants';
import {GunsmithRequirements} from '../../../../models/quest/gunsmith-requirements.model';

@Component({
  selector: 'app-quest-row-detail',
  standalone: true,
  imports: [CommonModule, SvgMapComponent],
  templateUrl: './quest-row-detail.component.html',
  styleUrls: ['./quest-row-detail.component.scss']
})
export class QuestRowDetailComponent implements OnInit {
  @Input() quest!: QuestModel;
  isGunsmithQuest = false;
  asGunsmithModel = asInstance<GunsmithRequirements[]>();
  questStatus = QUEST_STATUS;
  readonly traderNames = TRADERS;

  constructor(private dataService: DataService) {
  }

  getParsedName(key: string): string {
    return this.dataService.itemInfoDb.get(key)?.name ?? '';
  }

  getGunsmithString(model: GunsmithRequirements): string {
    const type = model.type;
    const name = model.name ?? '';
    const id = this.getParsedName(model.id ?? '');
    const value = model.value ?? '';
    return (`${type}: ${name} ${id} ${value}`).toUpperCase();
  }

  ngOnInit(): void {
    if (this.quest.title.includes('Gunsmith')) {
      this.isGunsmithQuest = true;
      return;
    }
    this.quest.objectives.forEach(objective => {
      this.parseQuestObjectives(objective);
    });
  }

  private parseQuestObjectives(objective: QuestObjectiveModel): void {
    let string = '';
    const target = this.dataService.itemInfoDb.get(objective.target)?.name ?? objective.target;
    const location = LOCATIONS[objective.location];
    const tool = this.dataService.itemInfoDb.get(objective.tool!)?.name ?? null;
    const withArray = objective.with as string[];
    switch (objective.type) {
      case 'key':
        string = `find ${target} `;
        break;
      case 'pickup':
        string = `${objective.type} ${target} in ${location} ${objective.location === LOCATIONS.ANY ? 'location' : ''}`;
        break;
      case 'find':
        string = `${objective.type} ${objective.number} ${target}`;
        break;
      case 'reputation':
        string = `reach level ${objective.number} with ${TRADERS[objective.target as unknown as number]}`;
        break;
      case 'locate':
        string = `${objective.type} ${target} in ${location}`;
        break;
      case 'skill':
        string = `reach level ${objective.number} in ${target} ${objective.type}`;
        break;
      case 'mark':
        string = `${tool ? 'use ' + tool + ' to' : ''} ${objective.type} ${target} in ${location}`;
        break;
      case 'build':
        string = `${objective.type} ${target}`;
        break;
      case 'survive':
        string = `${objective.type} and extract from ${target} in ${location}`
        break;
      default:
        string = `${objective.type} ${objective.number} ${target} in ${location} ${objective.location === LOCATIONS.ANY ? 'location' : ''}`;
    }
    if (withArray && withArray.length) {
      withArray.forEach(keyword => {
        string = `${string} (${this.dataService.itemInfoDb.get(keyword)?.name ?? keyword})`;
      });
    }
    objective.completeString = string.toUpperCase();
  }
}
