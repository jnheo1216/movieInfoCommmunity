import axios from "axios";

// const DOMAIN = "https://api.themoviedb.org/3/";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "08dc304a9335606335910830739427cc",
    language: "ko-KR",
  },
});
// https://image.tmdb.org/t/p/w300/ApiBzeaa95TNYliSbQ8pJv4Fje7.jpg
export const movieApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  popular: () => api.get("movie/popular"),
  upComing: () => api.get("movie/upcoming"),
  // append to response에 대한 설명 https://developers.themoviedb.org/3/get1ting-started/append-to-response
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: { append_to_response: "videos" 
    },
  }),
};
