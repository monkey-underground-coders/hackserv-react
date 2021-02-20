import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://95.216.137.74:8080/hackserv-spring/',
})

export const signupPost = (userEmail, userPassword) => {
    instance.post('user/create', { 
        email: userEmail,
        password: userPassword,
 }).then(res => {
    console.log(res);
    console.log(res.email);
  });
}
