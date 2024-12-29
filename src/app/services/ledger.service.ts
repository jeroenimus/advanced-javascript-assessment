import { Injectable, inject } from '@angular/core';

import { addDoc, collection, getCountFromServer, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { Ledger } from '../interfaces/ledger';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private firebaseService: FirebaseService = inject(FirebaseService);

  async getLedgerCount(archived: boolean = false): Promise<number> {
    const countQuery = query(
      collection(this.firebaseService.firestore, 'ledgers'),
      where('archived', '==', archived)
    );

    try {
      const snapshot = await getCountFromServer(countQuery)
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
    const docRef = await addDoc(collection(this.firebaseService.firestore, 'ledgers'), {
      name: ledgerName,
      description: ledgerDescription,
      archived: false
    });
  }
}
