import requests from "superagent";
import { API_ROOT } from "./index";

const record = {
    getJournalBooks: (uId, token, owner) => ({
        rescode: 0,
        journalBooks: [{ journalBookId: 1, name: "vacation", coverId: 1 }, { journalBookId: 2, name: "study", coverId: 2 }]
    }),
    getJournals: (uId, token, journalBookId) =>
        ({
            rescode: 0, journals: [
                { journalId: 1, journalUrl: "https://res.cloudinary.com/dxm8ocsto/image/upload/v1564538927/tuplmj8gqjdw3j8p2gd0.jpg" },
                { journalId: 2, journalUrl: "https://res.cloudinary.com/dxm8ocsto/image/upload/v1564537902/klvnxpi6369t2lluilzi.jpg" }
            ]
        }),
    createJournal: (uId, token, journalBookId, journalUrl) => ({ rescode: 0 }),
    getMessageList: (uId, token) => ({
        rescode: 0, messages: [{ type: 1, uId: 1, username: "tbc", hasRead: false, time: "2019-7-29 6=4:13 p.m." },
        { type: 4, uId: 1, username: "tbc", hId: "1", text: "123", hasRead: true, time: "2019-7-29 6:53 p.m." }]
    })
        /*requests.get(API_ROOT + "/record/message")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .then(res => res.body)
            .catch(err => err.response.body)*/,
    getMessageDetail: (uId, token, type) => ({
        rescode: 0, messages: [{ messageId: 12, uId: 1, username: "tbc", hasRead: true, time: "2019-7-29" }
            , { messageId: 11, uId: 1, username: "tbc", hasRead: false, time: "2019-7-29", text: "werwr" }]
    }),
    getDiaryList: (uId, token, owner) => ({
        rescode: 0, diaries: [{ diaryId: 1, title: "哈哈", time: 123 }, {
            diaryId: 2, title: "hahaha", time: 234
        }]
    }),
    getDiaryDetail: (uId, token, diaryId) => ({ rescode: 0, title: "hahaha", username: "tbc", time: 123, text: "123456" }),
    createDiary: (uId, token, title, text) => ({ rescode: 0 })
};

export default record;