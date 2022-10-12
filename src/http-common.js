import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  headers: {
    Authorization: 'Bearer {token}'
  },
  params:{
    api_key : 'f62f750b70a8ef11dad44670cfb6aa57'
  }
})