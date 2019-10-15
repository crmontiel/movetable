import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagramaComponent } from './Controles/diagrama/diagrama.component';


const routes: Routes = [
  { path: '', redirectTo: 'diagram', pathMatch: 'full' },
  { path: 'diagram', component: DiagramaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
