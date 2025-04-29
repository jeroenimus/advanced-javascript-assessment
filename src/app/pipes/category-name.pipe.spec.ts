import { CategoryNamePipe } from "./category-name.pipe";
import { Category } from "../interfaces/category";

describe('CategoryNamePipe', () => {
  let pipe: CategoryNamePipe;

  beforeEach(() => {
    pipe = new CategoryNamePipe;
  });

  it ('should return an empty string when categories is null', () => {
    expect(pipe.transform('category1', null)).toBe('');
  });

  it ('should return an empty string when categories is empty', () => {
    expect(pipe.transform('category1', [])).toBe('');
  });

  it ('should return the correct category name when the id matches', () => {
    const categories: Category[] = [
      { id: 'category1', name: 'Category 1', budget: 1, endDate: null, ownerId: 'owner1' },
      { id: 'category2', name: 'Category 2', budget: 2, endDate: null, ownerId: 'owner1' }
    ];

    expect(pipe.transform('category1', categories)).toBe('Category 1');
  });

  it ('should return an empty string when no category matches the id', () => {
    const categories: Category[] = [
      { id: 'category1', name: 'Category 1', budget: 1, endDate: null, ownerId: 'owner1' },
      { id: 'category2', name: 'Category 2', budget: 2, endDate: null, ownerId: 'owner1' }
    ];

    expect(pipe.transform('category3', categories)).toBe('');
  });
});
