const gc = require("../src/GraknClient");
const DEFAULT_URI = "localhost:48555";
const DEFAULT_KEYSPACE = "grakn";
const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };
const environment = require('./support/GraknTestEnvironment');


// AttributeType test
test.only("Create entity instance", async (done) => {
    try {
        const client = new gc(DEFAULT_URI, environment.newKeyspace());
        const tx = await client.open(client.txType.WRITE);
        const attributeType = await tx.putAttributeType("firstname", client.dataType.STRING);
        const attribute = await attributeType.putAttribute();
        expect(attribute.isAttribute()).toBeTruthy();
        done();
    } catch (err) {
        console.error(err);
        done.fail(err);
    }
}, 10000);

// RelationshipType test

// EntityType test
test("Create entity instance", async (done) => {
    try {
        const client = new gc(DEFAULT_URI, environment.newKeyspace());
        const tx = await client.open(client.txType.WRITE);
        const personType = await tx.putEntityType("person");
        const person = await personType.addEntity();
        expect(person.isEntity()).toBeTruthy();
        done();
    } catch (err) {
        console.error(err);
        done.fail(err);
    }
}, 10000);