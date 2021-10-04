import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutoListComponent } from './produto-list/produto-list.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { AppMaterialModule } from '../shared/app-material.module';

@NgModule({
  declarations: [
    ProdutoListComponent,
    ProdutoFormComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,

    AppMaterialModule,
    ProdutosRoutingModule
  ]
})
export class ProdutosModule { }
