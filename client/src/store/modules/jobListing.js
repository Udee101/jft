import { getJobListings, getUserListings } from "../../api/listings";

const state = () => ({
  jobListings: {},
  userListings: [],
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
  async fetchJobListings({commit}){
    const listings = await getJobListings();

    commit('setJobListings', { listings: listings.data.listings });
  },

  async fetUserJobListings({commit}){
    const listings = await getUserListings();

    commit('setUserJobListings', {listings: listings.data.listings})
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}