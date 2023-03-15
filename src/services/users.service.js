import { http } from "../core/http.request";
import authHeader from "../core/utils/auth.header";

class UsersService {
  constructor(http) {
    this.request = http
  }


  /** 
   * GET -- get suggestions
   * @param {*} data
   * @returns user suggestions
   */
  async getConnectSuggestions() {
    return await this.request
      .get('/people/suggestions', { headers : authHeader() })
      .then((res) => {
        return res.data.data.suggestions;
      });
  }

  async addConnectionRequest(data) {
    return await this.request
      .post('/connection-request', data,{ headers : authHeader() })
  }
  async removeConnectionRequest(data) {
    return await this.request
      .delete('/connection-request/remove',{ headers : authHeader(),data })
  }

  async acceptConnection(id,data) {
    return await this.request
      .patch('/connection-request/'+id,data,{ headers : authHeader(), })
  }

  async getFilterData(data) {
    const { searchQuery, country, state, industry, sector, education, experience, seeking,skills } = data;
    return await this.request
      .get('/people', { headers : authHeader() , params: {
        q: searchQuery,
        country,
        state,
        industry,
        sector,
        education,
        experience,
        seeking,
        skills
      }})
      .then(res => {
        console.log(res)
        return res.data.data
      });
  }

  async sendChatFiles(data) {
  
    return  this.request
      .post("chat/files", data,{ headers: authHeader() })
      .then((response) => {
        return response.data;
      }).catch((error)=>{
        return error
      })
  }

  async getConnectionRequests({limit,page,to,from,status}){
    try {
       return await this.request.get('/connection-request', 
        { 
            headers : authHeader(),
            params:{
                limit,
                page,
                to,
                from,
                status
            }
        })
    } catch (error) {
        return error
    }

  }

  async getConnections({limit,page,user,q}){
    try {
      return await this.request.get('/connection', 
       { 
           headers : authHeader(),
           params:{
               limit,
               page,
               user,
               q
           }
       })
   } catch (error) {
       return error
   }
  }

  async blockConnection(id){
    try {
      return await this.request.patch('/connection/block',
      {
        id:id
      }, 
       { headers : authHeader()})
   } catch (error) {
       return error
   }
  }
  
  async unblockConnection(id){
    try {
      return await this.request.patch('/connection/unblock',
      {
        id:id
      }, 
       { headers : authHeader()})
   } catch (error) {
       return error
   }
  }

  
  async getBlockedConnections({limit,page,user}){
    try {
      return await this.request.get('/connection/block' , 
       {
          headers : authHeader(),
          params:{
            limit,
            page,
            user
        }
      })
   } catch (error) {
       return error
   }
  }
  async removeConnection(id){
    try {
      return await this.request.delete('/connection/'+id, { headers : authHeader()  })
   } catch (error) {
       return error
   }
  }

  async deleteChat(chatUserId){
    try {
      return await this.request.delete('/chat/user/'+chatUserId, { headers : authHeader()  })
   } catch (error) {
       return error
   }
  }

  async blockConnectionByFriendId(id){
    try {
      return await this.request.patch('/connection/block/friend/'+id, {},{ headers : authHeader()  })
   } catch (error) {
       return error
   }
  }


  

}

export default new UsersService(http);
