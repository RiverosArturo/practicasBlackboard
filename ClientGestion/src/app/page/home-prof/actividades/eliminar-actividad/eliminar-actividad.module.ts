import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarActividadPageRoutingModule } from './eliminar-actividad-routing.module';

import { EliminarActividadPage } from './eliminar-actividad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarActividadPageRoutingModule
  ],
  declarations: [EliminarActividadPage]
})
export class EliminarActividadPageModule {}
