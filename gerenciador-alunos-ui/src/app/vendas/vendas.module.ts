import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material.module';
import { VendasRoutingModule } from './vendas-routing.module';
import { VendaFormComponent } from './venda-form/venda-form.component';
import { VendaListComponent } from './venda-list/venda-list.component';
import { ItemVendaFormComponent } from './item-venda-form/item-venda-form.component';


@NgModule({
  declarations: [
    VendaFormComponent,
    VendaListComponent,
    ItemVendaFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    AppMaterialModule,
    VendasRoutingModule
  ]
})
export class VendasModule { }
