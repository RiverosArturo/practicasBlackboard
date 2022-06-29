import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarEstudiantePageRoutingModule } from './eliminar-estudiante-routing.module';

import { EliminarEstudiantePage } from './eliminar-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarEstudiantePageRoutingModule
  ],
  declarations: [EliminarEstudiantePage]
})
export class EliminarEstudiantePageModule {}
