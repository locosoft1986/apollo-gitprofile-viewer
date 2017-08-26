const replaceDateFormatToken = (token, ...t) => {
  if('string' !== typeof(token) || !/[ymdhs]+/i.test(token)){
    return token
  }

  const leftPad = (number, len) => {
    return `000${number}`.slice(len * -1)
  }

  return token
    .replace(/Y{4,}/ig, t[0])
    .replace(/Y{2,}/ig, leftPad(t[0], 2))
    .replace(/M{2,}/g, leftPad(t[1], 2))
    .replace(/M+/g, t[1])
    .replace(/D{2,}/ig, leftPad(t[2], 2))
    .replace(/D+/ig, t[2])
    .replace(/H{2,}/ig, leftPad(t[3], 2))
    .replace(/H+/ig, t[3])
    .replace(/m{2,}/g, leftPad(t[4], 2))
    .replace(/m+/g, t[4])
    .replace(/s{2,}/g, leftPad(t[5], 2))
    .replace(/s+/g, t[5])
}

function parseDate(date, defaultVal = null){
  if(!date){
    return defaultVal
  }

  const dt = new Date(date)
  if(dt.toString() === 'Invalid Date'){
    return defaultVal
  }
  return dt;
}

export default function formatDate(date, format = 'YYYY-MM-DD'){
  if(!date){
    return ''
  }

  if(date instanceof Date || Object.prototype.toString.call(date) === '[object Date]'){
    return replaceDateFormatToken(
      format,
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  }

  return formatDate(parseDate(date), format)
}

export {parseDate}
