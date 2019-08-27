import requests from "superagent";
import { API_ROOT } from "./index";

const togglePrivacy = (uId, token, toBePublic, uri) =>
    requests.put(API_ROOT + `/user/privacy/${uri}`)
        .set('Authorization', 'Bearer ' + token)
        .set('uId', uId)
        .send({ toBePublic })
        .then(res => res.body)
        .catch(err => err.response.body)

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
    getMyInfo: (uId, token) =>
        requests.get(API_ROOT + "/user/info/me")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .then(res => res.body)
            .catch(err => err.response.body),
    getOthersInfo: (uId, token, otherUId) =>
        requests.get(API_ROOT + "/user/info")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ uId: otherUId })
            .then(res => res.body)
            .catch(err => err.response.body),
    updateAvatar: (uId, token, avatar) =>
        requests.put(API_ROOT + "/user/avatar/update")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ avatar })
            .then(res => res.body)
            .catch(err => err.response.body),
    updateUsername: (uId, token, username) =>
        requests.put(API_ROOT + "/user/username/update")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ username })
            .then(res => res.body)
            .catch(err => err.response.body),
    modifyPassword: (uId, token, password) =>
        requests.put(API_ROOT + "/user/password/update")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ password })
            .then(res => res.body)
            .catch(err => err.response.body),
    sendCodeWhenForget: (phone) =>
        requests.post(API_ROOT + "/user/forget/sendCode")
            .send({ phone })
            .then(res => res.body)
            .catch(err => err.response.body),
    modifyPasswordWhenForget: (token, phone, code, password) =>
        requests.post(API_ROOT + "/user/forget/update")
            .send({ token, phone, code, password })
            .then(res => res.body)
            .catch(err => err.response.body),
    check: (uId, token) =>
        requests.put(API_ROOT + "/user/check")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .then(res => res.body)
            .catch(err => err.response.body),
    follow: (uId, token, targetUId) =>
        requests.post(API_ROOT + "/user/follow")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ targetUId })
            .then(res => res.body)
            .catch(err => err.response.body),
    unfollow: (uId, token, targetUId) =>
        requests.post(API_ROOT + "/user/unfollow")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ targetUId })
            .then(res => res.body)
            .catch(err => err.response.body),
    getMutualFollow: (uId, token) =>
        requests.get(API_ROOT + "/user/followlist/mutual")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .then(res => res.body)
            .catch(err => err.response.body),
    getFollowings: (uId, token) =>
        requests.get(API_ROOT + "/user/followlist/followings")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .then(res => res.body)
            .catch(err => err.response.body),
    getFollowers: (uId, token) =>
        requests.get(API_ROOT + "/user/followlist/followers")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .then(res => res.body)
            .catch(err => err.response.body),
    toggleMessagePrivacy: (uId, token, toBePublic) => togglePrivacy(uId, token, toBePublic, "message"),
    toggleHeanPrivacy: (uId, token, toBePublic) => togglePrivacy(uId, token, toBePublic, "hean"),
    toggleCollectionPrivacy: (uId, token, toBePublic) => togglePrivacy(uId, token, toBePublic, "collection"),
    toggleDiaryPrivacy: (uId, token, toBePublic) => togglePrivacy(uId, token, toBePublic, "diary"),
    toggleJournalPrivacy: (uId, token, toBePublic) => togglePrivacy(uId, token, toBePublic, "journal"),
    toggleSubmissionPrivacy: (uId, token, toBePublic) => togglePrivacy(uId, token, toBePublic, "submission"),
    toggleMoodReportPrivacy: (uId, token, toBePublic) => togglePrivacy(uId, token, toBePublic, "moodReport"),
    toggleCommentPrivacy: (uId, token, toBePublic) => togglePrivacy(uId, token, toBePublic, "comment"),
};

export default user;