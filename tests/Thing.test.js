const environment = require('./support/GraknTestEnvironment');
let session;

beforeAll(() => {
    session = environment.session();
});

afterAll(async () => {
    await environment.tearDown();
});

describe("Thing methods", () => {

    test("isInferred", async () => {
        const tx = await session.open(session.txType.WRITE);
        const personType = await tx.putEntityType('person');
        const thing = await personType.addEntity();
        expect(await thing.isInferred()).toBeFalsy();
    }, environment.integrationTestsTimeout());

    test("type", async () => {
        const tx = await session.open(session.txType.WRITE);
        const personType = await tx.putEntityType('person');
        const thing = await personType.addEntity();
        const type = await thing.type();
        expect(type.id).toBe(personType.id);
        expect(type.isType()).toBeTruthy();
    }, environment.integrationTestsTimeout());

    test("relationships", async () => {
        const tx = await session.open(session.txType.WRITE);
        const relationshipType = await tx.putRelationshipType('parenthood');
        const relationship = await relationshipType.addRelationship();
        const parentRole = await tx.putRole('parent');
        const personType = await tx.putEntityType('person');
        const parent = await personType.addEntity();
        await relationship.addRolePlayer(parentRole, parent);
        const rels = await parent.relationships();
        expect(rels.length).toBe(1);
        expect(rels[0].id).toBe(relationship.id);
    }, environment.integrationTestsTimeout());

    test("relationships(...Role)", async () => {
        const tx = await session.open(session.txType.WRITE);

        const personType = await tx.putEntityType('person');
        const person = await personType.addEntity();

        //First relationship type
        const relationshipType = await tx.putRelationshipType('parenthood');
        const parenthoodRel1 = await relationshipType.addRelationship();
        const parentRole = await tx.putRole('parent');
        await parenthoodRel1.addRolePlayer(parentRole, person);

        const parenthoodRel2 = await relationshipType.addRelationship();
        await parenthoodRel2.addRolePlayer(parentRole, person);

        const parentRelationships = await person.relationships(parentRole);
        expect(parentRelationships.length).toBe(2);

        //Second relationship type
        const relationshipType2 = await tx.putRelationshipType('employment');
        const employmentRel = await relationshipType2.addRelationship();
        const employerRole = await tx.putRole('employer');
        await employmentRel.addRolePlayer(employerRole, person);


        const employerRelationships = await person.relationships(employerRole);
        expect(employerRelationships.length).toBe(1);
        expect(employerRelationships[0].id).toBe(employmentRel.id);
    }, environment.integrationTestsTimeout());

    test("plays", async () => {
        const tx = await session.open(session.txType.WRITE);
        const relationshipType = await tx.putRelationshipType('parenthood');
        const relationship = await relationshipType.addRelationship();
        const parentRole = await tx.putRole('parent');
        const personType = await tx.putEntityType('person');
        const parent = await personType.addEntity();
        await relationship.addRolePlayer(parentRole, parent);
        const plays = await parent.plays();
        expect(plays.length).toBe(1);
        expect(plays[0].id).toBe(parentRole.id);
    }, environment.integrationTestsTimeout());

    test("set/delete/get attributes", async () => {
        const tx = await session.open(session.txType.WRITE);
        const personType = await tx.putEntityType('person');
        const attrType = await tx.putAttributeType('name', session.dataType.STRING);
        await personType.attribute(attrType);
        const person = await personType.addEntity();
        const name = await attrType.putAttribute('Marco');
        await person.attribute(name);
        const attrs = await person.attributes();
        expect(attrs.length).toBe(1);
        expect(attrs[0].id).toBe(name.id);
        await person.deleteAttribute(name);
        const emptyAttrs = await person.attributes();
        expect(emptyAttrs.length).toBe(0);
    }, environment.integrationTestsTimeout());
});