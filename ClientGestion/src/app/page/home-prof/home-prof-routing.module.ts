import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from 'src/app/home/home.page';
import { CrearCursoPage } from './curso/crear-curso/crear-curso.page';
import { ConsultarCursoPage } from './curso/consultar-curso/consultar-curso.page';

import { HomeProfPage } from './home-prof.page';
import { EliminarCursoPage } from './curso/eliminar-curso/eliminar-curso.page';

const routes: Routes = [
  {
    path: '',
    component: HomeProfPage
  },
  
  {
    path: 'generar-equipo',
    loadChildren: () => import('./equipo/generar-equipo/generar-equipo.module').then( m => m.GenerarEquipoPageModule)
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
    path: 'eliminar-equipo',
    loadChildren: () => import('./equipo/eliminar-equipo/eliminar-equipo.module').then( m => m.EliminarEquipoPageModule)
  },/*
  {
    path: 'eliminar-curso',
    loadChildren: () => import('./curso/eliminar-curso/eliminar-curso.module').then( m => m.EliminarCursoPageModule)
  },
  {
    path: 'consultar-curso',
    loadChildren: () => import('./curso/consultar-curso/consultar-curso.module').then( m => m.ConsultarCursoPageModule)
  },
  {
    path: 'crear-curso',
    loadChildren: () => import('./curso/crear-curso/crear-curso.module').then( m => m.CrearCursoPageModule)
  },*/
  {
    path: 'subir-estudiante',
    loadChildren: () => import('./estudiante/subir-estudiante/subir-estudiante.module').then( m => m.SubirEstudiantePageModule)
  },
  {
    path: 'consultar-estudiante',
    loadChildren: () => import('./estudiante/consultar-estudiante/consultar-estudiante.module').then( m => m.ConsultarEstudiantePageModule)
  },
  {
    path: 'eliminar-estudiante',
    loadChildren: () => import('./estudiante/eliminar-estudiante/eliminar-estudiante.module').then( m => m.EliminarEstudiantePageModule)
  },
  {
    path: 'alta-actividad',
    loadChildren: () => import('./actividades/alta-actividad/alta-actividad.module').then( m => m.AltaActividadPageModule)
  },
  {
    path: 'consultar-actividad',
    loadChildren: () => import('./actividades/consultar-actividad/consultar-actividad.module').then( m => m.ConsultarActividadPageModule)
  },
  {
    path: 'modificar-actividad',
    loadChildren: () => import('./actividades/modificar-actividad/modificar-actividad.module').then( m => m.ModificarActividadPageModule)
  },
  {
    path: 'eliminar-actividad',
    loadChildren: () => import('./actividades/eliminar-actividad/eliminar-actividad.module').then( m => m.EliminarActividadPageModule)
  },
  {
    path: 'evaluar-actividad',
    loadChildren: () => import('./actividades/evaluar-actividad/evaluar-actividad.module').then( m => m.EvaluarActividadPageModule)
  },
  {
    path: 'avisos',
    loadChildren: () => import('./comunicacion/avisos/avisos.module').then( m => m.AvisosPageModule)
  },
  {
    path:'home',
    component: HomePage
  },
  {
    path: 'menu-prof',
    loadChildren: () => import('./menu-prof/menu-prof.module').then( m => m.MenuProfPageModule)
  },
  {
   path: 'crear-curso/:user',
   component: CrearCursoPage 
  },
  {
    path: 'consultar-curso/:user',
    component: ConsultarCursoPage
  },
  {
    path: 'eliminar-curso/:user',
    component: EliminarCursoPage
  },
  {
    path: 'home-prof',
    component: HomeProfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeProfPageRoutingModule {}
