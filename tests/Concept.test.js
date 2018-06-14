const environment = require('./support/GraknTestEnvironment');
let session;

beforeAll(() => {
    session = environment.session();
});

afterAll(async () => {
    await environment.tearDown();
});

describe("Concept methods", () => {

    test("delete type", async () => {
        const tx = await session.open(session.txType.WRITE);
        const personType = await tx.putEntityType('person');
        const schemaConcept = await tx.getSchemaConcept('person');
        expect(schemaConcept.isSchemaConcept()).toBeTruthy();
        await personType.delete();
        const nullSchemaConcept = await tx.getSchemaConcept('person');
        expect(nullSchemaConcept).toBeNull();
    }, environment.integrationTestsTimeout());

    test("delete instance", async () => {
        const tx = await session.open(session.txType.WRITE);
        const personType = await tx.putEntityType('person');
        const person = await personType.addEntity();
        await person.delete();
        const nullConcept = await tx.getConcept(person.id);
        expect(nullConcept).toBeNull();
    }, environment.integrationTestsTimeout());

    test("instance isEntity/isRelationship/isAttribute", async () => {
        const tx = await session.open(session.txType.WRITE);
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
    }, environment.integrationTestsTimeout());
});