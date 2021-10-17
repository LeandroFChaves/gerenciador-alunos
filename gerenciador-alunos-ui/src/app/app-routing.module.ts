import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import(`./login/login.module`).then((module) => module.LoginModule),
  },

  {
    path: '',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import(`./menu/menu.module`).then((module) => module.MenuModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
