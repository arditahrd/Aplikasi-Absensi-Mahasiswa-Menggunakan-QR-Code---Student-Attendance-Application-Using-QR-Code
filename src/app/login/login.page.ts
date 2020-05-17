import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""
  akses

  constructor(public afAuth: AngularFireAuth,
    private route: Router,
    private storage: Storage,
    private load: LoadingController
  ) { }

  ngOnInit() {
  }

  setAkses(n){
    this.akses = n
  }

  async loading(){
    var n = await this.load.create({
      duration:1200
    })
    n.present()
  }

  async login() {
    const { username, password } = this
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(username, password)
      this.afAuth.authState.subscribe(async data => {
        await firebase.database().ref(`akun/${data.uid}`).on('value',async hasil => {
          //set storage
          this.storage.set('email', data.email)
          this.storage.set('uid', data.uid)
          this.storage.set('nim', hasil.val().nim)
          this.storage.set('nama',hasil.val().nama )
          this.storage.set('kelas',hasil.val().kelas )

          //setAkses
          await this.setAkses(hasil.val().akses)
          
        })
      })
      
      await this.loading()
      //akses
      if (this.akses == "Dosen") {
        this.route.navigate(['/dosen'])
      }else if(this.akses == "TU"){
        this.route.navigate(['/tu'])
      } else {
        this.route.navigate(['/mhs'])
      }

    } catch (err) {
      console.dir(err)
      if (err.code === "auth/user-not-found") {
        console.log("User not found")
      }
    }
  }
}
