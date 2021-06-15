<template>
  <div>    
    <div class="px-5 pt-3">
      <h2 class="text-light text-start my-4">오늘의 추천 컨텐츠</h2>
    </div>
    
    <div hidden>
      {{bestMovies[0].poster_path}}
    </div>
    <carousel-3d autoplay=true autoplayHoverPause=true height=500 class="my-4">
      <slide :index="0">
        <router-link :to="`/movieinfo/${bestMovies[0].id}`">
          <img :src="bestMoviePosterSrc1" alt="">
        </router-link>
      </slide>
      <slide :index="1">
        <router-link :to="`/movieinfo/${bestMovies[1].id}`">
          <img :src="bestMoviePosterSrc2" alt="">
        </router-link>
      </slide>
      <slide :index="2">
        <router-link :to="`/movieinfo/${bestMovies[2].id}`">
          <img :src="bestMoviePosterSrc3" alt="">
        </router-link>
      </slide>
      <slide :index="3">
        <router-link :to="`/movieinfo/${bestMovies[3].id}`">
          <img :src="bestMoviePosterSrc4" alt="">
        </router-link>
      </slide>
      <slide :index="4">
        <router-link :to="`/movieinfo/${bestMovies[4].id}`">
          <img :src="bestMoviePosterSrc5" alt="">
        </router-link>
      </slide>
    </carousel-3d>

  </div>
</template>
<script>
// import axios from 'axios'
import { Carousel3d, Slide } from 'vue-carousel-3d'
// import ModalView from '@/components/ModalView.vue'
// import MovieDetail from '@/components/MovieDetail.vue'

export default {
  name: "MovieFiveBest",
  props: {
    movie: {
      type: Object
    },
    bestMovies: {
      type: Array
    }
  },
  data: function () {
    return {
      // bestMovies: [],
      isModalViewed: false,
      tossMovie: Object,
    }
  },
  components: {
    Carousel3d,
    Slide,
  },
  computed : {
    bestMoviePosterSrc1() {
      return 'https://image.tmdb.org/t/p/w500' + this.bestMovies[0].poster_path
    },
    bestMoviePosterSrc2() {
      return 'https://image.tmdb.org/t/p/w500' + this.bestMovies[1].poster_path
    },
    bestMoviePosterSrc3() {
      return 'https://image.tmdb.org/t/p/w500' + this.bestMovies[2].poster_path
    },
    bestMoviePosterSrc4() {
      return 'https://image.tmdb.org/t/p/w500' + this.bestMovies[3].poster_path
    },
    bestMoviePosterSrc5() {
      return 'https://image.tmdb.org/t/p/w500' + this.bestMovies[4].poster_path
    },
  }
}
</script>

<style>

</style>