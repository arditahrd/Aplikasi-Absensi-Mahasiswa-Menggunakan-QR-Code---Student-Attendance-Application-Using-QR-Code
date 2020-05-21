import { Component, OnInit } from '@angular/core';

import { NavController, ToastController, Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

//firebase
import * as firebase from 'firebase';
import { snapshotToArray } from '../../firebase';
import { AngularFireDatabase } from '@angular/fire/database'
import { Storage} from '@ionic/storage'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  selectedDateString:string=new Date().toISOString();
  minDate:string=new Date().toISOString();
  maxDate:string=new Date().toISOString();



  constructor(
    private str: Storage,
    private route: Router,
    private toast: ToastController,
    private platform:Platform,
    private alertController: AlertController
  ) {
    this.getEmail()
    this.getNim()
    this.getNama()
    this.getKelas()

    this.platform.ready().then(()=>{

      let date:Date=new Date();
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
    this.getNama()
    this.getKelas()
    console.log(this.email+" "+this.nim+" "+this.nama+" "+this.kelas)
  }

  email;
  nim;
  nama
  kelas

  async notif(m){
    var n = await this.toast.create({
      message: m,
      duration: 2000
    })
    n.present()
  }

  async changePw(){
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

  async logOut(){
    this.str.clear()
    await firebase.auth().signOut()
    this.route.navigate(['/login'])
    this.notif('Akun telah berhasil log out')
  }

  getEmail() {
    this.str.get('email').then(data => {
      this.email = data
    })
    console.log(this.email)
  }
  getKelas() {
    this.str.get('kelas').then(data => {
      this.kelas = data
    })
    console.log(this.kelas)
  }
  getNama() {
    this.str.get('nama').then(data => {
      this.nama = data
    })
    console.log(this.nama)
  }
   getNim() {
     this.str.get('nim').then(data => {
      this.nim = data
    })
    console.log(this.nim)
  }
  ngOnInit() {
  }

}
