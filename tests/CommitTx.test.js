const gc = require("../src/GraknClient");
const environment = require('./support/environment');

const DEFAULT_URI = "localhost:48555";
const DEFAULT_KEYSPACE = "grakn";
const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };

beforeAll(() => environment.beforeAll().then(() => {
    console.log('ehi porco di dioooo');
}));

afterAll(() => {
    environment.afterAll();
});


test("Commit Tx", async (done) => {
    try {
        const ks = environment.newKeyspace().trim().replace(/(\r\n|\n|\r)/gm, "");

        let client = new gc(DEFAULT_URI, ks, DEFAULT_CREDENTIALS);
        const tx = await client.open(client.txType.WRITE);

        const result = await tx.execute("define person sub entity;");
        tx.commit();

        const newTx = await client.open(client.txType.WRITE);
        const result2 = await newTx.execute("match $x sub person; get;");
        for (let map of result2) {
            for (let [key, subEntity] of map) {
                const label = await subEntity.getLabel();
                console.log(label);
            }
        }

        done();
    } catch (err) {
        done.fail(err);
    }
});



