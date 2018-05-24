const gc = require("../src/GraknClient");
const DEFAULT_URI = "localhost:48555";
const DEFAULT_KEYSPACE = "grakn";
const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };


test("Thing methods", async (done) => {
    try {
        let client = new gc(DEFAULT_URI, "gene");
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
                    const rolesMap = await rel.rolePlayers();
                    expect(rel.isRelationship()).toBeTruthy();
                    expect(rel.isThing()).toBeTruthy();
                    expect(rel.isSchemaConcept()).toBeFalsy();
                    expect(rel.isAttribute()).toBeFalsy();
                    expect(rel.isEntity()).toBeFalsy();
                    expect(rel.isType()).toBeFalsy();
                });
                const roles = await person.plays();
                roles.forEach(role => {
                    expect(role.isRole()).toBeTruthy();
                });
                person.attributes().then(attributes => {
                    attributes.forEach(a => {
                        expect(a.isAttribute()).toBeTruthy();
                    });
                });
                const attributes = await person.attributes();

                attributes.forEach(async a => {
                    const value = await a.getValue()
                    const owners = await a.ownerInstances();
                    owners.forEach(o => {
                        expect(o.isThing()).toBeTruthy();
                    });
                    const datatype = await a.dataType();
                });
                // const filteredRelationships = await person.relationships(...roles);
            }
        }
        done();
    } catch (err) {
        done.fail(err);
    }
});


test("Relationship methods", async (done) => {
    try {
        let client = new gc(DEFAULT_URI, "gene", DEFAULT_CREDENTIALS);
        const tx = await client.open(client.txType.WRITE);

        const result = await tx.execute("match $x id V4176; limit 1; get;");
        for (let map of result) {
            for (let [key, marriage] of map) {
                expect(marriage.isThing()).toBeTruthy();
                expect(marriage.isRelationship()).toBeTruthy();
                const rolePlayersMap = await marriage.allRolePlayers();
                rolePlayersMap.forEach((setValue, key) => {
                    expect(key.isRole()).toBeTruthy();
                    setValue.forEach(thing => {
                        expect(thing.isThing()).toBeTruthy();
                    })
                });
                const rolePlayersArray = await marriage.rolePlayers();
                rolePlayersArray.forEach(role => {
                    expect(role.isRole()).toBeTruthy();
                });
            }
        }
        done();
    } catch (err) {
        done.fail(err);
    }
});
