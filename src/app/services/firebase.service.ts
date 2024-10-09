import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly firebaseApp: FirebaseApp = initializeApp({
    apiKey: "AIzaSyAJcDBkhQCvatrCLq6VIR9yenr-fGAWJ84",
    authDomain: "fir-23838.firebaseapp.com",
    projectId: "fir-23838",
    storageBucket: "fir-23838.appspot.com",
    messagingSenderId: "290388300188",
    appId: "1:290388300188:web:e47e36cc86dfe3d8b53859"
  });

  readonly firestore: Firestore = getFirestore(this.firebaseApp);
}
