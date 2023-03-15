import VcsService from "../../services/vcs.service";

const vcsStore = {
  state() {
    return {
      vcs: [],
    };
  },
  actions: {
    async createVcs({ commit }, data) {
      try {
        const response = await VcsService.createVcs(data);
        return await Promise.resolve(response.data);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async updateVcs({ commit }, data, id) {
      try {
        const response = await VcsService.updateVcs(data, id);
        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async getVcs({ commit }) {
      try {
        const response = await VcsService.getVcs();

        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },
    async filterVcs({ commit }, query) {
      try {
        const response = await VcsService.filterVcs(query);

        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },
    async saveVcs({ commit }, data) {
      commit("STORE_VC", data);
    },
  },
  mutations: {
    STORE_VC(state, data) {
      state.vcs = data;
    },
  },
};
export default vcsStore;
