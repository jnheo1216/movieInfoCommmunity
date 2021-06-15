import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/'
axios.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('access_token')
  config.headers.common['Authorization'] = accessToken ? `Bearer ${accessToken}` : ''
  return config
})

Vue.use(Vuex)
// 라우터로 글작성, 수정시 바로 이동하게 바꿈
export default new Vuex.Store({
  state: {
    movies: [],
    posts: [],
    userSinfo: {},
    accessToken: localStorage.getItem('access_token') || ''
  },
  getters: {    
    isLoggedIn({ accessToken }) {
      return accessToken ? true : false
    }
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies.slice(0,30)
    },
    SET_USERINFO(state, user) {
      state.userSinfo = user
    },
    CREATE_POST(state, post) {
      state.posts.push(post)
    },
    UPDATE_POST(state, post) {
      state
      post
    },
    UPDATE_TOKEN(state, accessToken) {
      state.accessToken = accessToken
    },
    DELETE_TOKEN(state) {
      state.accessToken = ''
    }
  },
  actions: {    
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    getMovies({ commit }) {
      axios.get('movies/')
        .then(res => {
          console.log(res)
          commit('SET_MOVIES', res.data)
        })
        .then(() =>{
          axios.get('accounts/returnuserpk/')
            .then(res => { 
              const userpk = res.data.user_id
              axios.get(`accounts/profile/${userpk}/`)
                .then(res => {
                  commit('SET_USERINFO', res.data)
                  console.log(res.data)
                })
                .catch(err => {
                  console.error(err)
                })
            })
            .catch(err => {
              console.error(err)
            }) 
        })
        .catch(err => {
          console.error(err)
        })
    },
    createPost({ commit }, posts) {
      axios.post('community/', posts)
        .then(res => {
          commit('CREATE_POST', res.data)
        })
        .then(() => {
          router.push({ name: 'Community' })
        })
        .catch(err => {
          console.error(err)
        })
    },
    updatePost({ commit }, posts) {
      console.log(posts)
      axios.put(`community/${posts.id}/`, {
        ...posts,
      })
        .then(res => {
          console.log(res)
          commit('UPDATE_POST', res.data)
        })
        .then(() => {
          router.go(router.push({ name: 'Community' }))
          // router.push({ name: 'Community' })
        })
        .catch(err => {
          console.error(err)
        })
    },
    login(context, credentials) {
      axios.post('token/', credentials)
        .then(res => {
          // 로컬스토리지에 저장
          localStorage.setItem('access_token', res.data.access)
          // vuex 상태에 반영
          context.commit('UPDATE_TOKEN', res.data.access)
        })
        .then(() => {
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.error(err)
        })
    },
    logout({ commit }) {
      commit('DELETE_TOKEN')
      localStorage.removeItem('access_token')
      router.push({ name: 'Login' })
    },
    signup(context, credentials) {
      axios.post('accounts/signup/', credentials)
        .then(res => {
          console.log(res)
          context.dispatch('login', credentials)
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  modules: {
  }
})