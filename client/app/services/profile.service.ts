import {Injectable}                      from '@angular/core';
import {ProfileModel}                    from '../models/profile/profile.model';
import {plainToInstance}                 from 'class-transformer';
import {HttpClient}                      from '@angular/common/http';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import {LevelModel, LevelModelContent}   from '../models/profile/level.model';
import {MessageService}                  from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  _userProfile = new BehaviorSubject<ProfileModel | undefined>(undefined);
  userProfile$ = this._userProfile.asObservable();
  levels: Map<string, LevelModelContent> = new Map();
  private mockProfileUrl = 'assets/db/mock-profile.json';
  private readonly baseUrl = 'http://localhost:3000/user';

  // F:/Tarkov Single Player/0.13.0.3.22032/user/profiles/bed1be640b83ca4aa59bc20b.json
  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  async initData(): Promise<void> {
    // await Promise.all([
     await this.getLevels()
     await this.getProfile()
    // ]);
  }

  async getProfile(): Promise<void> {
    //'http://localhost:3000/user-profile'
    const get$ = this.http.get(`${this.baseUrl}/profile`);
    const res = await firstValueFrom(get$);
    const instance = ProfileModel.generateModel(res);
    this._userProfile.next(instance);
  }

  async saveProfilePath(path: string): Promise<void> {
    const post$ = this.http.post(`${this.baseUrl}/path`, {path});
    await firstValueFrom(post$);
    return this.messageService.add({severity: 'success', summary: 'OK', detail: 'Path Saved'});
  }

  async getLevels(): Promise<Map<string, LevelModelContent>> {
    const get$ = this.http.get('assets/db/levels.json');
    const res = await firstValueFrom(get$);
    const instance = plainToInstance(LevelModel, res);
    this.levels = new Map<string, LevelModelContent>(Object.entries(instance));
    return this.levels;
  }
}
