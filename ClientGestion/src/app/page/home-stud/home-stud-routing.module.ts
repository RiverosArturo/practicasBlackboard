import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from 'src/app/home/home.page';

import { HomeStudPage } from './home-stud.page';

const routes: Routes = [
  {
    path: '',
    component: HomeStudPage
  },
  {
    path: 'consultar',
    loadChildren: () => import('./curso/consultar/consultar.module').then( m => m.ConsultarPageModule)
  },
  {
    path: 'reporte',
    loadChildren: () => import('./reporte/reporte.module').then( m => m.ReportePageModule)
  },
  {
    path: 'avisos',
    loadChildren: () => import('./comunicacion/avisos/avisos.module').then( m => m.AvisosPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./comunicacion/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'calificacion-promedio',
    loadChildren: () => import('./calificacion-promedio/calificacion-promedio.module').then( m => m.CalificacionPromedioPageModule)
  },
  {
    path: 'consultar-equipo',
    loadChildren: () => import('./equipo/consultar-equipo/consultar-equipo.module').then( m => m.ConsultarEquipoPageModule)
  },
  {
    path: 'modificar-equipo',
    loadChildren: () => import('./equipo/modificar-equipo/modificar-equipo.module').then( m => m.ModificarEquipoPageModule)
  },
  {
    path: 'consultar-estudiante',
    loadChildren: () => import('./estudiante/consultar-estudiante/consultar-estudiante.module').then( m => m.ConsultarEstudiantePageModule)
  },
  {
    path: 'modificar-estudiante',
    loadChildren: () => import('./estudiante/modificar-estudiante/modificar-estudiante.module').then( m => m.ModificarEstudiantePageModule)
  },
  {
    path: 'consultar-actividad',
    loadChildren: () => import('./actividades/consultar-actividad/consultar-actividad.module').then( m => m.ConsultarActividadPageModule)
  },
  {
    path:'home',
    component: HomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeStudPageRoutingModule {}
