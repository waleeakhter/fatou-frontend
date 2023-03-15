import { http } from "../core/http.request";
import authHeader from "../core/utils/auth.header";

class NotificationService{
    constructor(http){
        this.request=http
    }

    async createNotification(data){
        try {
           return await this.request.post(`/notifications`,
           data, 
           { headers : authHeader()} )
        } catch (error) {
            return error
            console.log(error)
        }
    }
    async getNotifications(params){
        let queryString =Object.keys(params).map(key => key + '=' + params[key]).join('&');
        try {
           return await this.request.get(`/notifications?limit=10&page=1&${queryString}`,
           { headers : authHeader()} )
        } catch (error) {
            console.log(error)
            return error
        }

    }
    async markRead(id){
        try {
           return await this.request.patch(`/notifications/mark-read/${id}`,{},
           { headers : authHeader()} )
        } catch (error) {
            console.log(error)
            return error
        }

    }
}



export default new NotificationService(http);