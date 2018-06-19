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

describe("Attribute type methods", () => {

    test("putAttribute", async () => {
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
    });

    test('getDataType', async () => {
        const attributeType = await tx.putAttributeType("firstname", session.dataType.STRING);
        expect(await attributeType.getDataType()).toBe('String');

        const boolAttributeType = await tx.putAttributeType("employed", session.dataType.BOOLEAN);
        expect(await boolAttributeType.getDataType()).toBe('Boolean');

        const doubleAttributeType = await tx.putAttributeType("length", session.dataType.DOUBLE);
        expect(await doubleAttributeType.getDataType()).toBe('Double');
    });

    test('getAttribute', async () => {
        const attributeType = await tx.putAttributeType("firstname", session.dataType.STRING);
        await attributeType.putAttribute('Marco');
        const attribute = await attributeType.getAttribute('Marco');
        expect(attribute.isAttribute()).toBeTruthy();
        const nullAttribute = await attributeType.getAttribute('Giangiovannino');
        expect(nullAttribute).toBeNull();
    });

    test('set/get regex', async () => {
        const attributeType = await tx.putAttributeType("id", session.dataType.STRING);
        const nullRegex = await attributeType.getRegex();
        expect(nullRegex).toBeNull();

        await attributeType.setRegex("(good|bad)-dog");
        const regex = await attributeType.getRegex();

        expect(regex).toBe("(good|bad)-dog");
    });
});