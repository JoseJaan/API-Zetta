import { Book, BookList } from '../types';

// Base URL for the API
//const API_BASE_URL = 'https://api.zettabooks.com';

// Simulated data since we're not connecting to a real API
const mockLists: BookList[] = [
  {
    id: '1',
    name: 'New York Times Best Sellers',
    updateDate: '2025-05-01',
    publicationDate: '2025-05-01',
    ranking: 1
  },
  {
    id: '2',
    name: 'Amazon Top Picks',
    updateDate: '2025-05-02',
    publicationDate: '2025-05-02',
    ranking: 2
  },
  {
    id: '3',
    name: 'Editor\'s Choice',
    updateDate: '2025-05-03',
    publicationDate: '2025-04-30',
    ranking: 3
  }
];

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Future of AI',
    author: 'Jane Smith',
    isbn: '978-3-16-148410-0',
    summary: 'An exploration of artificial intelligence and its impact on society.'
  },
  {
    id: '2',
    title: 'Web Development Mastery',
    author: 'John Doe',
    isbn: '978-1-56619-909-4',
    summary: 'A comprehensive guide to modern web development techniques.'
  },
  {
    id: '3',
    title: 'The Digital Revolution',
    author: 'Alex Johnson',
    isbn: '978-0-306-40615-7',
    summary: 'How technology is transforming our lives and businesses.'
  }
];

export const fetchLists = async (): Promise<BookList[]> => {
  // In a real application, this would be an actual API call
  // return fetch(`${API_BASE_URL}/lists?date=${date}`).then(res => res.json());
  
  // For now, return mock data with a slight delay to simulate network
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLists);
    }, 500);
  });
};

export const fetchBooksByList = async (): Promise<Book[]> => {
  // In a real application:
  // return fetch(`${API_BASE_URL}/lists/${listId}/books`).then(res => res.json());
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBooks);
    }, 500);
  });
};

export const searchBooks = async (query: { isbn?: string, title?: string, author?: string }): Promise<Book[]> => {
  // In a real application:
  // return fetch(`${API_BASE_URL}/books/search?isbn=${query.isbn}&title=${query.title}&author=${query.author}`)
  //   .then(res => res.json());
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple filtering for demo purposes
      let results = [...mockBooks];
      if (query.isbn) {
        results = results.filter(book => book.isbn.includes(query.isbn || ''));
      }
      if (query.title) {
        results = results.filter(book => book.title.toLowerCase().includes((query.title || '').toLowerCase()));
      }
      if (query.author) {
        results = results.filter(book => book.author.toLowerCase().includes((query.author || '').toLowerCase()));
      }
      resolve(results);
    }, 500);
  });
};