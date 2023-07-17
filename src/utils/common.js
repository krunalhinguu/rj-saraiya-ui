import moment from "moment";

// moment.tz.setDefault("Asia/Kolkata");

// prettier-ignore
export const date = new Date(moment().utcOffset("+0530").format("YYYY-MM-DD"));

export const localDate = (date) =>
  date && new Date(moment(date).utcOffset("+0530").format("YYYY-MM-DD"));
