<template>
  <div>
  <div class="container">
    <div 
    class="back-image"> 
    <img src='@/assets/coc_logo.png' alt="">
    <div class="my-5">
    <form>
        <div class="mb-3">
          <label for="dataTitle" class="form-label"></label>
          <input v-model.trim="data.title" type="text" class="form-control" placeholder="제목" aria-label="title" aria-describedby="dataTitle">
        </div>
        <div class="mb-3">
          <label for="dataMovieTitle" class="form-label"></label>
          <input v-model.trim="data.movie_title" type="text" class="form-control" placeholder="영화 제목" aria-label="movieTitle" aria-describedby="dataMovieTitle">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">영화 평점</span>
          <input v-model="data.rank" type="number" min="1" max="10" class="form-control" aria-label="rank">
          <span class="input-group-text"> 점</span>
        </div> 
        <div class="input-group mb-3">
          <textarea v-model.trim="data.content" class="form-control" placeholder="내용" aria-label="content" rows="3"></textarea>
        </div>

        <button type="submit" class="btn btn-outline-warning" @click="postCreate" data-mdb-ripple-color="dark">
          작성
        </button>
      </form>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'

// 글 작성시 바로 community로 이동
export default {
  name: 'CreatePost',
  data: function () {
    return {
      data: {
        title: '',
        rank: 0,        
        movie_title: '',
        content: '',
      }
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    // postCreate() {
    //   console.log(this.data)
    //   this.$store.dispatch('createPost', this.data)
    //   this.title = ''
    //   this.movie_title = ''
    //   this.content = ''
    //   this.rank = 0
    // }
    postCreate: function() {   
      console.log(this.data)
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/v1/community/',
        data: this.data,
        // headers: this.setToken()
      })
        .then(res => {
          console.log(res)
        })
        .then(() => {
          this.$router.go(this.$router.push({ name: 'Community' }))
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style>
.create {
  bottom: 20px;
}

</style>