import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';

const routes: Routes = [
  {
    path: '',
    component: AlunoListComponent,
  },
  { path: 'novo', component: AlunoFormComponent },
  {
    path: 'editar/:id',
    component: AlunoFormComponent
  },
  {
    path: 'visualizar/:id',
    component: AlunoFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
