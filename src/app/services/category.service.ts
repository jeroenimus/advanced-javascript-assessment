import { Injectable, inject } from '@angular/core';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { Category } from '../interfaces/category';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly firebaseService = inject(FirebaseService);

  getCategories(): Observable<Category[]> {
    const categoriesQuery = query(
      collection(this.firebaseService.firestore, 'categories'),
      orderBy('name')
    );

    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(categoriesQuery,
      (snapshot) => {
        const categories = snapshot.docs.map((doc) => {
          const category = doc.data() as Category;
          category.id = doc.id;
          category.endDate = category.endDate ? doc.data()['endDate'].toDate() : null;
          return category;
        });

        subscriber.next(categories);
      },
      (error) => {
        console.error(error);
      });

      return () => { unsubscribe(); }
    });
  }
}
