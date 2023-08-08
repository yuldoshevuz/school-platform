module.exports = (date) => {
    const newDate = new Date(date * 1000)
    const year = newDate.getFullYear()
    const month = newDate.getMonth() < 10 ? '0'+(newDate.getMonth() +1) : newDate.getMonth() +1
    const day = newDate.getDate() < 10 ? '0'+newDate.getDate() : newDate.getDate()
    const hours = newDate.getHours() < 10 ? '0'+newDate.getHours() : newDate.getHours()
    const minutes = newDate.getMinutes() < 10 ? '0'+newDate.getMinutes() : newDate.getMinutes()

    return `${day}.${month}.${year} ${hours}:${minutes}`
}