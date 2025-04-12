import { Injectable, inject } from '@angular/core';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { FirebaseService } from './firebase.service';
import { Entry } from '../interfaces/entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private readonly firebaseService = inject(FirebaseService);

  getEntries(id: string): Observable<Entry[]> {
    const entriesQuery = query(
      collection(this.firebaseService.firestore, `ledgers/${id}/entries`),
      orderBy('createdOn', 'desc')
    );

    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(entriesQuery,
      (snapshot) => {
        const entries = snapshot.docs.map((doc) => {
          const data = doc.data() as Entry;
          data.createdOn = doc.data()['createdOn'].toDate();
          return { ...data, id: doc.id };
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
