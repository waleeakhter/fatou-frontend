import authService from "../../services/auth.service";
import userService from "../../services/user.service";

import { storeItem, getItem } from "../../core/utils/storage.helper";

// check authenticated
const isAuthenticated = getItem("_dsa") ? true : false;
const currentUser = getItem("_dsa");

const chatStore = {
  state() {
    return {
     activeChatUser:null,
     totalUnread:0
      
    };
  },
  actions: {
    async setActiveChatUser(context, data) {
      console.log('setActiveChatUser data',data)
      try { 
       
        if(currentUser.user.hideMode){
          
          context.commit('SET_ACTIVE_CHAT_USER',null)
         
         return await Promise.reject({error:"Please disable hidemode for chat"});
        }


        console.log('setActiveChatUser else')
        context.commit('SET_ACTIVE_CHAT_USER',null)
        setTimeout(async () => {
          context.commit('SET_ACTIVE_CHAT_USER',data)
          return await Promise.resolve(data);  
        }, 500);
        
      } catch (error) {
        console.log(error)
        return await Promise.reject(error);
      }
    },

    async setTotalUnread(context,data){
      try {
        context.commit('SET_TOTAL_UNREAD',data)
        return await Promise.resolve(data);
      } catch (error) {
        return await Promise.reject(error);
        
      }
    },
    async unsetUser(context){
      context.commit('SET_ACTIVE_CHAT_USER',false)
      return await Promise.resolve(true);  
    }
   
  },
  mutations: {
    SET_ACTIVE_CHAT_USER(state, data){
        state.activeChatUser = data
        
      },
    SET_TOTAL_UNREAD(state,data){
      console.log(data)
      state.totalUnread=data
    }
  }
};

export default chatStore;
