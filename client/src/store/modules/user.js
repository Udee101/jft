import { getUser, updateUser } from "../../api/user";

const state = () => ({
  user: {},
  isUserAuth: false,
  userNav: false
})

const mutations = {
  setUser(state, { user }) {
    state.user = user
  },
  setUserAuthTrue(state) {
    state.isUserAuth = true
  },
  setUserAuthFalse(state) {
    state.isUserAuth = false
  },
  setUserNavOpen(state) {
    state.userNav = true 
  },
  setUserNavClose(state) {
    state.userNav = false 
  },
}

const actions = {
  async fetchUser({ commit }) {
    const user = await getUser()

    commit('setUser', { user: user.data.user })
  },
  async modifyUser({ commit }, data) {

    return updateUser(data)
    .then(res => {
        commit('setUser', { user: res.data.user })
      }).catch(err => console.log(err.response))
  }
}

export default {
  namspaced: true,
  state,
  mutations,
  actions
}