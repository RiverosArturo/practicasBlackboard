import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregarActividadPageRoutingModule } from './entregar-actividad-routing.module';

import { EntregarActividadPage } from './entregar-actividad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregarActividadPageRoutingModule
  ],
  declarations: [EntregarActividadPage]
})
export class EntregarActividadPageModule {}
