import axios from "axios";

export const authCheck = () => {
    const URL = 'https://unplug-server.herokuapp.com/authtest'
    return axios.get(`${URL}`, {
        headers: {
            "authorization": localStorage.getItem("Token")
        }
    })
}
