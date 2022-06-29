import { Component, HostBinding, OnInit } from '@angular/core';
import { Prof } from 'src/app/models/Prof';
import { DatosService } from '../../../../services/datos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-prof',
  templateUrl: './edit-prof.page.html',
  styleUrls: ['./edit-prof.page.scss'],
})
export class EditProfPage implements OnInit {

  @HostBinding('class') classes = 'row';

  prof: Prof = {
    nTrabajador: 0,
    password: '',
  };
  profs:any = [];
  edit:boolean = false;

  constructor( private datosService: DatosService, private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    if(params.nTrabajador){
      this.datosService.getProf(params.nTrabajador)
      .subscribe(
        res =>{
          console.log(res);
          this.prof = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }
  saveNewProf(){
    this.datosService.saveProf(this.prof)
    .subscribe(
      res => {
        console.log(res);    
        this.getProfs();  
        this.router.navigate(['/home-admi']);
      },
      err => console.error(err)
    )
  }
  getProfs(){
    this.datosService.getProfs().subscribe(
      res => {
        this.profs = res;     
      },
      err => console.error(err)
    );
  }
  updateProf(){
    this.datosService.updateProf(this.prof.nTrabajador, this.prof)
    .subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/home-admi']);
      },
      err => console.error(err)
    )
  }
}
