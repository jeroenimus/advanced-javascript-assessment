import { Injectable, inject } from '@angular/core';

import { Firestore, addDoc, collection, deleteDoc, doc, getCountFromServer, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { Category } from '../interfaces/category';
import { CategoryFormValues } from '../interfaces/category-form-values';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly firebaseService = inject(FirebaseService);
  private readonly authService = inject(AuthService);

  private readonly firestore: Firestore;

  constructor() {
    this.firestore = this.firebaseService.firestore;
  }

  getCategories(): Observable<Category[]> {
    const userId = this.authService.getCurrentUser()?.uid;

    const categoriesQuery = query(
      collection(this.firestore, 'categories'),
      where('ownerId', '==', userId),
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

  async getCategoryCount(): Promise<number> {
    const userId = this.authService.getCurrentUser()?.uid;

    const countQuery = query(
      collection(this.firestore, 'categories'),
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

  async addCategory(formValues: CategoryFormValues) {
    const colRef = collection(this.firestore, 'categories');
    const endDate = formValues.endDate ? new Date(formValues.endDate) : null;
    const userId = this.authService.getCurrentUser()?.uid;

    try {
      await addDoc(colRef, {
        name: formValues.name,
        budget: Number(formValues.budget),
        endDate: endDate,
        ownerId: userId
      });
    }
    catch (error) { console.error(error); }
  }

  async editCategory(id: string, formValues: CategoryFormValues) {
    const docRef = doc(this.firestore, 'categories', id);
    const endDate = formValues.endDate ? new Date(formValues.endDate) : null;

    try {
      await updateDoc(docRef, {
        name: formValues.name,
        budget: Number(formValues.budget),
        endDate: endDate
      });
    }
    catch (error) { console.error(error); }
  }

  async deleteCategory(id: string) {
    const docRef = doc(this.firestore, 'categories', id);

    try {
      await deleteDoc(docRef);
    }
    catch (error) { console.error(error); }
  }
}
