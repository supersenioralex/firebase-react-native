
import moment from 'moment';

export function formatTime(date){
    return moment(date.seconds * 1000).format("YYYY-MM-DD")
}

export function getToday(date){
    // if date
    return moment().format("YYYY-MM-DD")
}