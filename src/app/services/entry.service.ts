import { Injectable, inject } from '@angular/core';

import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { FirebaseService } from './firebase.service';
import { Entry } from '../interfaces/entry';
import { EntryFormValues } from '../interfaces/entry-form-values';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private readonly firebaseService = inject(FirebaseService);

  getEntries(ledgerId: string): Observable<Entry[]> {
    const entriesQuery = query(
      collection(this.firebaseService.firestore, `ledgers/${ledgerId}/entries`),
      orderBy('createdOn', 'desc')
    );

    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(entriesQuery,
      (snapshot) => {
        const entries = snapshot.docs.map((doc) => {
          const entry = doc.data() as Entry;
          entry.id = doc.id;
          entry.createdOn = entry.createdOn ? doc.data()['createdOn'].toDate() : new Date();   
          return entry;
        });

        subscriber.next(entries);
      },
      (error) => {
        console.error(error);
      });

      return () => { unsubscribe(); }
    });
  }

  async addEntry(ledgerId: string, formValues: EntryFormValues) {
    const colRef = collection(this.firebaseService.firestore, `ledgers/${ledgerId}/entries`);

    try {
      await addDoc(colRef, {
        description: formValues.description,
        amount: Number(formValues.amount),
        type: formValues.type,
        createdOn: serverTimestamp()
      });
    }
    catch (error) { console.error(error); }
  }

  async editEntry(ledgerId: string, entryId: string, formValues: EntryFormValues) {
    const docRef = doc(this.firebaseService.firestore, 'ledgers', ledgerId, 'entries', entryId);

    try {
      await updateDoc(docRef, {
        description: formValues.description,
        amount: Number(formValues.amount),
        type: formValues.type
      });
    }
    catch (error) { console.error(error); }
  }
}
