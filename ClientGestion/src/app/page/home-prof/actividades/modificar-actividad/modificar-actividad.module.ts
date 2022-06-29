import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarActividadPageRoutingModule } from './modificar-actividad-routing.module';

import { ModificarActividadPage } from './modificar-actividad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarActividadPageRoutingModule
  ],
  declarations: [ModificarActividadPage]
})
export class ModificarActividadPageModule {}
