import { BalancePipe } from "./balance.pipe";
import { Entry } from "../interfaces/entry";

describe('BalancePipe', () => {
  let pipe: BalancePipe;

  beforeEach(() => {
    pipe = new BalancePipe;
  });

  it ('should return 0 when entries is null', () => {
    expect(pipe.transform(null)).toBe(0);
  });

  it ('should return 0 when entries is empty', () => {
    expect(pipe.transform([])).toBe(0);
  });

  it ('should return the correct total for credit entries only', () => {
    const entries: Entry[] = [
      { id: 'entry1', description: 'Entry 1', amount: 1, type: 'credit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() },
      { id: 'entry2', description: 'Entry 2', amount: 2, type: 'credit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() }
    ];

    expect(pipe.transform(entries)).toBe(3);
  });

  it ('should return the correct total for debit entries only', () => {
    const entries: Entry[] = [
      { id: 'entry1', description: 'Entry 1', amount: 1, type: 'debit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() },
      { id: 'entry2', description: 'Entry 2', amount: 2, type: 'debit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() }
    ];

    expect(pipe.transform(entries)).toBe(-3);
  });

  it ('should return the correct total for mixed entries', () => {
    const entries: Entry[] = [
      { id: 'entry1', description: 'Entry 1', amount: 1, type: 'credit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() },
      { id: 'entry2', description: 'Entry 2', amount: 2, type: 'debit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() },
      { id: 'entry3', description: 'Entry 3', amount: 3, type: 'credit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() },
      { id: 'entry4', description: 'Entry 4', amount: 4, type: 'debit', categoryId: 'category1', ownerId: 'owner1', createdOn: new Date() }
    ];

    expect(pipe.transform(entries)).toBe(-2);
  });
});
