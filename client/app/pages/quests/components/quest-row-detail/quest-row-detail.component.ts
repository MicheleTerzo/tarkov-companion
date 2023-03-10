import {Component, Input, OnInit} from '@angular/core';
import {CommonModule}             from '@angular/common';
import {DataService}              from '../../../../services/data.service';
import {QuestModel}               from '../../../../models/quest/quest.model';
import {GunsmithRequirements}     from '../../../../models/quest/gunsmith-requirements.model';
import {LOCATIONS, TRADERS}       from '../../../../utils/enums';

@Component({
  selector   : 'app-quest-row-detail',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './quest-row-detail.component.html',
  styleUrls  : ['./quest-row-detail.component.scss']
})
export class QuestRowDetailComponent implements OnInit {
  @Input() quest!: QuestModel;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.parseQuestObjectives();
  }

  private parseQuestObjectives(): void {
    this.quest.objectives.forEach((objective) => {
      if (objective.with instanceof GunsmithRequirements) {
        return this.generateGunsmithRequirements();
      }
      let string = '';
      const target = this.dataService.itemInfoDb.get(objective.target)?.name ?? objective.target;
      const location = LOCATIONS[objective.location];
      const tool = this.dataService.itemInfoDb.get(objective.tool!)?.name ?? null;
      switch (objective.type) {
        case 'key':
          string = `find ${target} `;
          break;
        case 'pickup':
          string = `${objective.type} ${target} in ${location} ${objective.location === LOCATIONS.ANY ? 'location' : ''}`
          break;
        case 'find':
          string = `${objective.type} ${objective.number} ${target}`
          break;
        case 'reputation':
          string = `reach level ${objective.number} with ${TRADERS[objective.target as unknown as number]}`
          break;
        case 'locate':
          string = `${objective.type} ${target} in ${location}`
          break;
        case 'skill':
          string = `reach level ${objective.number} in ${target} ${objective.type}`
          break
        case 'mark':
          string = `${tool ? 'use ' + tool + ' to' : ''} ${objective.type} ${target} in ${location}`
          break
        default:
          string = `${objective.type} ${objective.number} ${target} in ${location} ${objective.location === LOCATIONS.ANY ? 'location' : ''}`
      }
      if (objective.with && objective.with.length) {
        objective.with.forEach(keyword => {
          string = `${string} (${this.dataService.itemInfoDb.get(keyword)?.name ?? keyword})`
        })
      }
      objective.completeString = string.toUpperCase();
    });
  }

  private generateGunsmithRequirements(): void {
  }
}
