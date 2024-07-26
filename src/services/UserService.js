// import axios from 'axios';
import axios from "./customize-axios";

const fectchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
       
}
const postCreateUser = (name, job) => {
    return axios.post("api/users", {name, job})
}

// const putUpdateUser = (name, job) => {
//     return axios.put("api/users", {name, job})
// }
const putUpdateUser = (id, name, job) => {
    return axios.put(`/api/users/${id}`, { name, job });
};
export  {fectchAllUser, postCreateUser, putUpdateUser};
//export dưới dạng obj để có thể export bao nhiêu biến cũng đc