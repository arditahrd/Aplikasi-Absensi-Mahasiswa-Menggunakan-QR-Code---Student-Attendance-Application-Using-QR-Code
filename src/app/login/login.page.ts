import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(public afAuth: AngularFireAuth,
    private route: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  async login() {
    const { username, password } = this
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(username, password)
      this.afAuth.authState.subscribe(async data => {
        await firebase.database().ref(`akun/${data.uid}`).on('value', hasil => {
          this.storage.set('email', data.email)
          this.storage.set('uid', data.uid)
          this.storage.set('nim', hasil.val().nim)

          //akses
          if (hasil.val().akses == "Dosen") {
            this.route.navigate(['/dosen'])
          } else {
            this.route.navigate(['/mhs'])
          }
        })
      })

    } catch (err) {
      console.dir(err)
      if (err.code === "auth/user-not-found") {
        console.log("User not found")
      }
    }
  }
}
