import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarEstudiantePage } from './eliminar-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarEstudiantePageRoutingModule {}
