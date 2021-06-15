<template>
  <div>
    <!-- <h2>Login</h2>
    <div>
      <label for="username">username: </label>
      <input type="text" id="username" v-model="credentials.username">
    </div>
    <div>
      <label for="password">password: </label>
      <input type="password" id="password"  v-model="credentials.password">  
    </div>
    

    <button
      type="button"
      class="btn btn-primary"
      data-mdb-toggle="modal"
      data-mdb-target="#exampleModal"
      @click="login(credentials)"
    >
      로그인
    </button> -->

  <div class="d-flex align-items-center h-80 my-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-10">
          <div class="card">
            <div class="card-body p-5">

              <div class="row d-flex align-items-center">
                <div class="col-md-6 col-xl-7">

                  <div class="text-center pt-md-5 pb-5 my-md-5 logo-size" style="padding-right: 24px;">
                    <img src='@/assets/coc_logo.png' alt="">
                  </div>

                </div>
                <div class="col-md-6 col-xl-4 text-center">

                  <h2 class="fw-bold mb-4 pb-2">Member Login</h2>

                  <div class="form-outline form-outline-dark mb-3">
                    <input type="username" id="username" v-model="credentials.username" class="form-control border border-top-0 border-dark form-control-lg" />
                    <label class="form-label" for="username">User ID</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="Password" v-model="credentials.password" class="form-control border border-top-0 border-dark form-control-lg" />
                    <label class="form-label" for="Password">Password</label>
                  </div>

                  <div class="text-center">
                    <button class="btn btn-danger btn-block btn-lg mt-3 mb-4" @click="login(credentials)" type="submit">Login</button>
                    <router-link to="/signup" class="link-info">Create your Account <i class="fas fa-long-arrow-alt-right"></i></router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex'


export default {
  name: 'Login',
  components: {
   
  },
  data() {
    return {
      credentials: {
        username: '',
        password: '',
    
      }
    }
  },
  
  methods: {
    ...mapActions([
      'login'
    ])
  }
}
</script>

<style>
.intro {
  height: 100%;
}

@media (min-height: 300px) and (max-height: 450px) {
  .intro {
    height: auto;
  }
}

</style>