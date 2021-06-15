<template>
  <div class="home-background-color px-5 pt-5">
    <div class="text-light text-start mb-5">
      <h2>'{{ query }}' 관련 영화 검색 결과</h2>
    </div>

    <div v-if="!total_results" class="text-light text-start mb-5" style="height: 1000px;">
      <h2>'{{ query }}' 검색결과 없음</h2>
    </div>

    <div v-if="total_results" class="row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6 g-4">
      <div v-for="movie in searchedMovie" :key="movie.id">        
        <div class="col">
          
          <router-link :to="`/recommendmovie/${movie.id}`">
          <MovieCard :movie="movie"/>
          </router-link>
          
        </div>  
      </div> 
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'SearchMovie',
  data() {
    return {
      query: '',
      searchedMovie: [],
      total_results: 0
    }
  },
  components: {
    MovieCard
  },
  created() {
    this.query = this.$route.params.query
    const params = {
      api_key: 'b4893f302d08c4a823cdf51e8fcee9cc',
      language: 'ko-KR',
      query: this.query
    }
    axios.get(`https://api.themoviedb.org/3/search/movie`, { params })
      .then(res => {
        console.log(res.data)
        this.searchedMovie = res.data.results
        this.total_results = res.data.total_results
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>

<style>

</style>