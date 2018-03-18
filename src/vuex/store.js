import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import{
  CHANGE_KEYWORD,
  SEARCH
} from './mutation-types'

const state = {
  keyword: '',
  gifs: []
}

function getGIFs(query) {
  const params = encodeURIComponent(query).replace(/%20/g, '+')
  return fetch('http://api.giphy.com/v1/gifs/search?q=' + params + '&api_key=dc6zaTOxFJmzC')
        .then(res => res.json())
}
const actions = {
 [CHANGE_KEYWORD]({commit}, keyword){
   commit(CHANGE_KEYWORD, keyword)
 },
 [SEARCH]({commit, state}) {
   getGIFs(state.keyword)
   .then(data => {
     commit(SEARCH, data)
   })
 }
}
const getters = {
  gifs:state => state.gifs
}

const mutations = {
  [CHANGE_KEYWORD](state, keyword) {
    state.keyword = keyword
  },
  [SEARCH](state ,gifs) {
    state.gifs = gifs.data
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
