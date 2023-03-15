import RecruiterService from '../../services/recruiter.service'

const RecruiterStore = {
  store() {
    return {

    }
  },
  actions:{
    async requestAccess(context, data) {
      try {
        const res = await RecruiterService.requestAccess(data);
        return await Promise.resolve(res.data);
      } catch (err) {
        return await Promise.reject(err);
      }
    }
  }
}

export default RecruiterStore