import { addLeadingZero } from "./addLeadingZero.js";

export const formatDate = (date) => {
  var day = addLeadingZero(date.getDate());
  var month = addLeadingZero(date.getMonth() + 1);
  var year = date.getFullYear();

  return day + ":" + month + ":" + year;
};
