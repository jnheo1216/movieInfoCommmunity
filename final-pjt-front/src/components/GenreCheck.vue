<template>
  <div>
    <h3>what is your favorite</h3>
    <!-- {{ likedInfo }} -->
    <div class="container mt-5">
      <div class="row">
        <div v-for="genre in genreList" :key="genre.id" class="col-3">
          <CheckBox :genre="genre" :is_checked="likedInfo.includes(genre.id)"/>
        </div>
      </div>
    </div>
    <div class="container mt-5"></div>
  </div>
</template>

<script>
import axios from 'axios'
import CheckBox from '@/components/CheckBox.vue'

export default {
  name: 'GenreCheck',
  data() {
    return {
      genreList: []
    }
  },
  props: {
    likedInfo: {
      type: Array
    }
  },
  created() {
    axios.get('http://127.0.0.1:8000/api/v1/movies/genre/')
      .then(res => {
        console.log(res.data)
        this.genreList = res.data
      })
      .catch(err => {
        console.error(err)
      })
  },
  components: {
    CheckBox
  },
  computed: {
    getList() {
      const tempList = this.likedInfo.map(function(obj){
        const tmp = obj.genre_pk
        return tmp
      })
      return tempList
    }
  }
}
</script>

<style>

</style>