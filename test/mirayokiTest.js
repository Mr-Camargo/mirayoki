const assert = require('chai').assert;
const core = require('../src/Mirayoki.js');
const commands = require('../src/functions/handleCommands.js');
const events = require('../src/functions/handleEvents.js')
const dbLogin = require('../src/functions/dbLogin.js')

before(function () {
    console.log('Starting tests... \n')
});

describe('Initialization', function () {
    it('Event handling', function (done) {
        assert.equal(events(), 'Passed checks')
        done();
    });
    it('Commands update', function (done) {
        assert.equal(commands(), 'Passed checks')
        done();
    });
    it('Database login', function (done) {
        assert.equal(dbLogin(), 'Passed checks')
        done();
    });
    it('Discord connection', function (done) {
        assert.equal(core(), 'Passed checks')
        done();
    });
});

after(function () {
    async function exitProcess() {
        const wait = require('util').promisify(setTimeout);
        await wait(8000);
        console.log('Exiting...')
        process.exit(0);
    }
    exitProcess()
});