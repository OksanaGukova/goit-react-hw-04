import axios from 'axios';

const API_KEY = '6OVPiijRuka372LDYVcjSjmYwjsLE4UvOb-6PSTFJFk';
const BASE_URL = 'https://api.unsplash.com/search/photos';
const options = {
  headers: { Authorization: `Client-ID ${API_KEY}` },
};

export const fetchImages = async (query, page) => {
    const searchParams = new URLSearchParams({ query, page, per_page: 20 });

    return (await axios(`${BASE_URL}?${searchParams}`, options)).data;
}