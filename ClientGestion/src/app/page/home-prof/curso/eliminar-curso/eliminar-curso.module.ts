import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarCursoPageRoutingModule } from './eliminar-curso-routing.module';

import { EliminarCursoPage } from './eliminar-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarCursoPageRoutingModule
  ],
  declarations: [EliminarCursoPage]
})
export class EliminarCursoPageModule {}
