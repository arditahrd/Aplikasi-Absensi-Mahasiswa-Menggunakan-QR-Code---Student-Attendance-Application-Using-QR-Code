import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { snapshotToArray } from '../firebase';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items = [];

  constructor(
    private toast: ToastController,
    private str: Storage
  ) {
    this.fetchData()
    this.getNama()
  }
  qrdata = [];
  qrdata_isi;
  ditekan = false
  dataqr

  //tanggal
  currentDate = new Date();
  date = this.currentDate.getDate();
  month = this.currentDate.getMonth();
  year = this.currentDate.getFullYear().toString()

  monthNames = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Juni", "Juli", "Agu", "Sep", "Okt", "Nov", "Des"
  ];

  getNama() {
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
    this.getNama()
  }

  async genqr() {
    if (this.data.sesi == null) {
      console.log('ada data yang kosong')
    } else {
      console.log(this.data)
      this.qrdata_isi = JSON.stringify(this.data)
      this.ditekan = true
      this.notif('QR Code telah digenerate')

      await this.getDataAbsen()
    }

  }


  async getDataAbsen() {
    this.dbabsen = await firebase.database().ref(`absen_kelas/${this.data.uid}/${this.data.idkelas}/${this.data.idmatkul}-${this.data.tanggal}`).on('value', resp => {
      this.listabsen = snapshotToArray(resp)
    })
  }

  child
  dbs
  key
  dbabsen
  listabsen

  async fetchData() {
    await this.str.get('uid').then(hasil => {

      this.data.uid = hasil

    })

    this.dbs = await firebase.database().ref(`pengajaran`).on('value', resp => {
      this.child = snapshotToArray(resp)
      this.states = snapshotToArray(resp)
    })
  }

  data: any = {
    idmatkul:null,
    matkul: null,
    nomatkul:null,
    uid: null,
    nama: null,
    semester: null,
    prodi: null,
    deskripsi: null,
    minggu: null,
    sesi: null,
    kelas: null,
    tanggal: this.year + ', ' + this.monthNames[this.month] + ' ' + this.date,
  }

  datakelas

  async notif(msg) {
    var n = await this.toast.create({
      message: msg,
      duration: 2000
    })
    n.present()
  }

  async getDataKelas(a) {
    this.dbs = await firebase.database().ref("kelas/" + a).on('value', async hasil => {
      this.data.idkelas = a
      this.data.semester = await hasil.val().semester
      this.data.prodi = await hasil.val().prodi
      this.data.kelas = await hasil.val().nama

    })
  }

  getDataLog(n){
    console.log(n)

    firebase.database().ref(`pengajaran/${this.data.idkelas}/idmatkul/`+n).on('value',async res =>{
      this.data.idmatkul = await res.val().kode
      this.data.matkul = await res.val().matkul
    })
  }

  states = []; // Assign the states from the json file
  selectedState: any = {
    idmatkul: [],
    idkelas: null
  };
  selectedDistrict: string;

}

