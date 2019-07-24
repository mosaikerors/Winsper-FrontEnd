const requests = require('superagent');

const API_ROOT = "http://202.120.40.8:30525";

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
    updateInfo: (uId, username, token) => ({ message: "ok", newUsername: username })
    /*    requests.put(API_ROOT + "/user/updateInfo")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ uId, username })
            .then(res => res.body)
            .catch(err => err.response.body),*/,
    check: (uId, token) =>
        requests.post(API_ROOT + "/user/check")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .then(res => res.body)
            .catch(err => err.response.body),
};

const hean = {
    searchByUId: (viewer, token, owner) =>
        requests.get(API_ROOT + "/hean/cardlist")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', viewer)
            .query({ viewer,owner })
            .then(res => res.body)
            .catch(err => err.response.body),
    getDetailedHean: (uId, token, hId) =>
        requests.get(API_ROOT + "/hean/detailed")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ hId,uId })
            .then(res => res.body)
            .catch(err => err.response.body),
    getAll: (uId, token) =>
        requests.get(API_ROOT + "/hean/all")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .then(res => res.body)
            .catch(err => err.response.body),
};

export default { user, hean }