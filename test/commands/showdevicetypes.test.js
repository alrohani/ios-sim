const TheCommand = require('../../src/commands/showdevicetypes')
const { stdout } = require('stdout-stderr')
const os = require('node:os')
const simctl = require('simctl')

jest.mock('simctl')

describe('showdevicetypes', () => {
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
      expect(stdout.output).toMatchFixture('showdevicetypes.txt')
      expect(result instanceof Array).toBeTruthy()
      expect(result.length).toEqual(79)
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
      expect(result + os.EOL).toMatchFixture('showdevicetypes.txt')
    })
  })

  // see https://github.com/ios-control/ios-sim/issues/234
  test('device key in the form of com.apple.CoreSimulator.SimRuntime.XXXX', function () {
    const json = fixtureJson('issue-234/simctl-list.json')
    simctl.list = jest.fn(() => {
      return {
        json
      }
    })

    return command.run().then((result) => {
      expect(stdout.output).toMatchFixture('issue-234/showdevicetypes.txt')
    })
  })

  // see https://github.com/ios-control/ios-sim/issues/262
  test('new isAvailable property', function () {
    const json = fixtureJson('issue-262/simctl-list.json')
    simctl.list = jest.fn(() => {
      return {
        json
      }
    })

    return command.run().then((result) => {
      expect(stdout.output).toMatchFixture('issue-262/showdevicetypes.txt')
    })
  })
})
