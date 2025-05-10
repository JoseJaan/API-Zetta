import { Book, BookList } from '../types/index';
import { 
  getBestSellers,
  getBookReviews,
  getBestSellersByDate,
  getOverviewLists
} from './booksApi';

export const fetchLists = async (
  publicationDate?: string,
  bestSellersDate?: string
): Promise<BookList[]> => {
  try {
    const response = await getBestSellers({
      list: 'hardcover-fiction',
      publishedDate: publicationDate,
      bestsellersDate: bestSellersDate
    });

    return response.results.map((item: any) => ({
      id: item.list_id || item.list_name_encoded,
      name: item.list_name,
      displayName: item.display_name,
      updated: item.updated,
      listImage: item.list_image || null,
      books: item.books ? item.books.map((book: any) => transformBookData(book)) : [],
      ranking: item.rank || null
    }));
  } catch (error) {
    console.error('Error fetching lists:', error);
    return [];
  }
};

export const fetchListOverview = async (
  publicationDate?: string
): Promise<BookList[]> => {
  try {
    const response = await getOverviewLists({ 
      published_date: publicationDate 
    });
    const updated = response.results.bestsellers_date
    return response.results.lists.map((list: any) => ({
      id: list.list_id || list.list_name_encoded,
      name: list.list_name,
      displayName: list.display_name,
      updated: updated,
      listImage: list.list_image || null,
      books: list.books ? list.books.map((book: any) => transformBookData(book)) : []
    }));
  } catch (error) {
    console.error('Error fetching overview:', error);
    return [];
  }
};

export const fetchListByDate = async (
  date: string,
  list: string
): Promise<BookList | null> => {
  try {
    const response = await getBestSellersByDate({
      date,
      list
    });

    const result = response.results;
    return {
      id: result.list_id || result.list_name_encoded,
      name: result.list_name,
      displayName: result.display_name,
      updated: result.previous_published_date,
      listImage: result.list_image || null,
      books: result.books ? result.books.map((book: any) => transformBookData(book)) : []
    };
  } catch (error) {
    console.error('Error fetching list by date:', error);
    return null;
  }
};

export const searchBooks = async ({
  isbn,
  title,
  author
}: {
  isbn?: string;
  title?: string;
  author?: string;
}): Promise<Book[]> => {
  try {
    const response = await getBookReviews({
      isbn,
      title,
      author
    });
    
    return response.results.map((item: any) => ({
      id: item.isbn13 || item.primary_isbn13 || item.isbn10 || item.primary_isbn10 || item.title,
      title: item.book_title || item.title,
      author: item.book_author || item.author,
      description: item.summary || item.description || '',
      publisher: item.publisher || '',
      imageUrl: item.book_image || '',
      amazonUrl: item.amazon_product_url || '',
      isbn: item.primary_isbn13 || item.isbn13 || item.primary_isbn10 || item.isbn10 || '',
      rank: item.rank || null,
      reviews: [{
        url: item.url || '',
        byline: item.byline || '',
        summary: item.summary || ''
      }]
    }));
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
};

const transformBookData = (book: any): Book => {
  return {
    id: book.primary_isbn13 || book.primary_isbn10 || book.title,
    title: book.title,
    author: book.author,
    description: book.description || '',
    publisher: book.publisher || '',
    imageUrl: book.book_image || '',
    amazonUrl: book.amazon_product_url || '',
    isbn: book.primary_isbn13 || book.primary_isbn10 || '',
    rank: book.rank || null,
    reviews: []
  };
};