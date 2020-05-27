import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toast: ToastController,
    private str: Storage
  ) {
    this.fetchData()
  }

  ngOnInit() {
    this.fetchData()
  }

  ionViewWillEnter() {
    this.fetchData()
  }

  kelas; nama; nim; uid;

  fetchData() {
    this.str.get('kelas').then(hasil => {
      this.kelas = hasil
    })

    this.str.get('nama').then(hasil => {
      this.nama = hasil
    })

    this.str.get('nim').then(hasil => {
      this.nim = hasil
    })

    this.str.get('uid').then(hasil => {
      this.uid = hasil
    })
  }

  clear() {
    this.scannedCode = null;
    this.data = {
      matkul: null,
      idkelas: null,
      uid: null,
      nama: null,
      semester: null,
      prodi: null,
      deskripsi: null,
      minggu: null,
      sesi: null,
      kelas: null,
      tanggal: null,
      jam: null,
      idmatkul: null
    }
  }

  async dummy() {
    this.scannedCode = '{"uid":"vj6Sl9bQ1keOuAeH47J24QBt5aJ2","nama":"Filanda Al-Rozaq","semester":"2","prodi":"Teknik Informatika","deskripsi":"gfgf","minggu":"3","sesi":"4","kelas":"IF 2B Regular","tanggal":"2020, Mei 27","idkelas":"ifb2019","idmatkul":"1","jeniskuliah":"Praktikum","metodekuliah":"Online"}';
    this.data = await JSON.parse(this.scannedCode);

    //get current time
    var d = new Date();
    this.data.jam = d.getHours() + ':' + d.getMinutes();

    firebase.database().ref(`pengajaran/${this.data.idkelas}/idmatkul/${this.data.idmatkul}`).on('value', async ref => {
      this.data.matkul = await ref.val().matkul
      console.log(this.data.matkul)
    })
  }

  scannedCode = null;
  data = {
    matkul: null,
    idkelas: null,
    uid: null,
    nama: null,
    semester: null,
    prodi: null,
    deskripsi: null,
    minggu: null,
    sesi: null,
    kelas: null,
    tanggal: null,
    jam: null,
    idmatkul: null
  }

  scanCode() {
    this.barcodeScanner.scan().then(
      async barcodeData => {
        this.scannedCode = barcodeData.text;
        this.data = await JSON.parse(barcodeData.text)
      }
    )
  }

  async absen() {
    if (this.kelas !== this.data.kelas) {
      this.notif('QR Code tersebut tidak diperuntukkan untuk kelas anda')
    } else {
      try{
        var n
        await firebase.database().ref(`test`).on('value', async get =>{
          n = await get.val().jml_absen
        })

      //set absensi mhs
      await firebase.database().ref(`absen_mhs/${this.nim}/${this.data.idmatkul}/${this.data.tanggal}/`).set({
        nim: this.nim,
        nama: this.nama,
        matkul: this.data.matkul,
        idkelas: this.data.idkelas,
        nama_dosen: this.data.nama,
        deskripsi: this.data.deskripsi,
        minggu: this.data.minggu,
        sesi: this.data.sesi,
        kelas: this.data.kelas,
        tanggal: this.data.tanggal,
        jam: this.data.jam,
        idmatkul: this.data.idmatkul
      })

      //set absensi kelas
      await firebase.database().ref(`absen_kelas/${this.data.uid}/${this.data.idkelas}/${this.data.idmatkul}/${this.data.tanggal}/${this.nim}/`).set({
        nim: this.nim,
        nama: this.nama,
        matkul: this.data.matkul,
        idkelas: this.data.idkelas,
        nama_dosen: this.data.nama,
        deskripsi: this.data.deskripsi,
        minggu: this.data.minggu,
        sesi: this.data.sesi,
        kelas: this.data.kelas,
        tanggal: this.data.tanggal,
        jam: this.data.jam,
        idmatkul: this.data.idmatkul
      })

     
      
      var m = n + 1
      console.log(n+' m = '+m)
      //push absensi
      await firebase.database().ref(`test/absen`).push(this.nim)
      await firebase.database().ref(`test`).update({
        jml_absen : m
      })

      this.notif('Anda telah berhasil melakukan absen')
    }catch(e){
      this.notif(e)   
    }
    }
  }

  async notif(msg) {
    var n = await this.toast.create({
      message: msg,
      duration: 2000
    })
    n.present()
  }
}
