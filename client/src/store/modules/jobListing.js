import { getJobListings, getUserListings } from "../../api/listings";

const state = () => ({
  jobListings: {},
  userListings: {},
});

const mutations = {
  setJobListings(state, {listings}) {
    state.jobListings = listings
  },

  setUserJobListings(state, {listings}) {
    state.userListings = listings
  }
};

const actions = {
  async fetchJobListings({commit}, payload){
    const listings = await getJobListings(payload.page, payload.search,payload.limit);

    commit('setJobListings', { listings: listings.data });
  },

  async fetUserJobListings({commit}, payload){
    const listings = await getUserListings(payload.page, payload.search, payload.limit);

    commit('setUserJobListings', { listings: listings.data })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
