import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

//firebase
import * as firebase from 'firebase';
import { snapshotToArray } from '../firebase';
import { AngularFireDatabase} from '@angular/fire/database'


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(public afAuth: AngularFireAuth,
    private route:Router,
    private afDb : AngularFireDatabase
    ) { }
  
  ngOnInit() {}

  async register() {
    const { username, password, cpassword } = this
    if (password !== cpassword) {
      return console.error("password Don't Match")
    } try {
      //abaikan
      const res = await this.afAuth.createUserWithEmailAndPassword(username, password)
      await this.afAuth.signInWithEmailAndPassword(username, password)
      this.afDb.object(`akun/${username}`).set({
        email:username,
        nim:'3311801029',
        akses:'Mahasiswa',
      })
      //this.route.navigate(['/login'])
      console.log(res)
    } catch (error) {
      console.dir(error)
    }
  }
}
