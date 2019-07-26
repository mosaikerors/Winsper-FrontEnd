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