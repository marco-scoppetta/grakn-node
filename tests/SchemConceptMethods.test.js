const gc = require("../src/GraknClient");
const DEFAULT_URI = "localhost:48555";
const DEFAULT_KEYSPACE = "grakn";
const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };


test.only("Entity methods", async (done) => {
    try {
        let client = new gc(DEFAULT_URI, "gene", DEFAULT_CREDENTIALS);
        const tx = await client.open(client.txType.WRITE);

        const result = await tx.execute("match $x sub entity; limit 5; get;");
        for (let map of result) {
            for (let [key, subEntity] of map) {
                const label = await subEntity.getLabel();
                const subs = await subEntity.subs();
                subs.forEach(sub => {
                    expect(sub.baseType).toBe("ENTITY_TYPE");
                })
                const sups = await subEntity.sups();
                sups.forEach(sup => {
                    expect(sup.baseType).toBe("ENTITY_TYPE");
                })

                expect(subEntity.isType()).toBeTruthy();
                const superEntity = await subEntity.sup();
                const superLabel = await superEntity.getLabel();
                if (superLabel === "thing") {
                    const superSup = await superEntity.sup();
                    expect(superSup).toBeNull();
                }
                const subPerson = await subEntity.sub();
            }
        }
        done();
    } catch (err) {
        done.fail(err);
    }
});
