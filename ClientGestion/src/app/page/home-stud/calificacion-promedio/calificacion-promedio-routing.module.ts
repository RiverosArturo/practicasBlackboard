import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalificacionPromedioPage } from './calificacion-promedio.page';

const routes: Routes = [
  {
    path: '',
    component: CalificacionPromedioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalificacionPromedioPageRoutingModule {}
