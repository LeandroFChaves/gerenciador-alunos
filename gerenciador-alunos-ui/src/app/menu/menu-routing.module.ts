import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import(`./../home/home.module`).then((module) => module.HomeModule),
      },

      {
        path: 'pessoas',
        loadChildren: () =>
          import(`./../pessoas/pessoas.module`).then((module) => module.PessoasModule),
      },

      {
        path: 'produtos',
        loadChildren: () =>
          import(`./../produtos/produtos.module`).then(
            (module) => module.ProdutosModule
          ),
      },

      {
        path: 'vendas',
        loadChildren: () =>
          import(`./../vendas/vendas.module`).then((module) => module.VendasModule),
      },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
