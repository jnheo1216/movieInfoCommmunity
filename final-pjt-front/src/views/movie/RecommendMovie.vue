<template>
<div>
  <div 
  class="movie-detail-image"
  :style="{ backgroundImage: `url(${backgroundSrc})` }" > 
  
    <div class="movie-content d-flex">
      <div style="" class="mt-3 mx-3">
        <img
          class="mt-2 "
          style="height:80vh;"
          :src="imgSrc"
        />
      </div>
      <div class="ml-4 w-75 mt-5">
        <h1 class="movie-title font-color">{{ movieInfo.title }}</h1>
        <div class="movie-information-wrapper mt-4 d-flex align-items-center">
          <h3 class="mx-3 font-color">개봉일 : {{ movieInfo.release_date }}</h3>
          <h3 class="mx-3 font-color">평점 : {{ movieInfo.vote_average }}</h3>
        </div>
        <div class="movie-information-wrapper mt-4 d-flex align-items-center text-start">
          <p class="mx-3 font-color youtube-position">{{ movieInfo.overview }}</p>
        </div>
        <div>
          <iframe
            :src="youtubeSrc"
            allow="autoplay; encrypted-media"
            frameborder="0"  
            width="640" 
            height="360">
          </iframe>
        </div>
        

      </div>
    </div>
    
  </div>
</div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'RecommendMovie',
  data() {
    return {
      movieId: '',
      movieInfo: {},
      video_key: ''
    }
  },
  computed: {
    imgSrc() {
      return 'https://image.tmdb.org/t/p/w500' + this.movieInfo.poster_path
    },
    youtubeSrc() {
      return `https://www.youtube.com/embed/${this.video_key}?autoplay=1&mute=1`
    },
    backgroundSrc() {
      return 'https://image.tmdb.org/t/p/w500' + this.movieInfo.backdrop_path
    },
  },
  created() {
    this.movieId = this.$route.params.id    
    const params = {
      api_key: 'b4893f302d08c4a823cdf51e8fcee9cc',
      language: 'ko-KR'
    }
    axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}`, { params })
      .then(res => {
        console.log(res.data)
        this.movieInfo = res.data
      })
      .catch(err => {
        console.error(err)
      })
    axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos`, { params })
      .then(res => {
        console.log(res.data)
        this.video_key = res.data.results[0].key
      })
      .catch(err => {
        console.error(err)
      })
  },
}
</script>

<style>
.movie-detail {
  /* z-index: 99; */
  position: relative;
  padding: 40px 40px;
}
.movie-detail-image {
  background-size: cover;
  height: 100vh;
  position: relative;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;

  /* filter: grayscale(px); */
}
.movie-detail-image::after {
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0px;
  min-height: 100vh;
  background-color: rgb(40, 40, 40);
  opacity: 0.8;
  content: "";
  display: block;
}

.movie-content {
  position: relative;
  z-index: 999;
}
.movie-title {
  margin-left: 5px;
}
.movie-information-wrapper {
  font-size: 13px;
}
.movie-overview {
  max-width: 80%;
  font-size: 14px;
  color: black
}

.font-color {
  color: white;
}

.youtube-position {
  margin-bottom: 100px;
}
</style>