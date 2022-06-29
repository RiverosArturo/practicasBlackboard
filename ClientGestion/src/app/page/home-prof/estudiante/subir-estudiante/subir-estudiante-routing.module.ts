import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubirEstudiantePage } from './subir-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: SubirEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubirEstudiantePageRoutingModule {}
