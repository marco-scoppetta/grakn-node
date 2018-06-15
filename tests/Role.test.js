const environment = require('./support/GraknTestEnvironment');
let session;

beforeAll(() => {
    session = environment.session();
});

afterAll(async () => {
    await environment.tearDown();
});

describe("Role methods", () => {

    test("relationshipTypes", async () => {
        const tx = await session.open(session.txType.WRITE);
        await tx.execute('define parentship sub relationship, relates parent, relates child;');
        const result = await tx.execute('match $x label parent; get;');
        const concepts = result.map(map => Array.from(map.values())).reduce((a, c) => a.concat(c), []);
        const role = concepts[0];
        expect(role.baseType).toBe('ROLE');
        const rels = await role.relationshipTypes();
        expect(rels[0].baseType).toBe('RELATIONSHIP_TYPE');
        expect(await rels[0].getLabel()).toBe('parentship');
    });

    test("playedByTypes", async () => {
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
    });
});
