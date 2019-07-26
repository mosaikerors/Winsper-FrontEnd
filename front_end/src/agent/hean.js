import requests from "superagent";
import RNFetchBlob from 'react-native-fetch-blob'
import { API_ROOT } from "./index";

const hean = {
    searchByUId: (viewer, token, owner) =>
        requests.get(API_ROOT + "/hean/cardlist")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', viewer)
            .query({ viewer, owner })
            .then(res => res.body)
            .catch(err => err.response.body),
    getDetailedHean: (uId, token, hId) =>
        requests.get(API_ROOT + "/hean/detailed")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ hId, uId })
            .then(res => res.body)
            .catch(err => err.response.body),
    getAll: (uId, token) =>
        requests.get(API_ROOT + "/hean/all")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
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
};

export default hean;