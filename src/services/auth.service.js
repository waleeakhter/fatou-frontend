import { http } from "../core/http.request";

class AuthService {
  constructor(http) {
    this.request = http;
  }

  /**
   * Post -- Login
   * user login user.email and user.password
   * @param {*} user
   */
  async loginRequest(user) {
    return await this.request
      .post("auth/signin", {
        ...user,
      })
      .then((response) => {
        return response.data;
      });
  }

  /**
   * POST - Register
   * @param  user
   */
  async signupRequest(user) {
    return await this.request
      .post("auth/signup", {
        ...user,
      })
      .then((response) => {
        return response.data;
      });
  }

  /**
   * POST - social signin
   * @param  user
   */
  async socialSigninRequest(data) {
    return await this.request
      .post("auth/social-signin", {
        ...data,
      })
      .then((response) => {
        return response.data;
      });
  }


  /**
   * POST - Forgot password
   * @param  userEmail
   */
  async forgotPasswordRequest(userEmail) {
    return await this.request
      .post("auth/forgot-password", {
        ...userEmail,
      })
      .then((response) => {
        return response.data;
      });
  }

    /**
   * POST - Verify account
   * @param  user
   */
     async verifyRequest(data) {
      return await this.request
        .post("auth/verify", {
          ...data,
        })
        .then((response) => {
          return response.data;
        });
    }

  /**
   * POST - Reset password
   * @param  token
   */
  async resetPasswordTokenRequest(data) {
    return await this.request
      .post(`auth/reset-password/${data.token}`, {
        ...data.data,
      })
      .then((response) => {
        return response.data;
      });
  }
  async verifyTwoFactorAuth(data) {
    return await this.request
      .post(`auth/verify-two-factor-auth`, {
        ...data,
      })
      .then((response) => {
        return response.data;
      });
  }


  
  /**
   * logout
   */
  async logout() {
    return await this.request.post("auth/logout").then((response) => {
      return response.data;
    });
  }
}

export default new AuthService(http);
