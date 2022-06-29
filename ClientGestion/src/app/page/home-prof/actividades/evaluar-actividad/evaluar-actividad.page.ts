import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-evaluar-actividad',
  templateUrl: './evaluar-actividad.page.html',
  styleUrls: ['./evaluar-actividad.page.scss'],
})
export class EvaluarActividadPage implements OnInit {

  constructor(private menu:MenuController) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
  }

}
