import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-prof',
  templateUrl: './menu-prof.page.html',
  styleUrls: ['./menu-prof.page.scss'],
})
export class MenuProfPage implements OnInit {

  user:number= 201347657;
  curso:string = 'IA';

  constructor(private menu:MenuController) { }

  ngOnInit() {
  }
  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  openmenu0(){
    this.menu.enable(true,'end');
    this.menu.open('end')
  }

}
