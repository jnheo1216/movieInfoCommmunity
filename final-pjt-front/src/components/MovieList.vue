<template>
  <div>
    <lazyComponentMFB v-if="is_best" :bestMovies="bestMovies"/>
    <lazyComponentMR v-if="is_recommend" :recommendList="recommendList"/>

    <h2 class="text-light text-start mx-5 mt-3 my-3">일반 컨텐츠</h2>
    <div class="row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6 g-4">
      <div v-for="movie in movies" :key="movie.id">        
        <div class="col">
          <!-- <div class="card" @click="isModalViewed=true, tossMovie=movie, tossId=movie.id"> -->
          <router-link :to="`/movieinfo/${movie.id}`">
          <MovieCard :movie="movie"/>
          </router-link>
          
          <!-- </div> -->
        </div>  
      </div> 
    </div>
    
    <ModalView v-if="isModalViewed" @close-modal="isModalViewed=false">
      <MovieDetail :movieInfo="tossMovie"/>
    </ModalView>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ModalView from '@/components/ModalView.vue'
import MovieDetail from '@/components/MovieDetail.vue'
import MovieCard from '@/components/MovieCard.vue'
// import MovieFiveBest from '@/components/MovieFiveBest.vue'
// import MovieRecommend from '@/components/MovieRecommend.vue'

const lazyComponentMR = () => import('@/components/MovieRecommend.vue')
const lazyComponentMFB = () => import('@/components/MovieFiveBest.vue')



export default {
  name: 'MovieList',
  data() {
    return {
      isModalViewed: false,
      tossMovie: Object,
      tossId: 0,

      recommendList: [],
      bestMovies: [],
      like_list: [],
      like_list_genre: [],
      is_recommend: false,
      is_best: false
    }
  },
  components: {
    ModalView,
    MovieDetail,
    MovieCard,
    // MovieFiveBest,
    // MovieRecommend,
    lazyComponentMR,
    lazyComponentMFB
  },
  computed: {
    ...mapState([
      'movies'
    ])
  },

  created() {    
    this.is_recommend = false,
    this.is_best = false
    axios.get('http://127.0.0.1:8000/api/v1/movies/bestFive/')
      .then(res => {
        console.log(res.data)
        this.bestMovies = res.data
        this.is_best = true
      })
      .catch(err => {
        console.error(err)
      })
      
    const params = {
      api_key: 'b4893f302d08c4a823cdf51e8fcee9cc',
      language: 'ko-KR'
    }
    axios.get('http://127.0.0.1:8000/api/v1/accounts/likelist/')
      .then(res => {
        console.log(res.data)
        this.like_list = res.data.like_movie_list
        this.like_list_genre = res.data.like_genre_list
      })
      .then(() => {
        for (let i=0; i < this.like_list.length-1; i++) {
          axios.get(`https://api.themoviedb.org/3/movie/${this.like_list[i]}/similar`, { params })
            .then(res => {
              const tmp = this.recommendList.concat(res.data.results.slice(0,3))
              this.recommendList = tmp
            })
            .catch(err => {
              console.error(err)
            })
          axios.get(`https://api.themoviedb.org/3/movie/${this.like_list[i+1]}/recommendations`, { params })
            .then(res => {
              const tmp = this.recommendList.concat(res.data.results.slice(0,5))
              this.recommendList = tmp
              console.log(this.recommendList)
            })
            .catch(err => {
              console.error(err)
            })
          axios.get(`https://api.themoviedb.org/3/genre/${this.like_list_genre[i]}/movies`, { params })
            .then(res => {
              const tmp = this.recommendList.concat(res.data.results.slice(0,2))
              this.recommendList = tmp
              console.log(this.recommendList)
            })
            .catch(err => {
              console.error(err)
            })
        }
        this.is_recommend = true
      })
      .catch(err => {
        console.error(err)
      })
  },
}
</script>

<style>

</style>