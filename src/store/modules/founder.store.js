import FounderService from "../../services/founders.service";
const founderStore = {
  actions: {
    async createFounder({ commit }, data) {
      try {
        const response = await FounderService.createFounder(data);

        return await Promise.resolve(response.data);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async updateFounder({ commit }, data, id) {
      try {
        const response = await FounderService.updateFounder(data, id);
        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async claimCompany({ commit }, id) {
      try {
        const response = await FounderService.claimCompany(id);
        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async getFounder({ commit },data) {
      try {
        const response = await FounderService.getFounder(data);

        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },
    async filterFounder({ commit }, query) {
      try {
        const response = await FounderService.filterFounder(query);

        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },
    async saveFounders({ commit }, data) {
      commit("STORE_FOUNDER", data);
    },
  },
    mutations: {
      STORE_FOUNDER(state, data) {
        state.founders = data;
      },
  },
};
export default founderStore;
