import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultarEquipoPageRoutingModule } from './consultar-equipo-routing.module';

import { ConsultarEquipoPage } from './consultar-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultarEquipoPageRoutingModule
  ],
  declarations: [ConsultarEquipoPage]
})
export class ConsultarEquipoPageModule {}
