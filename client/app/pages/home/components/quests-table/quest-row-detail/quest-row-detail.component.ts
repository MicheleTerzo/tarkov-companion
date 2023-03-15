import {Component, Input, OnInit} from '@angular/core';
import {CommonModule}  from '@angular/common';
import {QuestsService} from '../../../../../services/quests.service';
import {QuestModel}    from '../../../../../models/quest/quest.model';
import {QUEST_STATUS, TRADERS} from '../../../../../utils/enums';
import {SvgMapComponent}       from '../../../../../components/svg-map/svg-map.component';
import {asInstance}            from '../../../../../utils/constants';
import {GunsmithRequirements}  from '../../../../../models/quest/gunsmith-requirements.model';

@Component({
  selector   : 'app-quest-row-detail',
  standalone : true,
  imports    : [CommonModule, SvgMapComponent],
  templateUrl: './quest-row-detail.component.html',
  styleUrls  : ['./quest-row-detail.component.scss']
})
export class QuestRowDetailComponent implements OnInit {
  @Input() quest!: QuestModel;
  isGunsmithQuest = false;
  asGunsmithModel = asInstance<GunsmithRequirements[]>();
  questStatus = QUEST_STATUS;
  readonly traderNames = TRADERS;

  constructor(private questsService: QuestsService) {
  }

  getParsedName(key: string): string {
    return this.questsService.itemInfoDb.get(key)?.name ?? '';
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
  }
}
