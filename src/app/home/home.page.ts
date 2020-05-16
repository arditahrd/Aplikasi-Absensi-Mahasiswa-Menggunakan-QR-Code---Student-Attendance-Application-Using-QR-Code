import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { snapshotToArray } from '../firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items = [];
  ref = firebase.database().ref('items/');

  constructor(private toast: ToastController,
    private str: Storage) {
    this.fetchData()
    console.log(this.child)
  }
  qrdata = [];
  qrdata_isi;
  ditekan = false


  kelasterpilih: any = {
    matkul: []
  }

  matkulterpilih

  ionViewWillEnter() {
    this.fetchData()
    console.log("child=" + this.child)
  }

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

  addItem(items) {
    let newItem = this.ref.push();
    newItem.set(items);
  }

  child
  dbs
  key

  async fetchData() {
    await this.str.get('key').then(hasil => {
      this.key = hasil
    })

    this.dbs = await firebase.database().ref(`pengajaran`).on('value', resp => {
      this.child = snapshotToArray(resp)
      this.states = snapshotToArray(resp)
    })
  }

  data: any = {
    nama: null,
    semester: null,
    prodi: null
  }
  datakelas

  onChange($event){
    console.log($event);
    }

  async getDataKelas() {
    this.dbs = await firebase.database().ref("kelas/ifb2019").on('value', hasil => {
      this.data = snapshotToArray(hasil)
    })
    
    console.log(this.data)
    
    console.log('berubah jadi ' + this.selectedState)
  }

  states = []; // Assign the states from the json file
  selectedState: any = {
    matkul: []
  };
  selectedDistrict: string;

}

