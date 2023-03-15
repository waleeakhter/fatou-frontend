import UsersService from "../../services/users.service";

const usersStore = {
    state() {
        connections: []
    },
    actions: {
        async addConnection(context, id) {
            try {
                const res = await UsersService.addConnection(id);
                return await Promise.resolve(res);
            } catch (err) {
                return await Promise.resolve(err)
            }
        }
    }
}

export default usersStore;