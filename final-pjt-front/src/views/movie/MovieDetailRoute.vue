<template>
<div>
  <!-- Tabs navs -->
  <ul class="nav nav-tabs bg-dark" id="ex1" role="tablist">
    <li class="nav-item bg-dark" role="presentation">
      <a
        class="nav-link active text-warning border-warning"
        id="ex1-tab-1"
        data-mdb-toggle="tab"
        href="#ex1-tabs-1"
        role="tab"
        aria-controls="ex1-tabs-1"
        aria-selected="true"
        >영화 상세</a
      >
    </li>
    <li class="nav-item bg-dark" role="presentation">
      <a
        class="nav-link text-warning border-warning"
        id="ex1-tab-2"
        data-mdb-toggle="tab"
        href="#ex1-tabs-2"
        role="tab"
        aria-controls="ex1-tabs-2"
        aria-selected="false"
        >리뷰</a
      >
    </li>
  </ul>
  <!-- Tabs navs -->

  <!-- Tabs content -->
  <div class="tab-content" id="ex1-content">
    <div
      class="tab-pane fade show active"
      id="ex1-tabs-1"
      role="tabpanel"
      aria-labelledby="ex1-tab-1"
    >
  <div 
    class="movie-detail-image"
    :style="{ backgroundImage: `url(${backgroundSrc})` }" > 
  
    <div class="movie-content d-flex">
      <div style="" class="mt-3 mx-3">
        <img
          class="mt-2 "
          style="height:80vh;"
          :src="imgSrc"
        />
      </div>
      <div class="ml-4 w-75 mt-5">
        <h1 class="movie-title font-color">{{ movieInfo.title }}</h1>
        
        <div class="movie-information-wrapper mt-4 d-flex align-items-center">
          <h3 class="mx-3 font-color">개봉일 : {{ movieInfo.release_date }}</h3>
          <h3 class="mx-3 font-color">평점 : {{ movieInfo.vote_average }}</h3>
        <div class="mx-3">
            <div class="text-danger" v-if="is_liked" @click="like"><i class="fas fa-heart fa-3x"></i></div> 
            <div class="text-danger" v-else @click="like"><i class="far fa-heart fa-3x"></i></div>
        </div>
        <p class="mt-3 font-color-red">{{ countLike }}</p>
        </div>
        <div class="movie-information-wrapper mt-4 d-flex align-items-center text-start">
          <p class="mx-5 font-color youtube-position">{{ movieInfo.overview }}</p>
        </div>
        <div class="youtube-position">
          <iframe
            :src="youtubeSrc"
            allow="autoplay; encrypted-media"
            frameborder="0"  
            width="640" 
            height="360">
          </iframe>
        </div>
      </div>
      </div>
      </div>
    </div>


    <div class="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
    <div 
      class="movie-detail-image"
      :style="{ backgroundImage: `url(${backgroundSrc})` }" > 
    
      <div class="movie-content d-flex">
        <div style="" class="mt-3 mx-3">
          <img
            class="mt-2 "
            style="height:80vh;"
            :src="imgSrc"
          />
        </div>
      <div class="ml-4 w-75 mt-5">
        <h1 class="movie-title font-color">{{ movieInfo.title }}</h1>
        
        <div class="movie-information-wrapper mt-4 d-flex align-items-center">
          <h3 class="mx-3 font-color">현재 좋아요 수</h3>
        <div class="mx-3">
            <div class="text-danger" v-if="is_liked" @click="like"><i class="fas fa-heart fa-3x"></i></div> 
            <div class="text-danger" v-else @click="like"><i class="far fa-heart fa-3x"></i></div>
        </div>
        <p class="mt-3 font-color-red">{{ countLike }}</p>
        </div>
        <p class="text-start font-color mx-3">현재 작성된 리뷰 : {{ reviewList.length }}</p>

        <div class="input-group mb-3 mx-3">
          <input v-model.trim="reviewData.content" type="text" class="form-control border-warning" placeholder="당신의 감상을 남겨주세요">
          <span class="input-group-text border-warning text-light">점수:</span>
          <input v-model.trim="reviewData.rank" type="number" min="1" max="10" class="form-control border-warning">
          <div class="text-end"><button class="btn btn-outline-warning" @click="create_review()">작성</button></div>
        </div>

      <table class="table table-borderless">
        <thead class="border-bottom">
          <tr>
            <th scope="col" colspan="3" class="text-light">Review</th>
            <th scope="col" class="text-light">평점</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in reviewList" :key="review.id">
            <th scope="row" colspan="3" class="text-center font-color">{{ review.content }}</th>
            <td class="text-center font-color">{{ review.rank }}</td>
            <button type="button" class="btn btn-danger btn-sm px-3" @click="delete_review(review.id)">
              <i class="fas fa-times"></i>
            </button>
          </tr>
        </tbody>
      </table>
      
      </div>
      </div>
      </div>
    </div>

  </div>
  <!-- Tabs content -->
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MovieDetailRoute',
  data() {
    return {
      movieId: '',
      movieInfo: {},
      video_key: '',
      is_liked: false,
      reviewList: [],
      countLike: 0,
      reviewData: {
        content: '',
        rank: 1
      }
    }
  },
  computed: {
    imgSrc() {
      return 'https://image.tmdb.org/t/p/w500' + this.movieInfo.poster_path
    },
    youtubeSrc() {
      return `https://www.youtube.com/embed/${this.video_key}?autoplay=1&mute=1`
    },
    backgroundSrc() {
      return 'https://image.tmdb.org/t/p/w500' + this.movieInfo.backdrop_path
    },
  },
  created() {
    this.movieId = this.$route.params.id    
    axios.get(`http://127.0.0.1:8000/api/v1/movies/${this.$route.params.id}/`)
      .then(res => {
        console.log(res.data)
        this.movieInfo = res.data.movie
        this.is_liked = res.data.is_liked
        this.reviewList = res.data.review_list
        this.countLike = res.data.movie.like_user.length
        this.video_key = res.data.movie.key
      })
      .catch(err => {
        console.error(err)
      })
  },
  methods: {
    like() {
      axios.get(`http://127.0.0.1:8000/api/v1/movies/${this.movieInfo.id}/like/`)
        .then(res => {
          console.log(res.data)
          this.is_liked = !this.is_liked
          if (this.is_liked) {
            this.countLike += 1
          } else {
            this.countLike -= 1
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    create_review: function() {   
      console.log(this.commentData)
      axios({
        method: 'POST',
        url: `http://127.0.0.1:8000/api/v1/movies/${this.movieInfo.id}/`,
        data: this.reviewData,
      })
        .then(res => {
          console.log(res.data)
          this.reviewList.push(res.data)
          this.reviewData.content = ''
          this.reviewData.rank = 0
        })
        .catch(err => {
          console.error(err)
        })
    },
    delete_review(reviewId) {
      // console.log(reviewId)
      // console.log(this.movieInfo.id)
      axios.delete(`http://127.0.0.1:8000/api/v1/movies/${this.movieInfo.id}/${reviewId}/`)
        .then(res => {
          console.log(res.data)
          for(let i = 0; i < this.reviewList.length; i++) {
            if(this.reviewList[i]['id'] === reviewId)  {
              this.reviewList.splice(i, 1);
              i--;
            }
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style>
.movie-detail {
  /* z-index: 99; */
  position: relative;
  padding: 40px 40px;
}
.movie-detail-image {
  background-size: cover;
  height: 100vh;
  position: relative;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;

  /* filter: grayscale(px); */
}
.movie-detail-image::after {
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0px;
  min-height: 100vh;
  background-color: rgb(40, 40, 40);
  opacity: 0.8;
  content: "";
  display: block;
}

.movie-content {
  position: relative;
  z-index: 999;
}
.movie-title {
  margin-left: 5px;
}
.movie-information-wrapper {
  font-size: 13px;
}
.movie-overview {
  max-width: 80%;
  font-size: 14px;
  color: black
}

.font-color {
  color: white;
}
.font-color-red {
  color: white;
  font-size: 18px;
}
.nav-tab-back {
  background-color: #27292d;
}

.nav-font-color {
  color: white;
}

.youtube-position {
  margin-bottom: 50px;
}
</style>