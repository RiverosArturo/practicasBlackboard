import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home-prof',
  templateUrl: './home-prof.page.html',
  styleUrls: ['./home-prof.page.scss'],
})
export class HomeProfPage implements OnInit {

  user:number= 201347657;

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
