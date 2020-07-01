export function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const paddedSeconds = seconds < 10 ? '0' + seconds: seconds;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `
      ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, ${hours}:${minutes}:${paddedSeconds}  ${ampm}
    `
}
