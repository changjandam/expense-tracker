module.exports = {
  dateConvert: function (ISOdate) {
    const date = ISOdate.toISOString()
    let y = date.slice(0, 4)
    let m = date.slice(5, 7)
    let d = date.slice(8, 10)
    return y + "/" + m + "/" + d
  }
}