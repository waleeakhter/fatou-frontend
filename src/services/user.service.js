import { http } from "../core/http.request";
import { storeItem, getItem } from '../core/utils/storage.helper'
import authHeader from "../core/utils/auth.header";

class UserService {
  constructor(http) {
    this.request = http;
  }
  async getUserById(id) {
    return await this.request
      .get(`account/user/${id}`, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  /**
   * PUT - change password
   * @param  data
   */
  async changePasswordRequest(data) {
    return await this.request
      .put( "auth/update-password", { ...data}, { headers: authHeader() } )
      .then((response) => {
        return response.data;
      });
  }

  /**
   * GET - Get auth user
   *
   */
  async getAuthUser() {
    return await this.request
      .get("auth/me", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }



  /**
   * PUT -- update skills
   * @param {*} data
   */
  async updateSkills(data) {
    return await this.request
      .put(
        "account/user/profile/update/skills",
        {
          ...data,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }


  /**
   * PUT -- update profile
   * @param {*} data
   */
   async updateProfile(data) {
     //console.log(data)
    return await this.request
      .post(
        "account/user/profile/update",
        {
          ...data,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  /**
   * PUT -- update address
   * @param {*} data
   */
   async updateAddress(data) {
    return await this.request
      .post(
        "account/user/profile/address/update",
        {
          ...data,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }


  /**
   * PUT -- update profile avatar
   * @param {*} data
   */
   async updateProfileAvatar(data) {
    return await this.request
      .put(
        "account/user/profile/update/avatar",
        data,
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  /**
   * PUT -- update settings
   * @param {*} settings
   */
  async updatePreferences(settings) {
    return await this.request
      .put(
        "account/user/settings/update",
        {
          ...settings,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }


  /**
   * GET -- get settings
   * @param {*} settings
   */
   async getPreferences() {
    return await this.request
      .get(
        "account/user/settings",
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  /**
   * GET -- get user mentorship profile
   * @param {*} data
   */
   async getMentorshipProfile(data) {
    return await this.request
      .get(
        "account/user/work/mentorship",
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  /**
   * PUT -- change work mentorship
   * @param {*} data
   */
  async changeWorkMentorship(data) {
    return await this.request
      .put(
        "account/user/work/mentorship",
        {
          ...data,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  /**
   * PUT -- update work experience
   * @param {*} data
   */
  async editWorkExperience(data) {
    return await this.request
      .post(
        "account/user/work/experience",
        {
          ...data,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }


   /**
   * GET -- get user work experiences
   * @param {*} 
   */
    async getUserAllWorkExperience(id=null) {
    
    
      return await this.request
        .get(
          "account/user/work/experience"+(id?'?id='+id:''),
          { headers: authHeader() }
        )
        .then((response) => {
          return response.data;
        });
    }

  /**
   * PUT -- update single work experience data
   * @param {*} data
   */
  async editSingleWorkExperience(data) {
    return await this.request
      .put(
        `account/user/work/experience/${data._id}`,
        {
          ...data,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }
  
  /**
   * DELETE -- delete work experience
   * @param {*} data
   */
   async deleteWorkExperience(data) {
    return await this.request
      .delete(
        `account/user/work/experience/${data._id}`,
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }


  /**
   * GET -- get  work options data
   * @param {*} data
   */
   async getWorkOptions(id=null) {
    return await this.request
      .get(
        "account/user/work/options"+(id?'?id='+id:''),
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  /**
   * PUT -- update single work experience data
   * @param {*} data
   */
  async editWorkOptions(data) {
    return await this.request
      .put(
         "account/user/work/options",
          data,
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  /**
   * PUT -- pause account
   * @param {*} data
   */
   async pauseAccount(data) {
    return await this.request
      .put(
         "account/user/safety/account/pause",
          data,
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  /**
   * PUT -- pause account
   * @param {*} data
   */
   async deleteAccount(data) {
    return await this.request
      .put(
         "account/user/safety/account/delete",
          data,
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  async getFilterData() {
    return await this.request
      .get('data/provider/general')
      .then(res => {
        return res.data.data
      });
  }
  async sendInterviewMessage(data){

      return  this.request.post('/chat/interview-message', data,{ headers : authHeader()  })
      .then((res)=>res)
      .catch((err)=>{throw new Error(err)})
   
  }
  async reportUser(data){
   
      return  this.request.post('/reports', data,{ headers : authHeader()  })
      .then((res)=>res)
      .catch((err)=>{throw new Error(err)})
    
   
  }
  
}

export default new UserService(http);
