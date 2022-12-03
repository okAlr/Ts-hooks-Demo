import { Moment } from 'moment';
export const formatDate = (date: Moment) => {
    if (!date) {
        return "";
    }

    const currentDate = new Date(date as any);
    return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
}