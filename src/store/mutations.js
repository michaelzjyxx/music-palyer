import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_DISS] (state, diss) {
    state.diss = diss
  }
}

export default mutations
