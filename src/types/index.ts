export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    summary: string;
  }
  
  export interface BookList {
    id: string;
    name: string;
    updateDate: string; 
    publicationDate: string;
    image?: string;
    ranking?: number;
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