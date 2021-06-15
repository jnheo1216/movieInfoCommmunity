<template>
  <div>
    <!-- {{ genre.id }} -->
    <div class="form-check" v-if="!this.is_checked">
      <input @click="likeGenre()" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
      <label class="form-check-label" for="flexCheckDefault">
        {{ genre.name }}
      </label>
    </div>
    <div class="form-check" v-else>
      <input @click="likeGenre()" class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
      <label class="form-check-label" for="flexCheckChecked">
        {{ genre.name }}
      </label>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CheckBox',
  props: {
    genre: {
      type: Object
    },
    is_checked: {
      type: Boolean
    }
  },
  methods: {
    likeGenre() {
      axios.get(`http://127.0.0.1:8000/api/v1/movies/genre/${this.genre.id}/like/`)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style>

</style>