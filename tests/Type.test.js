const environment = require('./support/GraknTestEnvironment');
let session;

beforeAll(() => {
    session = environment.session();
});

afterAll(async () => {
    await environment.tearDown();
});

describe("Type methods", () => {

    test("setAbstract && isAbstract", async () => {
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
    }, environment.integrationTestsTimeout());

    test("get/set/delete plays", async () => {
        const tx = await session.open(session.txType.WRITE);
        const role = await tx.putRole('father');
        const type = await tx.putEntityType('person');
        const plays = await type.plays();
        expect(plays.length).toBe(0);
        await type.plays(role);
        const playsWithRole = await type.plays();
        expect(playsWithRole.length).toBe(1);
        expect(playsWithRole[0].baseType).toBe('ROLE');
        await type.deletePlays(role);
        const playsRemoved = await type.plays();
        expect(playsRemoved.length).toBe(0);
    }, environment.integrationTestsTimeout());

    test("get/set/delete attributes", async () => {
        const tx = await session.open(session.txType.WRITE);
        const type = await tx.putEntityType('person');
        const nameType = await tx.putAttributeType('name', session.dataType.STRING);
        const attrs = await type.attributes();
        expect(attrs.length).toBe(0);
        await type.attribute(nameType);
        const attrsWithName = await type.attributes();
        expect(attrsWithName.length).toBe(1);
        expect(attrsWithName[0].baseType).toBe('ATTRIBUTE_TYPE');
        await type.deleteAttribute(nameType);
        const attrsRemoved = await type.attributes();
        expect(attrsRemoved.length).toBe(0);
    }, environment.integrationTestsTimeout());

    test("instances", async () => {
        const tx = await session.open(session.txType.WRITE);
        const personType = await tx.putEntityType("person");
        const instances = await personType.instances();
        expect(instances.length).toBe(0);
        await personType.addEntity();
        const instancesWithPerson = await personType.instances();
        expect(instancesWithPerson.length).toBe(1);
    }, environment.integrationTestsTimeout());

    test("Get/set/delete key", async () => {
        const tx = await session.open(session.txType.WRITE);
        const type = await tx.putEntityType('person');
        const nameType = await tx.putAttributeType('name', session.dataType.STRING);
        const keys = await type.keys();
        expect(keys.length).toBe(0);
        await type.key(nameType);
        const keysWithName = await type.keys();
        expect(keysWithName.length).toBe(1);
        expect(keysWithName[0].baseType).toBe('ATTRIBUTE_TYPE');
        await type.deleteKey(nameType);
        const keysRemoved = await type.keys();
        expect(keysRemoved.length).toBe(0);
    }, environment.integrationTestsTimeout());
});

