export interface Entry {
  id: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  createdOn: Date;
}
