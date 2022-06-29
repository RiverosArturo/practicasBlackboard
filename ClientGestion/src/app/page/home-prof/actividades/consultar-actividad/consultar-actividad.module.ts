import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultarActividadPageRoutingModule } from './consultar-actividad-routing.module';

import { ConsultarActividadPage } from './consultar-actividad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultarActividadPageRoutingModule
  ],
  declarations: [ConsultarActividadPage]
})
export class ConsultarActividadPageModule {}
