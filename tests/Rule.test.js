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

describe("Rule methods", () => {

    test("get When/Then", async () => {
        const label = "genderisedParentship";
        const when = "{(parent: $p, child: $c) isa parentship; $c has gender \"male\"; $p has gender \"female\";}"
        const then = "{(mother: $p, son: $c) isa parentship;}";
        const rule = await tx.putRule(label, when, then);
        expect(await rule.getWhen()).toBe(when);
        expect(await rule.getThen()).toBe(then);
    });

    test("get When/Then when null", async () => {
        const rule = await tx.getSchemaConcept('rule');
        expect(await rule.getWhen()).toBeNull();
        expect(await rule.getThen()).toBeNull();
    });
});
