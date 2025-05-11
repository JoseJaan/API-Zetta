import axios from 'axios';

const BASE_URL = 'https://api.nytimes.com/svc/books/v3';
const API_KEY = import.meta.env.VITE_NYT_API_KEY;

interface GetReviewsParams {
  author?: string;
  title?: string;
  isbn?: string;
}

export const getBookReviews = async ({ author, title, isbn }: GetReviewsParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews.json`, {
      params: {
        'api-key': API_KEY,
        author,
        title,
        isbn
      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar resenhas:', error);
    throw error;
  }
};
interface GetListByDateParams {
  date: string;  
  list: string;  
  offset?: number;
}

export const getBestSellersByDate = async ({ date, list, offset = 0 }: GetListByDateParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/lists/${date}/${list}.json`, {
      params: {
        'api-key': API_KEY,
        offset
      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar lista por data:', error);
    throw error;
  }
};

interface GetOverviewParams {
  published_date?: string; 
}

export const getOverviewLists = async ({ published_date }: GetOverviewParams = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/lists/overview.json`, {
      params: {
        'api-key': API_KEY,
        published_date
      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar overview das listas:', error);
    throw error;
  }
};