import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiwayatAbsenPage } from './riwayat-absen.page';

const routes: Routes = [
  {
    path: '',
    component: RiwayatAbsenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiwayatAbsenPageRoutingModule {}
