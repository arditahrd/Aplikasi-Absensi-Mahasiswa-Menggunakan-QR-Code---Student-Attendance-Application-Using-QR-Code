import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'mhs',
    loadChildren: () => import('./mhs/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'dosen',
    loadChildren: () => import('./dosen/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'historymhs',
    loadChildren: () => import('./historymhs/historymhs.module').then( m => m.HistorymhsPageModule)
  },
  {
    path: 'tu',
    loadChildren: () => import('./tu/home/home.module').then( m => m.HomePageModule)
  },  {
    path: 'create-absen',
    loadChildren: () => import('./dosen/create-absen/create-absen.module').then( m => m.CreateAbsenPageModule)
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./mhs/scan-qr/scan-qr.module').then( m => m.ScanQrPageModule)
  },
  {
    path: 'riwayat-absen',
    loadChildren: () => import('./mhs/riwayat-absen/riwayat-absen.module').then( m => m.RiwayatAbsenPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./dosen/history/history.module').then( m => m.HistoryPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
