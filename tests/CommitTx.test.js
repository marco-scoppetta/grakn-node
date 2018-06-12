const gc = require("../src/GraknSession");
const environment = require('./support/GraknTestEnvironment');

const DEFAULT_URI = "localhost:48555";
const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };

describe('Integration test', () => {

    let session = new gc(DEFAULT_URI, environment.newKeyspace(), DEFAULT_CREDENTIALS);

    test("Commit Tx", async (done) => {
        try {
            const tx = await session.open(session.txType.WRITE);

            await tx.execute("define person sub entity;");
            await tx.commit();
            const newTx = await session.open(session.txType.WRITE);
            const result2 = await newTx.execute("match $x sub person; get;");
            for (let map of result2) {
                for (let [key, subEntity] of map) {
                    const label = await subEntity.getLabel();
                    expect(label).toBe('person');
                }
            }

            done();
        } catch (err) {
            done.fail(err);
        }
    }, environment.integrationTestsTimeout());

    test("If tx does not commit, different Tx won't see changes", async (done) => {
        try {
            const tx = await session.open(session.txType.WRITE);

            await tx.execute("define superman sub entity;");
            const newTx = await session.open(session.txType.WRITE);
            await expect(newTx.execute("match $x sub superman; get;"))
                .rejects
                .toThrow();
            done();
        } catch (err) {
            done.fail(err);
        }
    }, environment.integrationTestsTimeout());


});




