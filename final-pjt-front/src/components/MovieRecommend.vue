<template>
  <div>
    <h2 class="text-light text-start mx-5 mt-3 my-4">당신이 좋아할만한 컨텐츠</h2>
    <div hidden>{{recommendList[0].poster_path}}</div>
    <div hidden>{{recommendList[0].poster_path}}</div>
    <!-- <div>{{ recommendList.length }}</div> -->
    <carousel class="my-4"
    :center-mode="true" :per-page-custom="[[480, 2], [768, 5]]"
    >
    <!-- :autoplay-timeout="3000" -->
    <!-- :autoplay="true" -->
    <!-- :navigation-enabled="true" -->
      <slide><router-link :to="`/recommendmovie/${recommendList[1].id}`"><img :src='RecommendMovieSrc1' width="300px" height="400px"></router-link></slide>
      <slide><router-link :to="`/recommendmovie/${recommendList[2].id}`"><img :src='RecommendMovieSrc2' width="300px" height="400px"></router-link></slide>
      <slide><router-link :to="`/recommendmovie/${recommendList[3].id}`"><img :src='RecommendMovieSrc3' width="300px" height="400px"></router-link></slide>
      <slide><router-link :to="`/recommendmovie/${recommendList[4].id}`"><img :src='RecommendMovieSrc4' width="300px" height="400px"></router-link></slide>
      <slide><router-link :to="`/recommendmovie/${recommendList[5].id}`"><img :src='RecommendMovieSrc5' width="300px" height="400px"></router-link></slide>
      <slide><router-link :to="`/recommendmovie/${recommendList[6].id}`"><img :src='RecommendMovieSrc6' width="300px" height="400px"></router-link></slide>
      <slide><router-link :to="`/recommendmovie/${recommendList[7].id}`"><img :src='RecommendMovieSrc7' width="300px" height="400px"></router-link></slide>
      <slide><router-link :to="`/recommendmovie/${recommendList[8].id}`"><img :src='RecommendMovieSrc8' width="300px" height="400px"></router-link></slide>
      <slide><router-link :to="`/recommendmovie/${recommendList[9].id}`"><img :src='RecommendMovieSrc9' width="300px" height="400px"></router-link></slide>
      <slide><router-link :to="`/recommendmovie/${recommendList[10].id}`"><img :src='RecommendMovieSrc10' width="300px" height="400px"></router-link></slide>
    </carousel>
  </div>
</template>

<script>
// import axios from 'axios'
import { Carousel, Slide } from '@jambonn/vue-concise-carousel'
import '@jambonn/vue-concise-carousel/dist/vue-concise-carousel.css'

export default {
  name: 'MovieRecommend',
  components: { Carousel, Slide },
  data() {
    return {
      // recommendList: [{message: 'dummy'}],
      like_list: [21, 5334, 25521]
    }
  },
  props: {
    recommendList: {
      type: Array
    }
  },
  computed : {
    RecommendMovieSrc1() {
      // console.log(data)
      return 'https://image.tmdb.org/t/p/w500' + this.recommendList[1].poster_path
    },
    RecommendMovieSrc2() {
      // console.log(data)
      return 'https://image.tmdb.org/t/p/w500' + this.recommendList[2].poster_path
    },
    RecommendMovieSrc3() {
      // console.log(data)
      return 'https://image.tmdb.org/t/p/w500' + this.recommendList[3].poster_path
    },
    RecommendMovieSrc4() {
      // console.log(data)
      return 'https://image.tmdb.org/t/p/w500' + this.recommendList[4].poster_path
    },
    RecommendMovieSrc5() {
      // console.log(data)
      return 'https://image.tmdb.org/t/p/w500' + this.recommendList[5].poster_path
    },
    RecommendMovieSrc6() {
      // console.log(data)
      return 'https://image.tmdb.org/t/p/w500' + this.recommendList[6].poster_path
    },
    RecommendMovieSrc7() {
      // console.log(data)
      return 'https://image.tmdb.org/t/p/w500' + this.recommendList[7].poster_path
    },
    RecommendMovieSrc8() {
      // console.log(data)
      return 'https://image.tmdb.org/t/p/w500' + this.recommendList[8].poster_path
    },
    RecommendMovieSrc9() {
      // console.log(data)
      return 'https://image.tmdb.org/t/p/w500' + this.recommendList[9].poster_path
    },
    RecommendMovieSrc10() {
      // console.log(data)
      return 'https://image.tmdb.org/t/p/w500' + this.recommendList[10].poster_path
    },
  }
  
}
</script>

<style>

</style>