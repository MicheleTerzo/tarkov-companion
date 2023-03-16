import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule}                           from '@angular/common';
import {ProfileModel}                           from '../../../../models/profile/profile.model';
import {FieldsetModule}                         from 'primeng/fieldset';
import {DividerModule}                          from 'primeng/divider';
import {InputTextModule}                        from 'primeng/inputtext';
import {ButtonModule}                           from 'primeng/button';
import {FormsModule}                            from '@angular/forms';

@Component({
  selector   : 'app-profile',
  standalone : true,
  imports    : [CommonModule, FieldsetModule, DividerModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls  : ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() userProfile?: ProfileModel;
  @Input() levelGroup = '1';
  @Output() saveProfile = new EventEmitter<string>();
  path = '';

  constructor() {
  }

  async saveProfilePath(): Promise<void> {
    if (this.path !== '') {
      this.saveProfile.emit(this.path);
    }
  }
}
