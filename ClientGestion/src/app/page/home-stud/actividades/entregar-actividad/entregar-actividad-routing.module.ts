import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntregarActividadPage } from './entregar-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: EntregarActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregarActividadPageRoutingModule {}
