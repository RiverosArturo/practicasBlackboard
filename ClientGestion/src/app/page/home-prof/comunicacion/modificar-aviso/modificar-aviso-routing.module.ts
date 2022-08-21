import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarAvisoPage } from './modificar-aviso.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarAvisoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarAvisoPageRoutingModule {}
