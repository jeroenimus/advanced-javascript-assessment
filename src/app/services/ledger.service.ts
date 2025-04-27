import { Injectable, inject } from '@angular/core';

import { Firestore, addDoc, collection, doc, getCountFromServer, getDoc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { Ledger } from '../interfaces/ledger';
import { LedgerFormValues } from '../interfaces/ledger-form-values';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private readonly firebaseService = inject(FirebaseService);
  private readonly authService = inject(AuthService);

  private readonly firestore: Firestore;

  constructor() {
    this.firestore = this.firebaseService.firestore;
  }

  getLedgers(archived: boolean = false): Observable<Ledger[]> {
    const userId = this.authService.getCurrentUser()?.uid;

    const ledgersQuery = query(
      collection(this.firestore, 'ledgers'),
      where('archived', '==', archived),
      where('ownerId', '==', userId),
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
    const docRef = doc(this.firestore, 'ledgers', id);
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
    const userId = this.authService.getCurrentUser()?.uid;

    const countQuery = query(
      collection(this.firestore, 'ledgers'),
      where('archived', '==', archived),
      where('ownerId', '==', userId)
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
    const colRef = collection(this.firestore, 'ledgers');
    const userId = this.authService.getCurrentUser()?.uid;

    try {
      await addDoc(colRef, {
        name: formValues.name,
        description: formValues.description,
        archived: false,
        ownerId: userId
      });
    }
    catch (error) { console.error(error); }
  }

  async editLedger(id: string, formValues: LedgerFormValues) {
    const docRef = doc(this.firestore, 'ledgers', id);

    try {
      await updateDoc(docRef, {
        name: formValues.name,
        description: formValues.description
      });
    }
    catch (error) { console.error(error); }
  }

  async archiveLedger(id: string) {
    const docRef = doc(this.firestore, 'ledgers', id);

    try {
      await updateDoc(docRef, {
        archived: true
      });
    }
    catch (error) { console.error(error); }
  }

  async restoreLedger(id: string) {
    const docRef = doc(this.firestore, 'ledgers', id);

    try {
      await updateDoc(docRef, {
        archived: false
      });
    }
    catch (error) { console.error(error); }
  }
}
