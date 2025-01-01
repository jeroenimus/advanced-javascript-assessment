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

  async addLedger(ledgerName: string, ledgerDescription: string) {
    const ledgerData = {
      name: ledgerName,
      description: ledgerDescription,
      archived: false
    };

    try {
      await addDoc(collection(this.firebaseService.firestore, 'ledgers'), ledgerData);
    }
    catch (error) {
      console.error(error);
    }
  }

  async editLedger(ledgerId: string, ledgerName: string, ledgerDescription: string) {
    const ledgerData = {
      name: ledgerName,
      description: ledgerDescription
    };

    try {
      await updateDoc(doc(this.firebaseService.firestore, 'ledgers', ledgerId), ledgerData)
    }
    catch (error) {
      console.error(error);  
    }
  }
}
