import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluarActividadPage } from './evaluar-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluarActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluarActividadPageRoutingModule {}
