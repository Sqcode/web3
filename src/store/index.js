import { createStore } from 'vuex'

export default createStore({
  state: {
    token: sessionStorage.getItem('token'),
    user: JSON.parse(sessionStorage.getItem('user'))
  },
  mutations: {
    // set
    SET_TOKEN: (state, token) => {
      // console.log('store', state, token);
      state.token = token
      sessionStorage.setItem('token', token)
    },
    SET_USER: (state, user) => {
      // console.log('store', state, user);
      state.user = user
      sessionStorage.setItem('user', JSON.stringify(user))
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      state.user = {}
      sessionStorage.setItem('token', '')
      sessionStorage.setItem('user', JSON.stringify(''))
    }
  },
  actions: {},
  modules: {}
})
