import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path        : 'home',
    loadChildren: () => import('./pages/quests/routes').then(m => m.QUESTS_ROUTES)
  },
  {
    path      : '',
    redirectTo: 'home',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
