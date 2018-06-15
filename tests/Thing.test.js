const environment = require('./support/GraknTestEnvironment');
let session;
let tx;

beforeAll(() => {
    session = environment.session();
});

afterAll(async () => {
    await environment.tearDown();
});

beforeEach(async () => {
    tx = await session.open(session.txType.WRITE);
})

afterEach(() => {
    tx.close();
});

describe("Thing methods", () => {

    test("isInferred", async () => {
        const personType = await tx.putEntityType('person');
        const thing = await personType.addEntity();
        expect(await thing.isInferred()).toBeFalsy();
    });

    test("type", async () => {
        const personType = await tx.putEntityType('person');
        const thing = await personType.addEntity();
        const type = await thing.type();
        expect(type.id).toBe(personType.id);
        expect(type.isType()).toBeTruthy();
    });

    test("relationships", async () => {
        const relationshipType = await tx.putRelationshipType('parenthood');
        const relationship = await relationshipType.addRelationship();
        const parentRole = await tx.putRole('parent');
        const personType = await tx.putEntityType('person');
        const parent = await personType.addEntity();
        await relationship.addRolePlayer(parentRole, parent);
        const rels = await parent.relationships();
        expect(rels.length).toBe(1);
        expect(rels[0].id).toBe(relationship.id);
    });

    test("relationships(...Role)", async () => {
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
    });

    test("plays", async () => {
        const relationshipType = await tx.putRelationshipType('parenthood');
        const relationship = await relationshipType.addRelationship();
        const parentRole = await tx.putRole('parent');
        const personType = await tx.putEntityType('person');
        const parent = await personType.addEntity();
        await relationship.addRolePlayer(parentRole, parent);
        const plays = await parent.plays();
        expect(plays.length).toBe(1);
        expect(plays[0].id).toBe(parentRole.id);
    });

    test("set/delete/get attributes", async () => {
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
    });

    test("attributes(...AttributeType)", async () => {
        const personType = await tx.putEntityType('person');
        const attrType = await tx.putAttributeType('name', session.dataType.STRING);
        const attrMarriedType = await tx.putAttributeType('married', session.dataType.BOOLEAN);
        await personType.attribute(attrType);
        await personType.attribute(attrMarriedType);
        const person = await personType.addEntity();
        const notMarried = await attrMarriedType.putAttribute(false);
        const name = await attrType.putAttribute('Marco');
        await person.attribute(name);
        await person.attribute(notMarried);
        const attrs = await person.attributes();
        expect(attrs.length).toBe(2);
        attrs.forEach(att => { expect(att.isAttribute()).toBeTruthy(); });
        const filteredAttrs = await person.attributes(attrMarriedType);
        expect(filteredAttrs.length).toBe(1);
    });
});