import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarAvisoPageRoutingModule } from './modificar-aviso-routing.module';

import { ModificarAvisoPage } from './modificar-aviso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarAvisoPageRoutingModule
  ],
  declarations: [ModificarAvisoPage]
})
export class ModificarAvisoPageModule {}
