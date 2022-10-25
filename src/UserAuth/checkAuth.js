import axios from "axios";

export const authCheck = () => {
    const URL = 'https://tender-glasses-bat.cyclic.app/authtest'
    return axios.get(`${URL}`, {
        headers: {
            "authorization": localStorage.getItem("Token")
        }
    })
}
