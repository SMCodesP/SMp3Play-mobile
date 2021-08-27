import axios from 'axios';
import { setup } from 'axios-cache-adapter';

export const api = setup({
  baseURL: "https://suggestqueries.google.com",
  method: "GET",
  // decompress: false,
  headers: {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0',
  },
  cache: {
    maxAge: 15 * 60 * 1000,
  }
})