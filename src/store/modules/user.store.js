// import { storeItem, getItem } from "../../core/utils/storage.helper";
import userService from '../../services/user.service'

const userStore = {
    state() {
        return {
            userExperiences: [],
            userMentorShipOptions: {},
            userWorkOptions: {},
            settings: {}
        };
    },
    actions: {
        async updateProfile(context, data) {
            try {
                const response = await userService.updateProfile(data);
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        async updateAddress(context, data) {
            try {
                const response = await userService.updateAddress(data);
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        async updateSkills(context, data) {
            try {
                const response = await userService.updateSkills(data);
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        async updateProfileAvatar(context, data) {
            try {
                const response = await userService.updateProfileAvatar(data);
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        async updatePreferences(context, settings) {
            try {
                const response = await userService.updatePreferences(settings);
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        async getPreferences(context) {
            try {
                const response = await userService.getPreferences();
                var settings = response.data.userPreferences;
                if (response.data && response.data.userPreferences) {
                    context.commit('STORE_USER_PREFERENCES', settings);
                }
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        async getMentorshipProfile(context) {
            try {
                const response = await userService.getMentorshipProfile();
                if (response.data != null && response.data.mentorshipProfile != null) {
                    context.commit('STORE_USER_MENTORSHIP_OPTIONS', response.data.mentorshipProfile);
                }
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },


        async changeWorkMentorship(context, data) {
           
            try {
                const response = await userService.changeWorkMentorship(data);
                return await Promise.resolve(response); 
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        async getUserWorkExperiences(context,id=null) {
           
            try {
                const response = await userService.getUserAllWorkExperience(id);
                
                if (!id && response.data != null && response.data.experiences.length >= 1) {
                    context.commit('STORE_USER_WORK_EXPERIENCES', response.data.experiences);
                }

                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        async editWorkExperience(context, data) {
            try {
                const response = await userService.editWorkExperience(data);
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        async editSingleWorkExperience(context, data) {
            try {
                const response = await userService.editSingleWorkExperience(data);
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        async deleteWorkExperience(context, data) {
            try {
                const response = await userService.deleteWorkExperience(data);
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        async getWorkOptions(context) {
            try {
                const response = await userService.getWorkOptions();
                console.log();
                if (response.data != null && response.data.workOption != null) {
                    context.commit('STORE_USER_WORK_OPTIONS', response.data.workOption);
                }
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        async editWorkOptions(context, data) {
            try {
                const response = await userService.editWorkOptions(data);
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        // safety
        async pauseAccount(context, data) {
            try {
                const response = await userService.pauseAccount(data);
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },

        async deleteAccount(context, data) {
            try {
                const response = await userService.deleteAccount(data);
                return await Promise.resolve(response);
            } catch (error) {
                return await Promise.reject(error);
            }
        },
    },
    mutations: {
        STORE_USER_PREFERENCES(state, data) {
            state.settings = data
        },
        STORE_USER_WORK_EXPERIENCES(state, data) {
            state.userExperiences = data
        },
        STORE_USER_MENTORSHIP_OPTIONS(state, data) {
            state.userMentorShipOptions = data
        },
        STORE_USER_WORK_OPTIONS(state, data) {
            state.userWorkOptions = data
        }
    }
};

export default userStore;