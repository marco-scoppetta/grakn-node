var { spawn, spawnSync } = require('child_process');
var { StringDecoder } = require('string_decoder');
var decoder = new StringDecoder('utf8');
var version = require('../../package.json').graknVersion;

var scriptPath = './tests/support/env.sh';

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
    newKeyspace: function () {
        const randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return 'a' + randomName;
    },
    integrationTestsTimeout: function () { return 10000 }
}