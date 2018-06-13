const gc = require("../src/GraknSession");
const DEFAULT_URI = "localhost:48555";
const environment = require('./support/GraknTestEnvironment');

const session = new gc(DEFAULT_URI, environment.newKeyspace());

describe("Entity type methods", () => {

    test("addEntity", async () => {
        const tx = await session.open(session.txType.WRITE);
        const personType = await tx.putEntityType("person");
        const person = await personType.addEntity();
        expect(person.isEntity()).toBeTruthy();
    }, environment.integrationTestsTimeout());
});