import { requests, API_ROOT } from "./index";

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
};

export default hean;