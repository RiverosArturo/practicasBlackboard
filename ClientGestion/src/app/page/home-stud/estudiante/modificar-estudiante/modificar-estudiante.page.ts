import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-estudiante',
  templateUrl: './modificar-estudiante.page.html',
  styleUrls: ['./modificar-estudiante.page.scss'],
})
export class ModificarEstudiantePage implements OnInit {

  constructor(private menu:MenuController) { }

  OpenMenuStud(){
    this.menu.enable(true,'MenuStud');
    this.menu.open('MenuStud');
  }

  ngOnInit() {
  }

}
