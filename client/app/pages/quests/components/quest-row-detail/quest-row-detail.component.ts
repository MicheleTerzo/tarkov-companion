import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule}                                       from '@angular/common';
import {DataService}                                        from '../../../../services/data.service';
import {QuestModel}                                         from '../../../../models/quest/quest.model';
import {GunsmithRequirements}                               from '../../../../models/quest/gunsmith-requirements.model';
import {LOCATIONS, TRADERS}                                 from '../../../../utils/enums';
import {QuestObjectiveModel}                                from '../../../../models/quest/quest-objective.model';

@Component({
  selector   : 'app-quest-row-detail',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './quest-row-detail.component.html',
  styleUrls  : ['./quest-row-detail.component.scss']
})
export class QuestRowDetailComponent implements OnInit, AfterViewInit{
  @Input() quest!: QuestModel;
  @ViewChild('mapPlace') mapPlace?: HTMLElement;

  constructor(private dataService: DataService) {
  }

  ngAfterViewInit(): void {
    console.log(this.mapPlace);
  }



  ngOnInit(): void {
    this.canvasTest();
    this.quest.objectives.forEach(objective => {
      if (objective.with instanceof GunsmithRequirements) {
        return this.generateGunsmithRequirements();
      } else {
        this.parseQuestObjectives(objective);
      }
      this.loadMapData(objective);
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

  private generateGunsmithRequirements(): void {
  }

  private loadMapData(objective: QuestObjectiveModel) {
  }

  private canvasTest() {
  }
}
