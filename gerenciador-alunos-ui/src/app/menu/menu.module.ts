import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { AppMaterialModule } from '../shared/app-material.module';

@NgModule({
  declarations: [
    MenuComponent
  ],

  imports: [
    CommonModule,

    MenuRoutingModule,
    AppMaterialModule
  ]
})
export class MenuModule { }
