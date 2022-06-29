import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-equipo',
  templateUrl: './modificar-equipo.page.html',
  styleUrls: ['./modificar-equipo.page.scss'],
})
export class ModificarEquipoPage implements OnInit {

  constructor(private menu:MenuController) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
  }

}
