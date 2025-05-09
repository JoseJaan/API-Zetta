export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  publisher: string;
  imageUrl: string;
  amazonUrl: string;
  isbn: string;
  rank?: number | null;
  reviews: BookReview[];
}

  
export interface BookReview {
  url: string;
  byline: string;
  summary: string;
}

export interface BookList {
  id: string;
  name: string;
  displayName: string;
  updated: string;
  listImage: string | null;
  books: Book[];
  ranking?: number | null;
}

export enum PageType {
  HOME = 'home',
  BEST_SELLERS = 'best-sellers',
  OVERVIEW = 'overview',
  REVIEWS = 'reviews'
}

export interface MenuItem {
  id: string;
  label: string;
  pageType: PageType;
  route: string;
}