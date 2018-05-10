const gc = require("../src/GraknClient");
const DEFAULT_URI = "localhost:48555";
const DEFAULT_KEYSPACE = "grakn";
const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };


test("Entity instance methods", async (done) => {
    try {
        let client = new gc(DEFAULT_URI, "gene", DEFAULT_CREDENTIALS);
        const tx = await client.open(client.txType.WRITE);

        const result = await tx.execute("match $x sub entity; limit 1; get;");
        for (let map of result) {
            for (let [key, person] of map) {
                person.setLabel("personciella");
            }
        }
        done();
    } catch (err) {
        done.fail(err);
    }
});
