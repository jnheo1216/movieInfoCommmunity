<template>
  <div id="app">
  <!-- Navbar -->
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <!-- Container wrapper -->
    <div class="container-fluid">
      <!-- Toggle button -->
      <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarLeftAlignExample"
            aria-controls="navbarLeftAlignExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
        <i class="fas fa-bars"></i>
      </button>

      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse" id="navbarLeftAlignExample">
        <!-- Navbar brand -->
        <router-link class="navbar-brand" to="/">
          <img
            src='@/assets/coc_logo.png'
            height="40"
            width="100"
            alt=""
            loading="lazy"
          />
        </router-link>
        <!-- Left links -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item d-flex">
            <router-link class="nav-link active" aria-current="page" to="/">홈</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item d-flex">
            <router-link class="nav-link" to="community">게시판</router-link>
          </li>
        </ul>
        <!-- Left links -->
      </div>
      <!-- Collapsible wrapper -->

      <!-- Right elements -->
    <div class="d-flex align-items-center">

        <!-- 검색바 -->
        <form v-if="isLoggedIn" class="d-flex input-group w-auto">
          <input
            v-model="query"
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span class="input-group-text border-0" id="search-addon">
            <router-link :to="`/searchmovie/${query}`">
              <i class="fas fa-search"></i>
            </router-link>
          </span>
        </form>

        <!-- 로그인 화원가입 -->
        <div v-if="!isLoggedIn" class="d-flex align-items-center">
          <router-link to="/login">
          <button type="button" class="btn btn-link px-3 me-2">
            Login
          </button>
          </router-link>
          <router-link to="/signup">
          <button type="button" class="btn btn-outline-primary me-3">
            Sign up
          </button>
          </router-link>
        </div>

        <!-- Avatar -->
        <a v-if="isLoggedIn"
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="true"
        >
          <i class="fas fa-user"></i>
        </a>
        <ul v-if="isLoggedIn"
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <li>
            <router-link class="dropdown-item" to="/profile">My profile</router-link>
          </li>
          <li>
            <a class="dropdown-item" @click="logout">logout</a>
          </li>
        </ul>
    </div>
      <!-- Right elements -->
    </div>
    <!-- Container wrapper -->
  </nav>
  <!-- Navbar -->

  <router-view/>
  </div>
  
</template>


<script>
// 로그인 로그아웃 판단용
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'App',
  data() {
    return {
      query: ''
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ]),
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  },
  
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: none;
}

.dropbox-color {
  background-color: gray;
}
</style>
