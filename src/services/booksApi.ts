import axios from 'axios';

const BASE_URL = 'https://api.nytimes.com/svc/books/v3';
const API_KEY = import.meta.env.VITE_NYT_API_KEY;

interface GetBestSellersParams {
  list: string;
  bestsellersDate?: string;
  publishedDate?: string;
  offset?: number;
}

export const getBestSellers = async ({
  list,
  bestsellersDate,
  publishedDate = 'current',
  offset = 0
}: GetBestSellersParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/lists.json`, {
      params: {
        'api-key': API_KEY,
        list,
        bestsellers_date: bestsellersDate,
        published_date: publishedDate,
        offset
      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar Best Sellers:', error);
    throw error;
  }
};
