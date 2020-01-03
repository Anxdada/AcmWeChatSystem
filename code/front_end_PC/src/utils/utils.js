export default {
    formateDate() {
        let date = new Date();
        let month = (date.getMonth() + 1);
        if (month < 10) {
            month = '0' + month;
        }
        let day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        let hours = date.getHours(); 
        if (hours < 10) {
            hours = '0' + hours;
        }
        let minutes = date.getMinutes(); 
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
    }
}