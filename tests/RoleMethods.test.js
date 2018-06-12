const gc = require("../src/GraknSession");
const DEFAULT_URI = "localhost:48555";
const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };
const environment = require('./support/GraknTestEnvironment');

let session = new gc(DEFAULT_URI, environment.newKeyspace(), DEFAULT_CREDENTIALS);

test("relationship types", async (done) => {
    try {
        const tx = await session.open(session.txType.WRITE);
        await tx.execute('define parentship sub relationship, relates parent, relates child;');
        const result = await tx.execute('match $x label parent; get;');
        const concepts = result.map(map => Array.from(map.values())).reduce((a, c) => a.concat(c), []);
        const role = concepts[0];
        expect(role.baseType).toBe('ROLE');
        const rels = await role.relationshipTypes();
        expect(rels[0].baseType).toBe('RELATIONSHIP_TYPE');
        expect(await rels[0].getLabel()).toBe('parentship');
        done();
    } catch (err) {
        done.fail(err);
    }
}, environment.integrationTestsTimeout());

test("played by types", async (done) => {
    try {
        const tx = await session.open(session.txType.WRITE);
        await tx.execute('define parentship sub relationship, relates parent, relates child;');
        await tx.execute('define person sub entity plays parent;')
        const result = await tx.execute('match $x label parent; get;');
        const concepts = result.map(map => Array.from(map.values())).reduce((a, c) => a.concat(c), []);
        const role = concepts[0];
        expect(role.baseType).toBe('ROLE');
        const types = await role.playedByTypes();
        expect(types[0].baseType).toBe('ENTITY_TYPE');
        expect(await types[0].getLabel()).toBe('person');
        done();
    } catch (err) {
        done.fail(err);
    }
}, environment.integrationTestsTimeout());
