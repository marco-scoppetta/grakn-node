const gc = require("../src/GraknSession");
const DEFAULT_URI = "localhost:48555";
const environment = require('./support/GraknTestEnvironment');

const session = new gc(DEFAULT_URI, environment.newKeyspace());

describe("Attribute type methods", () => {
    test("putAttribute", async () => {
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

        const doubleAttributeType = await tx.putAttributeType("length", session.dataType.DOUBLE);
        const doubleAttribute = await doubleAttributeType.putAttribute(11.58);
        expect(await doubleAttribute.getValue()).toBe(11.58);
        expect(await doubleAttribute.dataType()).toBe('Double');
    }, environment.integrationTestsTimeout());

    test('getDataType', async () => {
        const tx = await session.open(session.txType.WRITE);
        const attributeType = await tx.putAttributeType("firstname", session.dataType.STRING);
        expect(await attributeType.getDataType()).toBe('String');

        const boolAttributeType = await tx.putAttributeType("employed", session.dataType.BOOLEAN);
        expect(await boolAttributeType.getDataType()).toBe('Boolean');

        const doubleAttributeType = await tx.putAttributeType("length", session.dataType.DOUBLE);
        expect(await doubleAttributeType.getDataType()).toBe('Double');
    }, environment.integrationTestsTimeout());

    test('getAttribute', async () => {
        const tx = await session.open(session.txType.WRITE);
        const attributeType = await tx.putAttributeType("firstname", session.dataType.STRING);
        await attributeType.putAttribute('Marco');
        const attribute = await attributeType.getAttribute('Marco');
        expect(attribute.isAttribute()).toBeTruthy();
        const nullAttribute = await attributeType.getAttribute('Giangiovannino');
        expect(nullAttribute).toBeNull();
    }, environment.integrationTestsTimeout());
});