import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarEquipoPageRoutingModule } from './generar-equipo-routing.module';

import { GenerarEquipoPage } from './generar-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarEquipoPageRoutingModule
  ],
  declarations: [GenerarEquipoPage]
})
export class GenerarEquipoPageModule {}
