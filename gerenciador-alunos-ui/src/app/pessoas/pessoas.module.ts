import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material.module';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';

@NgModule({
  declarations: [
    PessoaListComponent,
    PessoaFormComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
    PessoasRoutingModule
  ]
})
export class PessoasModule { }
