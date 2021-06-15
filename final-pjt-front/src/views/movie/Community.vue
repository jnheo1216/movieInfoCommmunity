<template>
  <div>
    <div class="d-flex justify-content-end my-3 mx-5 px-3">
      <button type="button" class="btn btn-outline-warning" data-mdb-ripple-color="dark">
        <router-link class="text-decoration-none text-dark" to="/createpost">글 작성</router-link>
      </button>
    </div>
      
    <div class="px-5">
      <div class="card border-warning mt-5" v-for="post in posts" :key="post.id">
        <div class="card-header bg-transparent border-warning text-start"><h5>{{ post.title }}</h5></div>
        <div class="card-body" @click="isModalViewedDetail=true, tossPost=post, postId=post.id, detailPosts(post)">
          <p class="card-text"><small class="text-muted"> {{post.movie_title }} </small></p>
          <p class="card-text"> {{post.content }} </p>
          <p class="card-text text-end"><small class="text-muted">{{ post. created_at }}</small></p>
        </div>
        <div class="card-text text-end px-2">
          <i @click="isModalViewedUpdate=true, tossPost=post, postId=post.id" class="far fa-edit"></i> | 
          <i 
            @click="tossPost=post, postId=post.id "
            class="far fa-trash-alt"
            data-mdb-toggle="modal"
            data-mdb-target="#exampleModal"
            ></i>
          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">삭제</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-mdb-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">게시글을 삭제하시겠습니까?</div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-mdb-dismiss="modal">
                    Close
                  </button>
                  <button type="button" @click="deletePosts(tossPost)" class="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <ModalView v-if="isModalViewedUpdate" @close-modal="isModalViewedUpdate=false">
      <PostUpdate :postId="postId" :tossPost="tossPost"/>
    </ModalView>
    <ModalView v-if="isModalViewedDetail" @close-modal="isModalViewedDetail=false">
      <PostDetail :postId="postId" :getInfo="getInfo" :userId="userId"/>
    </ModalView>

    <router-view/>
  </div>

  
</template>

<script>
import ModalView from '@/components/ModalView.vue'
import PostUpdate from '@/components/PostUpdate.vue'
import PostDetail from '@/components/PostDetail.vue'
import axios from 'axios'

export default {
  name: 'Community',
  components: {
    ModalView,
    PostUpdate,
    PostDetail
  },
  data() {
    return {
      isModalViewedUpdate: false,
      isModalViewedDetail: false,
      postId: 0,
      tossPost: Object,
      posts: [],
      getInfo: Object,
      userId: ''
    }
  },
  created() {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/v1/community/'
    })
    // axios.get('http://127.0.0.1:8000/api/v1/community/')
      .then((res) => {
        console.log(res)
        this.posts = res.data
        axios.get('http://127.0.0.1:8000/api/v1/accounts/returnuserpk/')
          .then(res => {
            this.userId = res.data.user_id
          })
          .catch(err => {
            console.error(err)
          })
      })
      .catch((err) => {
        console.error(err)
      })
    
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    deletePosts: function(post) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/api/v1/community/${post.id}/`,
        headers: this.setToken()
      })
      .then((res) => {
        console.log(res)
      })
      .then(() => {
        this.$router.go(this.$router.push({ name: 'Community' }))
      })
      .catch((err) => {
        console.log(err)
      })
    },
    detailPosts: function(post) {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/community/${post.id}/`,
        headers: this.setToken()
      })
      .then((res) => {
        console.log(res.data)
        this.getInfo = res.data
        // return res.data
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>