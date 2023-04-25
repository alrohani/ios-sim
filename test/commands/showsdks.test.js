const TheCommand = require('../../src/commands/showsdks')
const { stdout } = require('stdout-stderr')
const simctl = require('simctl')
const os = require('node:os')

jest.mock('simctl')

describe('showsdks', () => {
  let command
  beforeEach(() => {
    command = new TheCommand([])
  })

  test('run', function () {
    const json = fixtureJson('simctl-list.json')
    simctl.list = jest.fn(() => {
      return {
        json
      }
    })

    return command.run().then((result) => {
      expect(result).toMatchObject(json.runtimes)
      expect(stdout.output).toMatchFixture('showsdks.txt')
    })
  })

  // see https://github.com/ios-control/ios-sim/issues/262
  test('run (coverage for new isAvailable property in runtimes)', function () {
    const json = fixtureJson('issue-262/simctl-list.json')
    simctl.list = jest.fn(() => {
      return {
        json
      }
    })

    return command.run().then((result) => {
      expect(result).toMatchObject(json.runtimes)
      expect(stdout.output).toMatchFixture('issue-262/showsdks.txt')
    })
  })

  test('output', function () {
    const json = fixtureJson('simctl-list.json')
    simctl.list = jest.fn(() => {
      return {
        json
      }
    })

    return command.output().then((result) => {
      // the command run log adds an extra newline, so to match the fixture we add a newline (see `run` test)
      expect(result + os.EOL).toMatchFixture('showsdks.txt')
    })
  })
})
