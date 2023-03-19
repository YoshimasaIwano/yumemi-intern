import { Prefecture } from '../types';

const fetchPrefectures = async (): Promise<Prefecture[]> => {
  try {
    const response = await fetch(
      'https://opendata.resas-portal.go.jp/api/v1/prefectures',
      {
        headers: { 'X-API-KEY': String(process.env.REACT_APP_API_KEY) }
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchPrefectures;
