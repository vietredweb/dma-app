import CalendarModel from '../CalendarModel/CalendarModel';

class CalendarUtils {
  transformCalendarResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new CalendarModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };
}

const utils = new CalendarUtils();

export default utils;
