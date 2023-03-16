import {Injectable}                      from '@angular/core';
import {UserModel}                       from '../models/profile/user.model';
import {plainToInstance}                 from 'class-transformer';
import {HttpClient}                      from '@angular/common/http';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import {LevelModel, LevelModelContent}   from '../models/profile/level.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  _userProfile = new BehaviorSubject<UserModel | undefined>(undefined);
  userProfile$ = this._userProfile.asObservable();
  levels: Map<string, LevelModelContent> = new Map();
  private mockProfileUrl = 'assets/db/mock-profile.json';

  constructor(private http: HttpClient) {
  }

  async initData(): Promise<void> {
    await this.getProfile();
    await this.getlevels();
  }

  async getProfile(): Promise<void> {
    console.log('called');
    //'http://localhost:3000/user-profile'
    const get$ = this.http.get(this.mockProfileUrl);
    const res = await firstValueFrom(get$);
    const instance = plainToInstance(UserModel, res);
    this._userProfile.next(instance);
  }

  async getlevels(): Promise<Map<string, LevelModelContent>> {
    const get$ = this.http.get('assets/db/levels.json');
    const res = await firstValueFrom(get$);
    const instance = plainToInstance(LevelModel, res);
    this.levels = new Map<string, LevelModelContent>(Object.entries(instance));
    console.log(this.levels);
    return this.levels;
  }
}
