import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import(`./login/login.module`).then((module) => module.LoginModule),
  },

  {
    path: '',
    loadChildren: () =>
      import(`./menu/menu.module`).then((module) => module.MenuModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
