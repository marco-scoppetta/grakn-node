const gc = require("../src/GraknClient");
const environment = require('./support/environment');

const DEFAULT_URI = "localhost:48555";
const DEFAULT_KEYSPACE = "grakn";
const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };

function randomUUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

describe('Integration test', () => {

    // beforeAll(environment.beforeAll);

    // afterAll(() => {
    //     environment.afterAll();
    // });


    test("Commit Tx", async (done) => {
        try {
            const ks = 'a' + randomUUID();
            console.log("Working on keyspace " + ks);
            let client = new gc(DEFAULT_URI, ks, DEFAULT_CREDENTIALS);
            const tx = await client.open(client.txType.WRITE);

            const result = await tx.execute("define person sub entity;");
            await tx.commit();
            const newTx = await client.open(client.txType.WRITE);
            const result2 = await newTx.execute("match $x sub person; get;");
            for (let map of result2) {
                for (let [key, subEntity] of map) {
                    const label = await subEntity.getLabel();
                    expect(label).toBe('person');
                }
            }

            done();
        } catch (err) {
            console.log(err)
            done.fail(err);
        }
    });

    test.only("If tx does not commit, different Tx won't see changes", async (done) => {
        try {
            const ks = 'a' + randomUUID();
            console.log("Working on keyspace " + ks);
            let client = new gc(DEFAULT_URI, ks, DEFAULT_CREDENTIALS);
            const tx = await client.open(client.txType.WRITE);

            const result = await tx.execute("define person sub entity;");
            const newTx = await client.open(client.txType.WRITE);
            // const executionPromise = newTx.execute("match $x sub person; get;");
            await expect(newTx.execute("match $x sub person; get;"))
                .rejects
                .toThrow();
            done();
        } catch (err) {
            console.log(err)
            done.fail(err);
        }
    }, 10000);


});




