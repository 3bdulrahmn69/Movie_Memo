import axios from 'axios';

const KEY = import.meta.env.VITE_OMDb_KEY;
const api = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  timeout: 10000,
});

export default async function getMovies(searchTerm, signal) {
  if (!searchTerm) {
    throw new Error('Search term must be provided');
  }

  try {
    const params = {
      apikey: KEY,
      s: searchTerm,
    };

    const response = await api.get('/', { params, signal });

    if (response.data.Response === 'True') {
      return response.data.Search ?? [];
    } else {
      throw new Error(response.data.Error || 'No movies found');
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      console.error('Failed to fetch movies:', error.message);
    }
    throw error;
  }
}

export async function getMovieById(id) {
  try {
    const response = await api.get(`?apikey=${KEY}&i=${id}`);
    if (response.data.Response === 'True') {
      return response.data;
    } else {
      throw new Error(response.data.Error || 'Unknown error occurred');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
