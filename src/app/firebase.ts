export const firebaseConfig = {
    apiKey: "AIzaSyAc6sw10LZ5jTxb4b9FEhNbCAk-18rAgzI",
    authDomain: "upsenmob.firebaseapp.com",
    databaseURL: "https://upsenmob.firebaseio.com",
    projectId: "upsenmob",
    storageBucket: "upsenmob.appspot.com",
    messagingSenderId: "490675723308",
    appId: "1:490675723308:web:aff68fe8e051c982fcc589",
    measurementId: "G-TYW9ZZTVXH"
  }

  export default firebaseConfig
  export const snapshotToArray = snapshot => {
    let returnArray = [];
    snapshot.forEach(element => {
      let item = element.val();
      item.key = element.key;
      returnArray.push(item);
    });
    return returnArray;

  
  }