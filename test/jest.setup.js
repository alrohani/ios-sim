const { stdout, stderr } = require('stdout-stderr')
const fs = jest.requireActual('fs')
const eol = require('eol')

jest.setTimeout(30000)
jest.useFakeTimers()

// trap console log
beforeEach(() => {
  stdout.start()
  stderr.start()

  // change this if you need to see logs from stdout
  stdout.print = false
})

afterEach(() => {
  stdout.stop()
  stderr.stop()
})

// helper for fixtures
global.fixtureFile = (output) => {
  return fs.readFileSync(`./test/fixtures/${output}`, { encoding: 'utf-8' }).toString()
}

// helper for fixtures
global.fixtureJson = (output) => {
  return JSON.parse(global.fixtureFile(output))
}

// fixture matcher
expect.extend({
  toMatchFixture (received, expected) {
    const val = fixtureFile(expected)
    // eslint-disable-next-line jest/no-standalone-expect
    expect(eol.auto(received)).toEqual(eol.auto(val))
    return { pass: true }
  }
})

expect.extend({
  toMatchFixtureJson (received, expected) {
    const val = fixtureJson(expected)
    // eslint-disable-next-line jest/no-standalone-expect
    expect(received).toEqual(val)
    return { pass: true }
  }
})
