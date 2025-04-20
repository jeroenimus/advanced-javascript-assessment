import { Injectable, inject } from '@angular/core';

import { Query, addDoc, collection, collectionGroup, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
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

    return this.getEntriesObservable(entriesQuery);
  }

  getEntriesByCategory(categoryId: string): Observable<Entry[]> {
    const entriesQuery = query(
      collectionGroup(this.firebaseService.firestore, 'entries'),
      where('categoryId', '==', categoryId)
    );

    return this.getEntriesObservable(entriesQuery);
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

  async deleteEntry(ledgerId: string, entryId: string) {
    const docRef = doc(this.firebaseService.firestore, 'ledgers', ledgerId, 'entries', entryId);

    try {
      await deleteDoc(docRef);
    }
    catch (error) { console.error(error); }
  }

  private getEntriesObservable(entriesQuery: Query): Observable<Entry[]> {
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
}
