import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './shared/app-material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppMaterialModule
  ],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
