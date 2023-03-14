import {FormArray, FormControl} from '@angular/forms';
import {QuestModel} from '../../../models/quest/quest.model';

export interface MapsFormInterface {
  selectedMapKey: FormControl<number>;
  selectedQuests: FormArray<FormControl<QuestModel>>
}
