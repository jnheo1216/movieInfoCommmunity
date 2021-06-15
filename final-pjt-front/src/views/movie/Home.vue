<template>
  <div class="home-background-color">
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'

export default {
  name: 'Home',
  components: {
    MovieList
  },
  created() {
    this.$store.dispatch('getMovies')
  }
}
</script>

<style>
.home-background-color {
  background-color: #27292d
}
</style>