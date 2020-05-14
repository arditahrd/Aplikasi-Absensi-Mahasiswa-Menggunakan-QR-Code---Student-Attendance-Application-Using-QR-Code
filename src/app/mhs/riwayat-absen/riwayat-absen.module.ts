import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiwayatAbsenPageRoutingModule } from './riwayat-absen-routing.module';

import { RiwayatAbsenPage } from './riwayat-absen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiwayatAbsenPageRoutingModule
  ],
  declarations: [RiwayatAbsenPage]
})
export class RiwayatAbsenPageModule {}
