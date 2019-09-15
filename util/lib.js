class CommonMethods {
  filterAttr (obj, exc = ['_', '$0']) {
    let temp = {}
    Object.keys(obj).forEach(n => {
      if (!exc.includes(n)) temp[n] = obj[n]
    })
    return temp
  }
}

module.exports = new CommonMethods()