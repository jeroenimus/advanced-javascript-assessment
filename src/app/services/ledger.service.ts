import { Injectable, inject } from '@angular/core';

import { addDoc, collection, doc, getCountFromServer, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { FirebaseService } from './firebase.service';
import { Ledger } from '../interfaces/ledger';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private firebaseService = inject(FirebaseService);

  async getLedgerCount(archived: boolean = false): Promise<number> {
    const countQuery = query(
      collection(this.firebaseService.firestore, 'ledgers'),
      where('archived', '==', archived)
    );

    try {
      const snapshot = await getCountFromServer(countQuery);
      return snapshot.data().count;
    }
    catch (error) {
      console.error(error);
      return 0;
    }
  }

  getLedgers(archived: boolean = false): Observable<Ledger[]> {
    const ledgersQuery = query(
      collection(this.firebaseService.firestore, 'ledgers'),
      where('archived', '==', archived),
      orderBy('name')
    );
    
    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(ledgersQuery,
      (snapshot) => {
        const ledgers = snapshot.docs.map((doc) => ({ ...doc.data() as Ledger, id: doc.id }));
        subscriber.next(ledgers);
      },
      (error) => {
        console.error(error);
      });

      return () => { unsubscribe(); }
    });
  }

  async addLedger(name: string, description: string) {
    const colRef = collection(this.firebaseService.firestore, 'ledgers');

    try {
      await addDoc(colRef, {
        name: name,
        description: description,
        archived: false
      });
    }
    catch (error) { console.error(error); }
  }

  async editLedger(id: string, name: string, description: string) {
    const docRef = doc(this.firebaseService.firestore, 'ledgers', id);

    try {
      await updateDoc(docRef, {
        name: name,
        description: description
      });
    }
    catch (error) { console.error(error); }
  }

  async archiveLedger(id: string) {
    const docRef = doc(this.firebaseService.firestore, 'ledgers', id);

    try {
      await updateDoc(docRef, {
        archived: true
      });
    }
    catch (error) { console.error(error); }
  }

  async restoreLedger(id: string) {
    const docRef = doc(this.firebaseService.firestore, 'ledgers', id);

    try {
      await updateDoc(docRef, {
        archived: false
      });
    }
    catch (error) { console.error(error); }
  }
}
