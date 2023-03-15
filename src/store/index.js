import { createStore } from "vuex";
import authStore from "./modules/auth.store";
import userStore from "./modules/user.store";
import vcsStore from "./modules/vcs.store";
import founderStore from "./modules/founder.store";
import buzzStore from "./modules/buzz.store";
import usersStore from "./modules/users.store";
import recruiterStore from './modules/recruiter.store'
import chatStore from "./modules/chat.store.js"

// store instance.
const Store = createStore({
    modules: {
        auth: authStore,
        user: userStore,
        vcs: vcsStore,
        founder: founderStore,
        buzz: buzzStore,
        users: usersStore,
        recruiters: recruiterStore,
        chat:chatStore,
    },
});

export default Store;