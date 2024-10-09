import { Injectable, inject } from '@angular/core';

import { Query, collection, getCountFromServer, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { Ledger } from '../interfaces/ledger';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private firebaseService: FirebaseService = inject(FirebaseService);

  getActiveLedgerCount(): Promise<number> {
    const ledgerCountQuery = query(
      collection(this.firebaseService.firestore, 'ledgers'),
      where('archived', '==', false)
    );

    return this.getLedgerCount(ledgerCountQuery);
  }

  getArchivedLedgerCount(): Promise<number> {
    const ledgerCountQuery = query(
      collection(this.firebaseService.firestore, 'ledgers'),
      where('archived', '==', true)
    );

    return this.getLedgerCount(ledgerCountQuery);
  }

  private async getLedgerCount(ledgerCountQuery: Query): Promise<number> {
    try {
      const snapshot = await getCountFromServer(ledgerCountQuery)
      return snapshot.data().count;
    }
    catch (error) {
      console.error(error);
      return 0;
    }
  }

  getActiveLedgers(): Observable<Ledger[]> {
    const ledgersQuery = query(
      collection(this.firebaseService.firestore, 'ledgers'),
      where('archived', '==', false),
      orderBy('name')
    );

    return this.getLedgers(ledgersQuery);
  }

  getArchivedLedgers(): Observable<Ledger[]> {
    const ledgersQuery = query(
      collection(this.firebaseService.firestore, 'ledgers'),
      where('archived', '==', true),
      orderBy('name')
    );

    return this.getLedgers(ledgersQuery);
  }

  private getLedgers(ledgersQuery: Query): Observable<Ledger[]> {
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
}
