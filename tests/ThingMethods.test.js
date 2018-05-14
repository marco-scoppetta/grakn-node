const gc = require("../src/GraknClient");
const DEFAULT_URI = "localhost:48555";
const DEFAULT_KEYSPACE = "grakn";
const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };


test("Thing methods", async (done) => {
    try {
        let client = new gc(DEFAULT_URI, "gene", DEFAULT_CREDENTIALS);
        const tx = await client.open(client.txType.WRITE);
        // await tx.execute(
        //     "define teaching sub relationship, relates teacher, relates student;" +
        //     " teacher sub role; student sub role;");
        // await tx.execute(
        //     "define person sub entity, has name, plays teacher, plays student;" +
        //     " name sub attribute, datatype string;"
        // );
        // await tx.execute(
        //     "insert $x has name 'Stefano' isa person;" +
        //     " $y has name 'Luigi' isa person;" +
        //     " (teacher: $x, student: $y) isa teaching;"
        // );

        const result = await tx.execute("match $x isa person; limit 1; get;");
        for (let map of result) {
            for (let [key, person] of map) {
                expect(person.isThing()).toBeTruthy();
                const type = await person.type();
                const typeLabel = await type.getLabel();
                const relationships = await person.relationships();
                relationships.forEach(async rel => {
                    expect(rel.isRelationship()).toBeTruthy();
                });
                const roles = await person.plays();
                const attributes = await person.attributes();
                attributes.forEach(async a => {
                    const value = await a.getValue()
                });
                // const filteredRelationships = await person.relationships(...roles);
                console.log("yolo");
            }
        }
        done();
    } catch (err) {
        done.fail(err);
    }
});
