<template>
  <div>
    <div class="container">
      <div class="row px-5 mt-5">
        <div class="col-2">          
          <img src="@/assets/profileImg.png" class="img-thumbnail rounded-circle" alt="">
        </div>
        <div class="col-10 align-self-end">
          <h2 class="text-start fw-bold">@{{ mydata.user_id }}</h2>
          <p class="text-start text-warning">
            <span>선호 장르 : </span>
            <span v-for="genre in mydata.like_genres" :key="genre.genre_pk"> {{ genre.genre_name }}</span>
          </p>          
        </div>
      </div>
    </div>
    <div class="container">      
      <div class="row mt-5">
        <div class="col-4">
          <div class="list-group">
            <a @click="is_movie=true, is_post=false, is_comment=false" class="list-group-item list-group-item-action">좋아하는 영화</a>
            <a @click="is_movie=false, is_post=true, is_comment=false" class="list-group-item list-group-item-action">작성한 글</a>
            <a @click="is_movie=false, is_post=false, is_comment=true" class="list-group-item list-group-item-action">작성한 댓글</a>
          </div>
        </div>

        <div v-if="is_post" class="col-8">
          <ul class="list-group list-group-flush">
            <li class="list-group-item fw-bold fs-2"> 작성 글 <i class="far fa-paper-plane"></i> </li>
            <li v-for="postt in mydata.post" :key="postt.post_pk" class="list-group-item">{{ postt.post_title }}</li>
          </ul>
        </div>
        <div v-if="is_comment" class="col-8">
          <ul class="list-group list-group-flush">
            <li class="list-group-item fw-bold fs-2"> 작성 댓글 <i class="far fa-paper-plane"></i> </li>
            <li v-for="commentt in mydata.comment" :key="commentt.comment_pk" class="list-group-item">{{ commentt.comment_content }}</li>
          </ul>
        </div>
        <div v-if="is_movie" class="col-8">
          <ul class="list-group list-group-flush">
            <li class="list-group-item fw-bold fs-2"> 좋아요 영화 <i class="far fa-paper-plane"></i> </li>
            <li v-for="like_movie in mydata.like_movies" :key="like_movie.movie_pk" class="list-group-item">{{ like_movie.movie_title }}</li>
          </ul>
        </div>

      </div>
    </div>

    <hr>

    <div class="mt-5">
      <!-- {{ mydata.like_genres }} -->
      <GenreCheck :likedInfo="this.mydata.like_genre_numbers"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import GenreCheck from '@/components/GenreCheck.vue'

export default {
  name: 'Profile',
  components: {
    GenreCheck
  },
  props: {
    getUserPk: {
      type: Number
    }
  },
  data() {
    return {
      userpk: 0,
      mydata: Object,
      is_movie: true,
      is_post: false,
      is_comment: false
    }
  },
  created() {
    if (this.getUserPk) {      
      axios.get(`http://127.0.0.1:8000/api/v1/accounts/profile/${this.getUserPk}/`)
        .then(res => {
          console.log(res.data)
          this.mydata = res.data
        })
        .catch(err => {
          console.error(err)
        })      
    } else {
      axios.get('http://127.0.0.1:8000/api/v1/accounts/returnuserpk/')
        .then(res => { 
          const userpk = res.data.user_id
          axios.get(`http://127.0.0.1:8000/api/v1/accounts/profile/${userpk}/`)
            .then(res => {
              console.log(res)
              this.mydata = res.data
            })
            .catch(err => {
              console.error(err)
            })
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