import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pessoas',
  },

  {
    path: 'pessoas',
    loadChildren: () =>
      import(`./pessoas/pessoas.module`).then(
        (module) => module.PessoasModule
      ),
  },

  {
    path: 'produtos',
    loadChildren: () =>
      import(`./produtos/produtos.module`).then(
        (module) => module.ProdutosModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
