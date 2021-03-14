"use strict"

const got = require("got")
const assert = require("assert").strict

const {
  describe: suite,
  it: test,
} = require("mocha")

const testMergePort = async function ({prefixUrl} = {}) {
  const gotInstance = got.extend({
    mutableDefaults: true,
    prefixUrl,
  })

  const port = 1234

  gotInstance.defaults.options = gotInstance.mergeOptions(gotInstance.defaults.options, {
    port,
  })

  assert.equal(gotInstance.defaults.options.port, port)
}

suite("Merge port into default options", function () {
  test("With `prefixUrl`", function () {
    return testMergePort({prefixUrl: "http://example.com"})
  })

  test("Without `prefixUrl`", testMergePort)
})
