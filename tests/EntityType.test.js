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

describe("Entity type methods", () => {

    test("addEntity", async () => {
        const personType = await tx.putEntityType("person");
        const person = await personType.addEntity();
        expect(person.isEntity()).toBeTruthy();
    });
});