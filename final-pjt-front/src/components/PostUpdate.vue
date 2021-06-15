<template>
  <div>
    
    <div class="px-5">

      <div class="mb-3">
        <label for="dataTitle" class="form-label"></label>
        <input v-model.trim="updateData.title" type="text" class="form-control" placeholder="제목" aria-label="title" aria-describedby="dataTitle">
      </div>
      <div class="mb-3">
        <label for="dataMovieTitle" class="form-label"></label>
        <input v-model.trim="updateData.movie_title" type="text" class="form-control" placeholder="영화 제목" aria-label="movieTitle" aria-describedby="dataMovieTitle">
      </div>   
      <div class="input-group mb-3">
        <span class="input-group-text">영화 평점</span>
        <input v-model="updateData.rank" type="number" min="1" max="10" class="form-control" aria-label="rank">
        <span class="input-group-text"> 점</span>
      </div>  
      <div class="input-group mb-3">
        <textarea v-model.trim="updateData.content" class="form-control" placeholder="내용" aria-label="content" rows="3"></textarea>
      </div>
      <div class="text-end mt-3">
        <button class="btn btn-outline-primary" @click="updatePost">수정</button>
      </div>
  

    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'PostUpdate',
  data: function () {
    return {
      post: Object,
      updateData: {
        id: this.postId,
        title: '',
        content: '',
        movie_title: '',
        rank: 0
      }
    }
  },
  props: {
    postId: {
      type: Number
    },
    tossPost: {
      type: Object
    }
  },
  // created: function() {
  //   axios.get(`http://127.0.0.1:8000/api/v1/community/${this.postId}`)
  //     .then(res => {
  //       console.log(res)
  //       this.post = res.data.serializer_post
  //     })      
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // },
  methods: {
    updatePost() {
      console.log(this.updateData)
      this.$store.dispatch('updatePost', this.updateData)
    }
  },
}
</script>

<style>

</style>