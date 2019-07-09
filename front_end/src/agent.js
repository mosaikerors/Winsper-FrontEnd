const requests = require('superagent');

const API_ROOT = "http://47.103.0.246:7120"

const user = {
    sendCode: (phone) =>
        requests.post(API_ROOT + "/user/user/sendCode")
            .send({ phone })
            .then(res => res.body)
            .catch(err => err.response.body),
    sigup: (token, phone, code, username, password) =>
        requests.post(API_ROOT + "/user/user/signup")
            .send({ token, phone, code, username, password })
            .then(res => res.body)
            .catch(err => err.response.body),
    firstSignin: (phone, password) =>
        requests.post(API_ROOT + "/user/user/login")
            .send({ phone, password })
            .then(res => res.body)
            .catch(err => err.response.body),
    nextSignin: (uId, token) =>
        requests.post(API_ROOT + "/user/user/login")
            .send({ uId, token })
            .then(res => res.body)
            .catch(err => err.response.body)
}

export default { user }