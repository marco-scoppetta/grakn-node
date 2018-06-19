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

    test('Open tx with invalid parameter throws error', async () => {
        await expect(session.open('invalidTxType')).rejects.toThrowError();
    });

    test("Tx open in READ mode should throw when trying to define", async () => {
        const tx = await session.open(session.txType.READ);
        await expect(tx.execute("define person sub entity;")).rejects.toThrowError();
        tx.close();
    });

    test("If tx does not commit, different Tx won't see changes", async () => {
        const tx = await session.open(session.txType.WRITE);
        await tx.execute("define superman sub entity;");
        tx.close()
        const newTx = await session.open(session.txType.WRITE);
        await expect(newTx.execute("match $x sub superman; get;")).rejects.toThrowError(); // superman label does not exist in the graph
        newTx.close();
    });

});




