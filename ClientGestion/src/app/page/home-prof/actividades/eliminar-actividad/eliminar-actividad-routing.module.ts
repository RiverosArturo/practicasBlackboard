import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarActividadPage } from './eliminar-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarActividadPageRoutingModule {}
