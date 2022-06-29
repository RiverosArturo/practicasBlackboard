import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-calificacion-promedio',
  templateUrl: './calificacion-promedio.page.html',
  styleUrls: ['./calificacion-promedio.page.scss'],
})
export class CalificacionPromedioPage implements OnInit {

  constructor(private menu:MenuController) { }

  OpenMenuStud(){
    this.menu.enable(true,'MenuStud');
    this.menu.open('MenuStud');
  }

  ngOnInit() {
  }

}
