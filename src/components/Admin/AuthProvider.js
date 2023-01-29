import axios from "axios";

export const authProvider = {
    login: async ({ username, password }) => {
        const information = {
            username : username,
            password: password
        }
        const url = "https://unplug-server.herokuapp.com/admin/authenticate"
        const response = await axios.post(url, information, {
            headers:{
                "authorization":localStorage.getItem("Token")
            }
        })
        console.log(response)
        if (response.data.auth === false) {
            return Promise.reject();
        }
        sessionStorage.setItem('adminToken', response.data.adminToken);
        return Promise.resolve();
    },
    logout: () => {
        sessionStorage.removeItem('adminToken');
        return Promise.resolve();
    },
        checkAuth: () =>
        sessionStorage.getItem('adminToken') ? Promise.resolve() : Promise.reject(),
    checkError:  (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            sessionStorage.removeItem('adminToken');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    getIdentity: (test) =>
        Promise.resolve({
            id: 'user',
            fullName: test,
        }),
    getPermissions: () => Promise.resolve(''),
};

export default authProvider;