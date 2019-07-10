const requests = require('superagent');

const API_ROOT = "http://47.103.0.246:7120"

const user = {
    sendCode: (phone) =>
        requests.post(API_ROOT + "/user/sendCode")
            .send({ phone })
            .then(res => res.body)
            .catch(err => err.response.body),
    sigup: (token, phone, code, username, password) =>
        requests.post(API_ROOT + "/user/signup")
            .send({ token, phone, code, username, password })
            .then(res => res.body)
            .catch(err => err.response.body),
    firstSignin: (phone, password) =>
        requests.post(API_ROOT + "/user/login")
            .send({ phone, password })
            .then(res => res.body)
            .catch(err => err.response.body),
    nextSignin: (uId, token) =>
        requests.post(API_ROOT + "/user/login")
            .send({ uId, token })
            .then(res => res.body)
            .catch(err => err.response.body),
    updateInfo: (uId, username, token) =>
        requests.post(API_ROOT + "/user/updateInfo")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ uId, username })
            .then(res => res.body)
            .catch(err => err.response.body)
}

const hean = {
    searchByUId: (uId, token) =>
        requests.post(API_ROOT + "/hean/byUId")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ uId })
            .then(res => res.body)
            .catch(err => err.response.body)
}

export default { user,hean }