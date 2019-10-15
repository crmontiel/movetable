import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GIdPipe } from './Pipes/g-id.pipe';
import { DiagramaComponent } from './Controles/diagrama/diagrama.component';
import { ToolbarComponent } from './Controles/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    GIdPipe,
    DiagramaComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
