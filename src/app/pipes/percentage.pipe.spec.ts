import { PercentagePipe } from "./percentage.pipe";

describe('PercentagePipe', () => {
  let pipe: PercentagePipe;

  beforeEach(() => {
    pipe = new PercentagePipe
  });

  it ('should return 0 when total is 0', () => {
    expect(pipe.transform(100, 0)).toBe(0);
  });

  it ('should return the correct percentage', () => {
    expect(pipe.transform(50, 100)).toBe(50);
  });
});
