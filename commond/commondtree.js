module.exports = {
  command: 'tree',
  describe: 'generate tree',
  builder: {
    banana: {
      default: 'cool'
    }
  },
  handler: function (argv) {
    console.log('fsfsf')
  }
}