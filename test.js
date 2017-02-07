const test = require('ava')
const alfyTest = require('alfy-test')

test('get any result from endpoint', async t => {
  const alfy = alfyTest()
  const result = await alfy('anything')

  if (Array.isArray(result)) t.pass()
})
