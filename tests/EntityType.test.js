const environment = require('./support/GraknTestEnvironment');
const session = environment.session();

describe("Entity type methods", () => {

    test("addEntity", async () => {
        const tx = await session.open(session.txType.WRITE);
        const personType = await tx.putEntityType("person");
        const person = await personType.addEntity();
        expect(person.isEntity()).toBeTruthy();
    }, environment.integrationTestsTimeout());
});