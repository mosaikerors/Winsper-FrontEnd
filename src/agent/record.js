import requests from "superagent";
import { API_ROOT } from "./index";

const record = {
    getJournalBooks: (uId, token, owner) =>
        requests.get(API_ROOT + "/record/journal/books")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ owner })
            .then(res => res.body)
            .catch(err => err.response.body),
    getJournals: (uId, token, journalBookId) =>
        requests.get(API_ROOT + "/record/journal")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ journalBookId })
            .then(res => res.body)
            .catch(err => err.response.body),
    createJournal: (uId, token, journalBookId, journalUrl) =>
        requests.post(API_ROOT + "/record/journal")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ journalBookId, journalUrl })
            .then(res => res.body)
            .catch(err => err.response.body),
    deleteJournal: (uId, token, journalBookId, journalId) =>
        requests.delete(API_ROOT + "/record/journal")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ journalBookId, journalId })
            .then(res => res.body)
            .catch(err => err.response.body),
    createJournalBook: (uId, token, name, coverId) =>
        requests.post(API_ROOT + "/record/journal/books")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ name, coverId })
            .then(res => res.body)
            .catch(err => err.response.body),
    deleteJournalBook: (uId, token, journalBookId) =>
        requests.delete(API_ROOT + "/record/journal/books")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ journalBookId })
            .then(res => res.body)
            .catch(err => err.response.body),
    getMessageList: (uId, token) =>
        requests.get(API_ROOT + "/record/message/list")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .then(res => res.body)
            .catch(err => err.response.body),
    getMessageDetail: (uId, token, type) =>
        requests.get(API_ROOT + "/record/message/detailed")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ type })
            .then(res => res.body)
            .catch(err => err.response.body),
    readSingleMessage: (uId, token, messageId) =>
        requests.put(API_ROOT + "/record/message/hasRead/single")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ messageId })
            .then(res => res.body)
            .catch(err => err.response.body),
    readAll: (uId, token) =>
        requests.put(API_ROOT + "/record/message/hasRead/all")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .then(res => res.body)
            .catch(err => err.response.body),
    deleteMessage: (uId, token, type) =>
        requests.delete(API_ROOT + "/record/message")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ type })
            .then(res => res.body)
            .catch(err => err.response.body),
    getDiaryList: (uId, token, owner) =>
        requests.get(API_ROOT + "/record/diary/list")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ owner })
            .then(res => res.body)
            .catch(err => err.response.body),
    getDiaryDetail: (uId, token, diaryId) =>
        requests.get(API_ROOT + "/record/diary/detailed")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ diaryId })
            .then(res => res.body)
            .catch(err => err.response.body),
    createDiary: (uId, token, title, text) =>
        requests.post(API_ROOT + "/record/diary")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .send({ title, text })
            .then(res => res.body)
            .catch(err => err.response.body),
    deleteDiary: (uId, token, diaryId) =>
        requests.delete(API_ROOT + "/record/diary")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ diaryId })
            .then(res => res.body)
            .catch(err => err.response.body),
    getMoodReportList: (uId, token, owner) =>
        ({
            rescode: 0,
            positiveNum: 1,
            neutralNum: 1,
            negativeNum: 0,
            moodReports: [{ moodReportId: 1, mood: 0, year: 2019, week: 30 }, { moodReportId: 2, mood: 1, year: 2019, week: 31 }]
        }),
    /*requests.get(API_ROOT + "/record/moodReport/list")
        .set('Authorization', 'Bearer ' + token)
        .set('uId', uId)
        .query({ owner })
        .then(res => res.body)
        .catch(err => err.response.body),*/
    getMoodReportDetail: (uId, token, moodReportId) =>
        ({
            rescode: 0,
            moodReport: {
                year: 2019, week: 30, heanNum: 5, keyword: "吃", mood: 0,
                image: "https://images.pexels.com/photos/2679542/pexels-photo-2679542.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
                poem:"一二三四五，二三四五六，三四五六七，五六七八九"
            }
        })
        /*requests.get(API_ROOT + "/record/moodReport/detailed")
            .set('Authorization', 'Bearer ' + token)
            .set('uId', uId)
            .query({ moodReportId })
            .then(res => res.body)
            .catch(err => err.response.body),*/
};

export default record;