export interface Entry {
  id: string;
  description: string;
  type: 'credit' | 'debit';
  amount: number;
  createdOn: Date;
}
