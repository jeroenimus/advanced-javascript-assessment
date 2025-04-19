import { Injectable, inject } from '@angular/core';

import { addDoc, collection, doc, getCountFromServer, getDoc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { FirebaseService } from './firebase.service';
import { Ledger } from '../interfaces/ledger';
import { LedgerFormValues } from '../interfaces/ledger-form-values';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private readonly firebaseService = inject(FirebaseService);

  getLedgers(archived: boolean = false): Observable<Ledger[]> {
    const ledgersQuery = query(
      collection(this.firebaseService.firestore, 'ledgers'),
      where('archived', '==', archived),
      orderBy('name')
    );
    
    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(ledgersQuery,
      (snapshot) => {
        const ledgers = snapshot.docs.map((doc) => { 
          const ledger = doc.data() as Ledger;
          ledger.id = doc.id;
          return ledger;
        });

        subscriber.next(ledgers);
      },
      (error) => {
        console.error(error);
      });

      return () => { unsubscribe(); }
    });
  }

  async getLedgerById(id: string): Promise<Ledger | undefined> {
    const docRef = doc(this.firebaseService.firestore, 'ledgers', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const ledger = snapshot.data() as Ledger;
      ledger.id = snapshot.id;
      return ledger;
    }
    else {
      console.error(`Document '${id}' does not exist.`);
      return undefined;
    }
  }

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
      return -1;
    }
  }

  async addLedger(formValues: LedgerFormValues) {
    const colRef = collection(this.firebaseService.firestore, 'ledgers');

    try {
      await addDoc(colRef, {
        name: formValues.name,
        description: formValues.description,
        archived: false
      });
    }
    catch (error) { console.error(error); }
  }

  async editLedger(id: string, formValues: LedgerFormValues) {
    const docRef = doc(this.firebaseService.firestore, 'ledgers', id);

    try {
      await updateDoc(docRef, {
        name: formValues.name,
        description: formValues.description
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
