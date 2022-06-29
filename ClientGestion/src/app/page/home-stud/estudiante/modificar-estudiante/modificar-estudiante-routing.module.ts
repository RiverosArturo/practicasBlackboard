import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarEstudiantePage } from './modificar-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarEstudiantePageRoutingModule {}
