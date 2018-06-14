var { spawn, spawnSync } = require('child_process');
var { StringDecoder } = require('string_decoder');
var decoder = new StringDecoder('utf8');
const gc = require("../../src/GraknSession");
const DEFAULT_URI = "localhost:48555";
var version = require('../../package.json').graknVersion;

var scriptPath = './tests/support/env.sh';


function newKeyspace() {
    const randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return 'a' + randomName;
}

const session = new gc(DEFAULT_URI, newKeyspace());

module.exports = {
    beforeAll: function () {
        var process = spawnSync(scriptPath, ['start', version]);
        if (process.status != 0) {
            var err = Buffer.from(process.output[2]);
            console.log('Failed to start test environment: ' + decoder.write(err));
        } else {
            console.log('Grakn environment ready.');
        }

    },
    afterAll: function () {
        var process = spawnSync(scriptPath, ['stop']);
        if (process.status != 0) {
            var err = Buffer.from(process.output[2]);
            console.log('Failed to stop test environment: ' + decoder.write(err));
        } else {
            console.log('Grakn environment stopped.');
        }
    },
    newKeyspace,
    integrationTestsTimeout: function () { return 10000 },
    session: () => session,
    tearDown: async () => {
        await session.deleteKeyspace();
        session.close();
    }
}