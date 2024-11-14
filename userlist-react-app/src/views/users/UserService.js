import axios from "axios";
import { API_URL } from "../../Const";

const getAll = (page=1, size=6) => {
    return axios.get(`${API_URL}/users?page=${page}&per_page=${size}`);
}
const save = () => {}

export default { getAll, save }