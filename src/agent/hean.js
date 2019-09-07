import requests from "superagent";
import RNFetchBlob from 'react-native-fetch-blob'
import { API_ROOT } from "./index";

const hean = {
    getPoints: (uId, token, longitude, latitude, follower, time) =>
        requests.get(API_ROOT + "/hean/point/all")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ longitude, latitude, follower, time })
            .then(res => res.body)
            .catch(err => err.response.body),
    getHeanCard: (uId, token, hId) =>
        requests.get(API_ROOT + "/hean/card")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ hId })
            .then(res => res.body)
            .catch(err => err.response.body),
    getHeanCardList: (uId, token, owner) =>
        requests.get(API_ROOT + "/hean/cardlist")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ owner })
            .then(res => res.body)
            .catch(err => err.response.body),
    getCollection: (uId, token, owner) =>
        requests.get(API_ROOT + "/hean/collection")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ owner })
            .then(res => res.body)
            .catch(err => err.response.body),
    getDetailedHean: (uId, token, hId) =>
        requests.get(API_ROOT + "/hean/detailed")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ hId })
            .then(res => res.body)
            .catch(err => err.response.body),
    upload: (uId, token, body) =>
        RNFetchBlob.fetch('POST', API_ROOT + '/hean/upload', {
            Authorization: "Bearer " + token,
            uId: uId.toString(),
            'Content-Type': 'multipart/form-data',
        }, body)
            // res.data is a string, to convert it it a object
            .then(res => JSON.parse(res.data))
            .catch(err => err),
    deleteHean: (uId, token, hId) =>
        requests.delete(API_ROOT + "/hean/delete")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ hId })
            .then(res => res.body)
            .catch(err => err.response.body),
    like: (uId, token, hId) =>
        requests.post(API_ROOT + "/hean/like")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ hId })
            .then(res => res.body)
            .catch(err => err.response.body),
    dislike: (uId, token, hId) =>
        requests.post(API_ROOT + "/hean/dislike")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ hId })
            .then(res => res.body)
            .catch(err => err.response.body),
    comment: (uId, token, hId, content) =>
        requests.post(API_ROOT + "/hean/comment/add")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ hId, content })
            .then(res => res.body)
            .catch(err => err.response.body),
    getComment: (uId, token, owner) =>
        requests.get(API_ROOT + "/hean/comment")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ owner })
            .then(res => res.body)
            .catch(err => err.response.body),
    collect: (uId, token, hId) =>
        requests.post(API_ROOT + "/hean/collect")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ hId })
            .then(res => res.body)
            .catch(err => err.response.body),
    uncollect: (uId, token, hId) =>
        requests.post(API_ROOT + "/hean/uncollect")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ hId })
            .then(res => res.body)
            .catch(err => err.response.body),
    getSelectedSubmissions: (uId, token, date) =>
        requests.get(API_ROOT + "/hean/submission/selected")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ date })
            .then(res => res.body)
            .catch(err => err.response.body),
    getSubmissionsById: (uId, token, owner) =>
        requests.get(API_ROOT + "/hean/submission/list")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ owner })
            .then(res => res.body)
            .catch(err => err.response.body),
    postSubmissions: (uId, token, hId, reason) =>
        requests.post(API_ROOT + "/hean/submission")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ hId, reason })
            .then(res => res.body)
            .catch(err => err.response.body),
};

export default hean;