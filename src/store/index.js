import { createStore } from 'vuex'

export default createStore({
  state: {
    token: sessionStorage.getItem('token'),
    showSearch: sessionStorage.getItem('showSearch')?false:true,
    user: JSON.parse(sessionStorage.getItem('user')),
    search: JSON.parse(sessionStorage.getItem('search'))
  },
  mutations: {
    RESERVE_SEARCH: (state, search) => {
      var ss = state.search
      if (!ss) {
        ss = {}
      }
      for (let k in search) {
        ss[k] = search[k]
      }
      sessionStorage.setItem('search', JSON.stringify(ss))
    },
    SHOW_SEARCH: (state, bol) => {
      state.showSearch = bol
      sessionStorage.setItem('showSearch', bol)
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    SET_USER: (state, user) => {
      state.user = user
      sessionStorage.setItem('user', JSON.stringify(user))
    },
    REMOVE_SEARCH: (state) => {
      state.search = {}
      sessionStorage.setItem('search', JSON.stringify(''))
    },
    REMOVE_INFO: (state) => {
      state.user = {}
      sessionStorage.setItem('token', '')
      sessionStorage.setItem('showSearch', true)
      sessionStorage.setItem('user', JSON.stringify(''))
    }
  },
  actions: {},
  modules: {}
})
