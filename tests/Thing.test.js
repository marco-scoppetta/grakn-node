const env = require('./support/GraknTestEnvironment');
let session;
let tx;

beforeAll(() => {
    session = env.session();
});

afterAll(async () => {
    await env.tearDown();
});

beforeEach(async () => {
    tx = await session.open(env.txType().WRITE);
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
        const attrType = await tx.putAttributeType('name', env.dataType().STRING);
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
        const attrType = await tx.putAttributeType('name', env.dataType().STRING);
        const attrMarriedType = await tx.putAttributeType('married', env.dataType().BOOLEAN);
        const whateverType = await tx.putAttributeType('whatever', env.dataType().FLOAT);
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
        const empty = await person.attributes(whateverType);
        expect(empty.length).toBe(0);
    });

    test('keys(...AttributeType)', async () => {
        const personType = await tx.putEntityType('person');
        const nameType = await tx.putAttributeType('name', env.dataType().STRING);
        const surnameType = await tx.putAttributeType('surname', env.dataType().STRING);

        await personType.key(nameType);
        await personType.attribute(surnameType);

        const personName = await nameType.putAttribute('James');
        const personSurname = await surnameType.putAttribute('Bond');

        const person = await personType.addEntity();
        await person.attribute(personName);
        await person.attribute(personSurname);

        const keys = await person.keys()
        expect(keys.length).toBe(1);
        expect(keys[0].id).toBe(personName.id);

        const filteredKeys = await person.keys(nameType, surnameType);
        expect(filteredKeys.length).toBe(1);
        expect(filteredKeys[0].id).toBe(personName.id);

        //TODO: remove when fixed on server side
        // const emptyKeys = await person.keys(surnameType);
        // expect(emptyKeys.length).toBe(0);

    });
});