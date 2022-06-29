import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarEquipoPageRoutingModule } from './modificar-equipo-routing.module';

import { ModificarEquipoPage } from './modificar-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarEquipoPageRoutingModule
  ],
  declarations: [ModificarEquipoPage]
})
export class ModificarEquipoPageModule {}
