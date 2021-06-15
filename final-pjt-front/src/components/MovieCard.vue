<template>
<div>
  <div class="col"> 
    <div class="card card-background-color card-design scale mx-3">
      <img :src="moviePosterSrc"  class="card-img-top" alt="...">
      <div class="card-body-design">
        <div class="card-body">
        <p class="card-title text-light">{{ movie.title }}</p>
        <p class="card-text text-light">{{ movie.release_date }}</p>
      </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object
    }
  },
  computed : {
    moviePosterSrc() {
      return 'https://image.tmdb.org/t/p/w500' + this.movie.poster_path
    }
  }
}
</script>

<style>
 .card-background-color {
   background-color: #27292d
 }
 .card-design {
   min-height: 480px;
 }
 .card-body-design {
   align-items: center;
   justify-content: center;
 }

 .scale {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transition: all 0.3s ease-in-out;   /* 부드러운 모션을 위해 추가*/
}
.scale:hover {
  transform: scale(1.2);
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -ms-transform: scale(1.2);
  -o-transform: scale(1.2);
}
.img {width:325px; height:280px; overflow:hidden }

div, p {
  font-family: 'Jua', sans-serif;
  font-size: 15pt;
}
</style>