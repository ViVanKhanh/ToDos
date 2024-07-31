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

const deleteUser = (id) => {
    return axios.delete(`/api/user/${id}`);
}

const loginApi = (email, password) => {
    return axios.post("/api/login", {email, password});
}

export  {fectchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi};
//export dưới dạng obj để có thể export bao nhiêu biến cũng đc