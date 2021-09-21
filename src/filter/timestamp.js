export default function (time) {
    const date = new Date(Number(time) * 1000);
    const Year = date.getFullYear();
    const Month = (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1);
    const Day = (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());
    const Hours = (date.getHours() < 10 ? `0${date.getHours()}` : date.getHours());
    const Minutes = (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());
    return `${Year}-${Month}-${Day} ${Hours}:${Minutes}`
  }