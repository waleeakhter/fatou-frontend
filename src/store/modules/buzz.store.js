import BuzzService from "../../services/buzz.service";

const buzzStore = {
  state() {
    return {
      buzz: [],
    };
  },
  actions: {
    async createBuzz({ commit }, data) {
      try {
        const response = await BuzzService.createBuzz(data);
        return await Promise.resolve(response.data);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async editBuzz({ commit }, data, id) {
      try {
        const response = await BuzzService.editBuzzPost(data, id);
        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async getAllBuzz({ commit }) {
      try {
        const response = await BuzzService.getAllFeeds();

        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },
    async getSingleFeed({ commit }, buzzId) {
      try {
        const response = await BuzzService.getSingleFeed(buzzId);

        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },
    async saveBuzz({ commit }, data) {
      commit("STORE_BUZZ", data);
    },
  },
  mutations: {
    STORE_BUZZ(state, data) {
      state.buzz = data;
    },
  },
};
export default buzzStore;
