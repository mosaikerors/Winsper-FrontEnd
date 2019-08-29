const transformDate = (timestamp, doShowTime) => {
    const date = new Date(timestamp)
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    if (doShowTime)
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    else
        return year + "-" + month + "-" + day;
}

export { transformDate }