import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toast: ToastController,
  ) { }

  ngOnInit() {
  }

  scannedCode = null;
  data = {
    uid:null,
    nama: null,
    semester: null,
    prodi: null,
    deskripsi:null,
    minggu:null,
    sesi:null,
    kelas:null,
    tanggal: null,
    jam : null,
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

}
