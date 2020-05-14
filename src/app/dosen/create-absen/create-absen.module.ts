import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAbsenPageRoutingModule } from './create-absen-routing.module';

import { CreateAbsenPage } from './create-absen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAbsenPageRoutingModule
  ],
  declarations: [CreateAbsenPage]
})
export class CreateAbsenPageModule {}
