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

describe("Concept methods", () => {

    test("delete type", async () => {
        const personType = await tx.putEntityType('person');
        const schemaConcept = await tx.getSchemaConcept('person');
        expect(schemaConcept.isSchemaConcept()).toBeTruthy();
        await personType.delete();
        const nullSchemaConcept = await tx.getSchemaConcept('person');
        expect(nullSchemaConcept).toBeNull();
    });

    test("delete instance", async () => {
        const personType = await tx.putEntityType('person');
        const person = await personType.addEntity();
        await person.delete();
        const nullConcept = await tx.getConcept(person.id);
        expect(nullConcept).toBeNull();
    });

    test("instance isEntity/isRelationship/isAttribute", async () => {
        const personType = await tx.putEntityType('person');
        const person = await personType.addEntity();
        expect(person.isEntity()).toBeTruthy();
        expect(person.isRelationship()).toBeFalsy();
        expect(person.isAttribute()).toBeFalsy();

        const relationshipType = await tx.putRelationshipType('marriage');
        const marriage = await relationshipType.addRelationship();
        expect(marriage.isEntity()).toBeFalsy();
        expect(marriage.isRelationship()).toBeTruthy();
        expect(marriage.isAttribute()).toBeFalsy();

        const attributeType = await tx.putAttributeType('employed', session.dataType.BOOLEAN);
        const employed = await attributeType.putAttribute(true);
        expect(employed.isEntity()).toBeFalsy();
        expect(employed.isRelationship()).toBeFalsy();
        expect(employed.isAttribute()).toBeTruthy();
    });
});