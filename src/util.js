const transformDate = (timestamp, doShowTime) => {
    const date = new Date(timestamp)
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    if (doShowTime) {
        if (hour < 10)
            hour = "0" + hour;
        if (minute < 10)
            minute = "0" + minute;
        if (second < 10)
            second = "0" + second;
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    }
    else
        return year + "-" + month + "-" + day;
}

export { transformDate }