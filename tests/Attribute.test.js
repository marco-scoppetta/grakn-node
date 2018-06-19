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

describe("Attribute methods", () => {

    test("dataType", async () => {
        const attributeType = await tx.putAttributeType("firstname", session.dataType.STRING);
        const attribute = await attributeType.putAttribute('Marco');
        expect(await attribute.dataType()).toBe('String');
    });

    test("getValue", async () => {
        const doubleAttributeType = await tx.putAttributeType("length", session.dataType.DOUBLE);
        const doubleAttribute = await doubleAttributeType.putAttribute(11.58);
        expect(await doubleAttribute.getValue()).toBe(11.58);
    });

    test("ownerInstances", async () => {
        const personType = await tx.putEntityType('person');
        const animalType = await tx.putEntityType('animal');
        const nameType = await tx.putAttributeType("name", session.dataType.STRING);
        await personType.attribute(nameType);
        await animalType.attribute(nameType);
        const person = await personType.addEntity();
        const dog = await animalType.addEntity();
        const name = await nameType.putAttribute('Giacobbe');
        await person.attribute(name);
        await dog.attribute(name);

        const owners = await name.ownerInstances();
        expect(owners.length).toBe(2);
        const ids = [person.id, dog.id];
        const ownersIds = owners.map(x => x.id);
        ids.sort();
        ownersIds.sort();
        expect(ids[0]).toBe(ownersIds[0]);
        expect(ids[1]).toBe(ownersIds[1]);
    });

});