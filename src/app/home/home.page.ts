import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { snapshotToArray } from '../firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items = [];
  ref = firebase.database().ref('items/');

  constructor(private toast: ToastController) { }
  qrdata = [];
  qrdata_isi;
  ditekan = false

  genqr() {
    if (this.qrdata[0] == null || this.qrdata[1] == null || this.qrdata[2] == null || this.qrdata[3] == null) {
      console.log('ada data yang kosong')
    } else {
      this.qrdata_isi = this.qrdata[0] + "\n" + this.qrdata[1] + "\n" + this.qrdata[2] + "\n" + this.qrdata[3]
      this.ditekan = true
    }
    this.ref.on('value', resp => {
      this.items = snapshotToArray(resp);
    });
  }

  addItem(items){
    let newItem = this.ref.push();
    newItem.set(items);
  }
}
