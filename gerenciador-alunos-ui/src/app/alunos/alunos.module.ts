import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material.module';
import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';

@NgModule({
  declarations: [
    AlunoListComponent,
    AlunoFormComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
    AlunosRoutingModule
  ]
})
export class AlunosModule { }
