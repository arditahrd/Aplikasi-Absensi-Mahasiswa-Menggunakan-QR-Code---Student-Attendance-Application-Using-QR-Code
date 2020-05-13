import { Component, OnInit } from '@angular/core';

import { NavController, ToastController, Platform } from '@ionic/angular';
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
    private nav: NavController,
    private route: Router,
    private toast: ToastController,
    private platform: Platform,
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController
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
  async getEmail() {
    await this.str.get('email').then(data => {
      this.email = data
    })
    console.log(this.email)
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
}
