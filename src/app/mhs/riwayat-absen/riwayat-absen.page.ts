import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { snapshotToArray } from '../../firebase';
import { LoadingController } from '@ionic/angular';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-riwayat-absen',
  templateUrl: './riwayat-absen.page.html',
  styleUrls: ['./riwayat-absen.page.scss'],
})
export class RiwayatAbsenPage implements OnInit {

  constructor(
    private load: LoadingController,
    private str: Storage,
  ) {
    this.getData()
  }

  async getData() {
    await this.getNim()

    this.databs = await firebase.database().ref(`absen_mhs/3311801022/if214`).on('value', async val => {
      this.childData = val.val()
      this.key = snapshotToArray(val)

    })
    /*    this.data = await snapshotToArray(val)
        let result = val.val()
        for(let k in result){
         this.uids.push(k);
         this.rootVals.push(result[k]);
        
           } *
      })*/

    console.log('data = ' + this.data)
    console.log('uid = ' + this.key)
    console.log(this.childData)
  }
  key
  childData

  getNim() {
    this.str.get('nim').then(res => {
      this.nim = res
    })
  }

  uids = []
  rootVals = []
  nim
  databs
  data: any

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

}
