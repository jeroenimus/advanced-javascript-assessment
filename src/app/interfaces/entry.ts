export interface Entry {
  id: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  categoryId: string;
  ownerId: string;
  createdOn: Date;
}
