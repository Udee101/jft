import { createStore } from "vuex";
import user from "./modules/user";
import jobListing from "./modules/jobListing"

export default createStore({
  modules:{
    user,
    jobListing
  }
}); 