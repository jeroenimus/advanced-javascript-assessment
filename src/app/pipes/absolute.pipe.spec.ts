import { AbsolutePipe } from './absolute.pipe';

describe('AbsolutePipe', () => {
  let pipe: AbsolutePipe;

  beforeEach(() => {
    pipe = new AbsolutePipe;
  });

  it ('should return the same number when input is positive', () => {
    expect(pipe.transform(1)).toBe(1);
  });

  it ('should return the positive equivalent when input is negative', () => {
    expect(pipe.transform(-1)).toBe(1);
  });
});
