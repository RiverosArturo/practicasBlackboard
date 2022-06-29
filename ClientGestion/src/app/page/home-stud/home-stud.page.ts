import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home-stud',
  templateUrl: './home-stud.page.html',
  styleUrls: ['./home-stud.page.scss'],
})
export class HomeStudPage implements OnInit {
  user:number=201347656;

  constructor( private menu:MenuController ) { }

  ngOnInit() {
  }

  OpenMenuStud(){
    this.menu.enable(true,'MenuStud');
    this.menu.open('MenuStud');
  }
  openmenu0(){
    this.menu.enable(true,'end');
    this.menu.open('end')
  }

}
