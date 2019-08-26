import requests from "superagent";
import RNFetchBlob from 'react-native-fetch-blob'
import { API_ROOT } from "./index";

const hean = {
    getPoints: (uId, token, latitude, longitude) => ({
        rescode: 0,
        heans: []
    })
        /*requests.get(API_ROOT + "/hean/point/all")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ latitude, longitude })
            .then(res => res.body)
            .catch(err => err.response.body)*/,
    getHeanCard: (uId, token, hId) => ({
        rescode: 0,
        heanCard: {
            hId: 1, cover: "https://images.pexels.com/photos/1935220/pexels-photo-1935220.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            text: "hello, world!", hasLiked: true, hasStarred: false, likeCount: 5, starCount: 2, commentCount: 1
        }
    })
        /*requests.get(API_ROOT + "/hean/card")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ hId })
            .then(res => res.body)
            .catch(err => err.response.body)*/,
    getHeanCardList: (viewer, token, owner) => ({
        rescode: 0,
        heanCards: [{
            hId: 1, cover: "https://images.pexels.com/photos/1935220/pexels-photo-1935220.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            text: "hello, world!", hasLiked: true, hasStarred: false, likeCount: 5, starCount: 2, commentCount: 1
        }, {
            hId: 2, cover: "https://images.pexels.com/photos/1935220/pexels-photo-1935220.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            text: "hello, world!", hasLiked: true, hasStarred: false, likeCount: 5, starCount: 2, commentCount: 1
        }]
    })
       /* requests.get(API_ROOT + "/hean/cardlist")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', viewer)
            .query({ viewer, owner })
            .then(res => res.body)
            .catch(err => err.response.body)*/,
    getCollection: (uId, token, owner) => hean.getHeanCardList(1, 2, 3)
            /*requests.get(API_ROOT + "/hean/collection")
                .set('Authorization', 'Bearer ' + token)
                .set('uId', uId)
                .query({ owner })
                .then(res => res.body)
                .catch(err => err.response.body)*/,
    getDetailedHean: (uId, token, hId) => ({
        rescode: 0,
        hean: {
            hId: 1, uId: 2, avatar: "https://images.pexels.com/photos/1935220/pexels-photo-1935220.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            username: "tbc", createdTime: 2222222,
            pictures: ["https://images.pexels.com/photos/1935220/pexels-photo-1935220.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"],
            comments: [{ commentId: 1, commenter: "tbc", commented: "qwer", time: 333333, content: "great" },
            { commentId: 2, commenter: "tbc", commented: "qwer2", time: 345333, content: "great2" }]
        }
    })
        /*requests.get(API_ROOT + "/hean/detailed")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ hId, uId })
            .then(res => res.body)
            .catch(err => err.response.body)*/,
    upload: (uId, token, body) =>
        RNFetchBlob.fetch('POST', API_ROOT + '/hean/upload', {
            Authorization: "Bearer " + token,
            uId: uId.toString(),
            'Content-Type': 'multipart/form-data',
        }, body)
            // res.data is a string, to convert it it a object
            .then(res => JSON.parse(res.data))
            .catch(err => err),
    deleteHean: (uId, token, hId) => ({ rescode: 0 }),
    like: (uId, token, hId) => ({ rescode: 0 }),
    dislike: (uId, token, hId) => ({ rescode: 0 }),
    comment: (uId, token, hId, targetCommentId, content) => ({ rescode: 0 }),
    getComment: (uId, token, owner) => ({
        rescode: 0, comments: [
            { isComment: true, username: "tbc", content: "nb", time: "2019-8-1", hId: 1 },
            { isComment: false, username: "tbc", content: "great", time: "2019-7-31", hId: 1 },
        ]
    }),
    /*requests.get(API_ROOT + "/hean/comment")
        .set('Authorization', 'Bearer ' + token)
        .set('uId', uId)
        .query({ owner })
        .then(res => res.body)
        .catch(err => err.response.body)*/
    collect: (uId, token, hId) => ({ rescode: 0 }),
    uncollect: (uId, token, hId) => ({ rescode: 0 }),
    getSelectedSubmissions: (uId, token) => ({ rescode: 0 }),
    getSubmissionsById: (uId, token, owner) => ({ rescode: 0 }),
    postSubmissions: (uId, token, hId, reason) => ({ rescode: 0 })
};

export default hean;