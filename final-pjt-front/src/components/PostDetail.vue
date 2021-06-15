<template>
  <div>
    <h2>{{ getInfo.serializer_post.title }}</h2>
    <p>{{ getInfo.serializer_post.movie_title }}</p>
    <p class="text-end">{{ getInfo.username }} 님의 점수 : {{ getInfo.serializer_post.rank }}</p>
    <p>{{ getInfo.serializer_post.content }}</p>
    <p class="text-end">{{ getInfo.serializer_post.created_at }}</p>

    {{ like_numbers }}
    <div  v-if="is_liked">
      <h2><i @click="like" class="fas fa-heart"></i></h2>
    </div>
    <div v-else>
      <h2><i @click="like" class="far fa-heart"></i></h2>
    </div>

    <p class="text-start">댓글 {{ getInfo.serializer_comments.length }}</p>
    <div v-for="comment in commentList" :key="comment.id">
      <p class="text-start">{{ comment.content }}</p>
    </div>
    <div>
      <input v-model.trim="commentData.content" type="text" class="form-control border-warning" placeholder="댓글">
      <div class="text-end"><button class="btn btn-outline-warning" @click="create_comment()">작성</button></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostDetail',
  data: function () {
    return {
      post: Object,
      like_numbers: 1,
      like_list: [],
      is_liked: false,
      commentData: {   
        content: '',
      }
    }
  },
  props: {
    postId: {
      type: Number
    },
    getInfo: {
      type: Object
    },
    userId: {
      type: Number
    }
  },
  created() {
    axios.get(`http://127.0.0.1:8000/api/v1/community/${this.postId}/likelist/`)
      .then(res => {
        console.log(res.data)
        this.like_list = res.data.like_list
        this.like_numbers = res.data.like_list.length
        if (this.like_list.includes(this.userId)) {
          this.is_liked = true
        }
      })
      .catch(err => {
        console.error(err)
      })
  },
  computed: {
    commentList() {
      return this.getInfo.serializer_comments
    }
  },
  methods: {    
    like() {
      axios.get(`http://127.0.0.1:8000/api/v1/community/${this.getInfo.serializer_post.id}/like/`)
        .then(res => {
          console.log(res.data)
          this.is_liked = !this.is_liked
          if (this.is_liked) {
            this.like_numbers += 1
          } else {
            this.like_numbers -= 1
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    create_comment: function() {   
      console.log(this.commentData)
      axios({
        method: 'POST',
        url: `http://127.0.0.1:8000/api/v1/community/${this.postId}/`,
        data: this.commentData,
      })
        .then(res => {
          console.log(res.data)
          this.getInfo.serializer_comments.push(res.data)
          this.commentData.content = ''
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