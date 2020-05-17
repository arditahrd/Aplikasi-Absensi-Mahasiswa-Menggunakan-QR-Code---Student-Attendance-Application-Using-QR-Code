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
    this.getNama()
  }
  qrdata = [];
  qrdata_isi;
  ditekan = false
  dataqr

  getNama(){
    this.str.get('nama').then(res => {
      this.data.nama = res
    })

  }

  kelasterpilih: any = {
    matkul: []
  }

  matkulterpilih

  ionViewWillEnter() {
    this.fetchData()
    console.log("child=" + this.child)
    this.getNama()
  }

  async genqr() {
    if (this.data.sesi == null) {
      console.log('ada data yang kosong')
    } else {
      console.log(this.data)
      this.qrdata_isi = JSON.stringify(this.data)
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
      
      this.data.uid = hasil
      
    })

    this.dbs = await firebase.database().ref(`pengajaran`).on('value', resp => {
      this.child = snapshotToArray(resp)
      this.states = snapshotToArray(resp)
    })
  }

  data: any = {
    uid:null,
    nama: null,
    semester: null,
    prodi: null,
    deskripsi:null,
    minggu:null,
    sesi:null,
    kelas:null,
  }
  datakelas

  onChange($event){
    console.log($event);
    }

  async getDataKelas(a) {
    this.dbs = await firebase.database().ref("kelas/"+a).on('value',async hasil => {
      this.data.idkelas = a
      this.data.semester = await hasil.val().semester
      this.data.prodi = await hasil.val().prodi
      this.data.kelas = await hasil.val().nama 
      
    })
    
  //  console.log(this.data)
    
    console.log('berubah jadi ' + this.selectedState)
  }

  states = []; // Assign the states from the json file
  selectedState: any = {
    idmatkul: []
  };
  selectedDistrict: string;

}

