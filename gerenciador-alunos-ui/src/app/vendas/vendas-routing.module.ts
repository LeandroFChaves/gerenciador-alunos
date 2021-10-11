import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendaListComponent } from './venda-list/venda-list.component';
import { VendaFormComponent } from './venda-form/venda-form.component';

const routes: Routes = [
  {
    path: '',
    component: VendaListComponent,
  },
  { path: 'novo', component: VendaFormComponent },
  {
    path: 'editar/:id',
    component: VendaFormComponent
  },
  {
    path: 'visualizar/:id',
    component: VendaFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendasRoutingModule { }
