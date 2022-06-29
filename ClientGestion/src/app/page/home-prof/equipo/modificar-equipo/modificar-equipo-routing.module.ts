import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarEquipoPage } from './modificar-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarEquipoPageRoutingModule {}
