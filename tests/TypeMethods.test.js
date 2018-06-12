const gc = require("../src/GraknSession");
const DEFAULT_URI = "localhost:48555";
const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };
const environment = require('./support/GraknTestEnvironment');

const session = new gc(DEFAULT_URI, environment.newKeyspace());

// AttributeType test 
test.only("Create attribute instance", async (done) => {
    try {
        const tx = await session.open(session.txType.WRITE);
        const attributeType = await tx.putAttributeType("firstname", session.dataType.STRING);
        const attribute = await attributeType.putAttribute('Marco');
        expect(attribute.isAttribute()).toBeTruthy();
        expect(await attribute.getValue()).toBe('Marco');
        expect(await attribute.dataType()).toBe('String');

        const boolAttributeType = await tx.putAttributeType("employed", session.dataType.BOOLEAN);
        const boolAttribute = await boolAttributeType.putAttribute(false);
        expect(await boolAttribute.getValue()).toBe(false);
        expect(await boolAttribute.dataType()).toBe('Boolean');


        const floatAttributeType = await tx.putAttributeType("length", session.dataType.DOUBLE);
        const floatAttribute = await floatAttributeType.putAttribute(11.58);
        expect(await floatAttribute.getValue()).toBe(11.58);
        expect(await floatAttribute.dataType()).toBe('Double');

        //TODO add check expect.toThrow
        done();
    } catch (err) {
        console.error(err);
        done.fail(err);
    }
}, environment.integrationTestsTimeout());

// RelationshipType test

// EntityType test
test("Create entity instance", async (done) => {
    try {
        const tx = await session.open(session.txType.WRITE);
        const personType = await tx.putEntityType("person");
        const person = await personType.addEntity();
        expect(person.isEntity()).toBeTruthy();
        done();
    } catch (err) {
        console.error(err);
        done.fail(err);
    }
}, environment.integrationTestsTimeout());

test("isAbstract and setAbstract", async (done) => {
    try {
        const tx = await session.open(session.txType.WRITE);
        const dogType = await tx.putEntityType("dog");
        let isAbstract = await dogType.isAbstract();
        expect(isAbstract).toBeFalsy();
        await dogType.setAbstract(true);
        isAbstract = await dogType.isAbstract();
        expect(isAbstract).toBeTruthy();
        await dogType.setAbstract(false);
        isAbstract = await dogType.isAbstract();
        expect(isAbstract).toBeFalsy();

        done();
    } catch (err) {
        console.error(err);
        done.fail(err);
    }
}, environment.integrationTestsTimeout());