const environment = require('./support/GraknTestEnvironment');
let session;

beforeAll(() => {
    session = environment.session();
});

afterAll(async () => {
    await environment.tearDown();
});

describe("Entity type methods", () => {

    test("addEntity", async () => {
        const tx = await session.open(session.txType.WRITE);
        const personType = await tx.putEntityType("person");
        const person = await personType.addEntity();
        expect(person.isEntity()).toBeTruthy();
    });
});