import { AmountPipe } from "./amount.pipe";

describe('AmountPipe', () => {
  let pipe: AmountPipe;

  beforeEach(() => {
    pipe = new AmountPipe;
  });

  it ('should return an amount with a "+" prefix and two decimals', () => {
    expect(pipe.transform(1, 'credit')).toBe('+1.00');
  });

  it ('should return an amount with a "-" prefix and two decimals', () => {
    expect(pipe.transform(1, 'debit')).toBe('-1.00');
  });
});
