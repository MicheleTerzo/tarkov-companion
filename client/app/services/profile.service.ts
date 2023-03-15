import { Injectable }    from '@angular/core';
import {UserModel}       from '../models/user.model';
import {plainToInstance} from 'class-transformer';
import {HttpClient}      from '@angular/common/http';
import {firstValueFrom}  from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userProfile?: UserModel = plainToInstance(UserModel, {});
  private mockProfileUrl = 'assets/db/mock-profile.json';

  constructor(private http: HttpClient) {
  }

  async initData(): Promise<void>{
    await this.getProfile();
  }

  async getProfile(): Promise<UserModel> {
    //'http://localhost:3000/user-profile'
    const get$ = this.http.get(this.mockProfileUrl);
    const res = await firstValueFrom(get$);
    this.userProfile = plainToInstance(UserModel, res);
    return this.userProfile;
  }
}
