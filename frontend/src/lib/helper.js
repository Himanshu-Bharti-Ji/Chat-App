import moment from "moment";

export const getFormatedDate = (date, format = "DD-MM-YYYY") => {
    if (!date) return "";
    const newDate = moment(date).format(format)
    return newDate;
}