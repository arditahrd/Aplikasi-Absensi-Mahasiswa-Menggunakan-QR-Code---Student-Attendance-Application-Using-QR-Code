import { Component, OnInit } from '@angular/core';

import { NavController, ToastController, Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

//firebase
import * as firebase from 'firebase';
import { snapshotToArray } from '../../firebase';
import { AngularFireDatabase } from '@angular/fire/database'
import { Storage } from '@ionic/storage'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  scannedCode = null;
  selectedDateString: string = new Date().toISOString();
  minDate: string = new Date().toISOString();
  maxDate: string = new Date().toISOString();

  constructor(
    private str: Storage,
    private route: Router,
    private toast: ToastController,
    private platform: Platform,
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
  ) {
    this.getEmail()
    this.getNim()
    this.platform.ready().then(() => {

      let date: Date = new Date();
      date.setDate(date.getDate() - 5);
      this.minDate = date.toISOString();

      date = new Date();
      date.setDate(date.getDate() + 5);
      this.maxDate = date.toISOString();

    })
  }

  ionViewWillEnter() {
    this.getEmail()
    this.getNim()
  }

  email;
  nim;
  nama
  kelas

  async getEmail() {
    await this.str.get('email').then(data => {
      this.email = data
    })
    
  await this.str.get('nama').then(data => {
      this.nama = data
    })

    await this.str.get('kelas').then(data => {
      this.kelas = data
    })
  }

  async getNim() {
    await this.str.get('nim').then(data => {
      this.nim = data
    })
    console.log(this.nim)
  }
  ngOnInit() {
  }
  scanCode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        this.scannedCode = barcodeData;
      }
    )
  }

  async changePw() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Apakah anda ingin mengganti password?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: async () => {
            await firebase.auth().sendPasswordResetEmail(this.email)
            this.notif('Link ganti password telah dikirimkan ke Email anda')
          }
        }
      ]
    });

    await alert.present();
  }

  async notif(m) {
    var n = await this.toast.create({
      message: m,
      duration: 2000
    })
    n.present()
  }

  async logOut() {
    this.str.clear()
    await firebase.auth().signOut()
    this.route.navigate(['/login'])
    this.notif('Akun telah berhasil log out')
  }
}
