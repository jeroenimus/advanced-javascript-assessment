import { Injectable, inject } from '@angular/core';

import { addDoc, collection, endAt, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { Category } from '../interfaces/category';
import { CategoryFormValues } from '../interfaces/category-form-values';
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

  async addCategory(formValues: CategoryFormValues) {
    const colRef = collection(this.firebaseService.firestore, 'categories');
    const endDate = formValues.endDate ? new Date(formValues.endDate) : null;

    try {
      await addDoc(colRef, {
        name: formValues.name,
        budget: Number(formValues.budget),
        endDate: endDate
      });
    }
    catch (error) { console.error(error); }
  }
}
