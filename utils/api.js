import axios from 'axios';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/character?page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error('Error while getting detailed information', error);
    throw error;
  }
};

export const getCharacterById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error while getting detailed information:', error);
    throw error;
  }
};
