import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Ng2SmartTableModule } from 'ng2-smart-table'; // Ajouté ici
import { ChirurgiensListComponent } from './chirurgiens-list/chirurgiens-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ChirurgiensListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2SmartTableModule // Ajouté ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
