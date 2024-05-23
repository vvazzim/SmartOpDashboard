// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { ChirurgiensListComponent } from './chirurgiens-list/chirurgiens-list.component';
import {Ng2SmartTableModule} from "ng2-smart-table";

@NgModule({
  declarations: [
    AppComponent,
    ChirurgiensListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    Ng2SmartTableModule,
    // Make sure ngx-infinite-scroll is imported here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
