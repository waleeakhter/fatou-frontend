import authService from "../../services/auth.service";
import userService from "../../services/user.service";

import { storeItem, getItem } from "../../core/utils/storage.helper";

// check authenticated
const isAuthenticated = getItem("_dsa") ? true : false;
const data = getItem("_dsa");

const userData = data.user;
const seekingSearchAccess=data.seekingSearchAccess;
const authStore = {
  state() {
    return {
      userReg: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
      },
      userLogin: {
        email: "",
        password: "",
      },
      isRecruiter: true,
      currentUser: userData ?? null,
      isAuthenticated: isAuthenticated,
      successMessage: null,
      errorMessage: null,
      seekingSearchAccess:seekingSearchAccess??false
    };
  },
  actions: {
    async userLogin(context, data) {
      try { 
        const response = await authService.loginRequest(data);
        if(response.twoFactorAuth){
          localStorage.setItem('userEmail',data.email)
           return await Promise.resolve(response);
        }
        if (response.token && response.data) {
          storeItem("_dsa", {user: response.data, rsa: response.token, isRecruiter: response.isRecruiter,seekingSearchAccess:response.seekingSearchAccess});
          context.commit("SET_RECRUITER_ROLE", response.isRecruiter);
          context.commit("STORE_USER_PROFILE_DATA", response.data);
          context.commit("SET_SEEKING_SEARCH_ACCESS", response.seekingSearchAccess);
        }
        return await Promise.resolve(response.data);
      } catch (error) {
        
        return await Promise.reject(error);
      }
    },
    async userRegister(context, data) {
      try {
        const response = await authService.signupRequest(data);
        if (response.token && response.data) {
          // storeItem("_dsa", {user: response.data, rsa: response.token});
          // context.commit("STORE_USER_PROFILE_DATA", response.data);
        }
        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async changePassword(context, data) {
      try {
        const response = await userService.changePasswordRequest(data);
        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async socialSigninRequest(context, data) {
      try {
        const response = await authService.socialSigninRequest(data);
        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async getAuthUser(context) {
      try {
        const response = await userService.getAuthUser();
        var data = getItem("_dsa")
        data.user = response.data.user
        data.seekingSearchAccess=response.data.seekingSearchAccess
        storeItem("_dsa", data);
        context.commit("SET_SEEKING_SEARCH_ACCESS", response.data.seekingSearchAccess);
        context.commit("STORE_USER_PROFILE_DATA", data.user);
        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async forgotPassword(context, email) {
      try {
        const response = await authService.forgotPasswordRequest(email);
        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async resetPasswordToken(context, data) {
      try {
        const response = await authService.resetPasswordTokenRequest(data);
        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async verifyUser(context, data) {
      try {
        const response = await authService.verifyRequest(data);
        if (response.token && response.data) {
          storeItem("_dsa", {user: response.data, rsa: response.token});
          context.commit("STORE_USER_PROFILE_DATA", response.data);
        }
        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async logout(context, data) {
      try {
        const response = await authService.logout(data);
        return await Promise.resolve(response);
      } catch (error) {
        return await Promise.reject(error);
      }
    },

    async verifyTwoFactorAuth(context,data){
      
      try { 
        const response = await authService.verifyTwoFactorAuth(data);
        if (response.token && response.data) {
          storeItem("_dsa", {user: response.data, rsa: response.token, isRecruiter: response.isRecruiter,seekingSearchAccess:response.seekingSearchAccess});
          context.commit("SET_RECRUITER_ROLE", response.isRecruiter);
          context.commit("STORE_USER_PROFILE_DATA", response.data);
          context.commit("SET_SEEKING_SEARCH_ACCESS", response.seekingSearchAccess);
        }
        return await Promise.resolve(response.data);
      } catch (error) {
        
        return await Promise.reject(error);
      }
    }
  },
  mutations: {
      STORE_USER_PROFILE_DATA(state, data){
        state.currentUser = data
      },
      LOGOUT_USER(state, data){
        state.currentUser = null
        state.isAuthenticated = false
      },
      SET_RECRUITER_ROLE(state, isRecruiter) {
        // console.log(isRecruiter);
        state.isRecruiter = true;
        // debugger
      },
      SET_SEEKING_SEARCH_ACCESS(state, seekingSearchAccess) {
        state.seekingSearchAccess=seekingSearchAccess
      }
  }
};

export default authStore;
