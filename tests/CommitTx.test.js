const gc = require("../src/GraknSession");
const environment = require('./support/GraknTestEnvironment');
const DEFAULT_URI = "localhost:48555";


let session;

beforeAll(() => {
    session = new gc(DEFAULT_URI, environment.newKeyspace());
});

afterAll(async () => {
    await session.deleteKeyspace();
    session.close();
});

describe('Integration test', () => {

    test("Commit Tx", async () => {
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
    }, environment.integrationTestsTimeout());

    test("Tx open in READ mode should throw when trying to define", async () => {
        const tx = await session.open(session.txType.READ);
        await expect(tx.execute("define person sub entity;")).rejects
            .toThrow();
    }, environment.integrationTestsTimeout());

    test("If tx does not commit, different Tx won't see changes", async () => {
        const tx = await session.open(session.txType.WRITE);
        await tx.execute("define superman sub entity;");
        const newTx = await session.open(session.txType.WRITE);
        await expect(newTx.execute("match $x sub superman; get;"))
            .rejects
            .toThrow();
    }, environment.integrationTestsTimeout());

});




