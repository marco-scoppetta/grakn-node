const { spawn, spawnSync } = require('child_process');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

const Grakn = require("../../src/Grakn");

const DEFAULT_URI = "localhost:48555";
const VERSION = require('../../package.json').graknVersion;
const SCRIPT_PATH = './tests/support/env.sh';
const INTEGRATION_TESTS_TIMEOUT = 2000000;
const TEST_KEYSPACE = 'testkeyspace';

function newKeyspace() {
    const randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return 'a' + randomName;
}

const session = Grakn.session(DEFAULT_URI, TEST_KEYSPACE);

jest.setTimeout(INTEGRATION_TESTS_TIMEOUT);

module.exports = {
    beforeAll: function () {
        var process = spawnSync(SCRIPT_PATH, ['start', VERSION]);
        if (process.status != 0) {
            var err = Buffer.from(process.output[2]);
            console.log('Failed to start test env: ' + decoder.write(err));
        } else {
            console.log('Grakn env ready.');
        }

    },
    afterAll: function () {
        var process = spawnSync(SCRIPT_PATH, ['stop']);
        if (process.status != 0) {
            var err = Buffer.from(process.output[2]);
            console.log('Failed to stop test env: ' + decoder.write(err));
        } else {
            console.log('Grakn env stopped.');
        }
    },
    newKeyspace,
    session: () => session,
    tearDown: async () => {
        await session.deleteKeyspace();
        session.close();
    },
    dataType: () => Grakn.dataType,
    txType: () => Grakn.txType
}