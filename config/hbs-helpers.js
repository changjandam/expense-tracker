module.exports = {
  dateConvert: function (ISOdate) {
    const date = ISOdate.toISOString()
    const y = date.slice(0, 4)
    const m = date.slice(5, 7)
    const d = date.slice(8, 10)
    return y + '/' + m + '/' + d
  }
}
