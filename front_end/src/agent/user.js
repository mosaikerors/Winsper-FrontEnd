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
    updateUsername: (uId, username, token) => ({ message: "ok", newUsername: username })
    /*    requests.put(API_ROOT + "/user/updateInfo")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ uId, username })
            .then(res => res.body)
            .catch(err => err.response.body),*/,
    updateAvatar: (uId, token, avatar) => ({ rescode: 0 }),
    modifyPassword: (uId, token, password) => ({ rescode: 0 }),
    sendCodeWhenForget: (phone) => ({ rescode: 0 }),
    modifyPasswordWhenForget: (token, phone, code, password) => ({ rescode: 0 }),
    check: (uId, token) => 
     requests.post(API_ROOT + "/user/check")
         .set('Authorization', 'Bearer ' + token)
         .set('uId', uId)
         .then(res => res.body)
         .catch(err => err.response.body),
    follow: (uId, token, targetUId) => ({ rescode: 0 }),
    unfollow: (uId, token, targetUId) => ({ rescode: 0 }),
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