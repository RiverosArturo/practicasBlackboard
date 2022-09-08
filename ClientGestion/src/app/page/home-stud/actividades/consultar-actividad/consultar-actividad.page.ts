import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-consultar-actividad',
  templateUrl: './consultar-actividad.page.html',
  styleUrls: ['./consultar-actividad.page.scss'],
})
export class ConsultarActividadPage implements OnInit {

  user:string;
  nrc:number;
  archivos: any = [];
  previsualizacion:string;
  loading:boolean;

  constructor( private sanitizer: DomSanitizer ,private menu:MenuController, private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;     
    this.user = params.user;  
    this.nrc = params.nrc;
  }

  capturarFile(event){
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then(imagen => {
      //this.previsualizacion = imagen.base;
      console.log(imagen);
    })
    this.archivos.push(archivoCapturado);
    //console.log(event.target.files);
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  subirArchivo(){
    try {
      this.loading = true;
      const formularioDeDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('files', archivo)
      })
      // formularioDeDatos.append('_id', 'MY_ID_123')
      // this.rest.post(`http://localhost:3001/upload`, formularioDeDatos)
      //   .subscribe(res => {
      //     this.loading = false;
      //     console.log('Respuesta del servidor', res);

      //   }, () => {
      //     this.loading = false;
      //     alert('Error');
      //   })
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);

    }
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
