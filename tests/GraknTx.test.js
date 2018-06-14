const environment = require('./support/GraknTestEnvironment');
const session = environment.session();

describe("GraknTx methods", () => {

  test("getConcept", async () => {
    const tx = await session.open(session.txType.WRITE);
    await tx.execute("define person sub entity;");
    const insertionResult = await tx.execute("insert $x isa person;");
    const concepts = insertionResult.map(map => Array.from(map.values())).reduce((a, c) => a.concat(c), []);
    expect(concepts.length).toBe(1);
    const person = concepts[0];
    const personId = person.id;

    const samePerson = await tx.getConcept(personId);
    expect(samePerson.isThing()).toBeTruthy();
    expect(samePerson.id).toBe(personId);

    // retrieve non existing id should return null
    const nonPerson = await tx.getConcept("not-existing-id");
    expect(nonPerson).toBe(null);
  }, environment.integrationTestsTimeout());

  // Bug regression test
  test("Ensure no duplicates in metatypes", async () => {
    const tx = await session.open(session.txType.WRITE);
    await tx.execute("define person sub entity;");
    const result = await tx.execute("match $x sub entity; get;");
    const concepts = result.map(map => Array.from(map.values())).reduce((a, c) => a.concat(c), []);
    expect(concepts.length).toBe(2);
    const set = new Set(concepts.map(concept => concept.id));
    expect(set.size).toBe(2);
  }, environment.integrationTestsTimeout());

  test("getSchemaConcept", async () => {
    const tx = await session.open(session.txType.WRITE);
    await tx.execute("define person sub entity;");

    const personType = await tx.getSchemaConcept("person");
    expect(personType.isSchemaConcept()).toBeTruthy();

    const nonPerson = await tx.getSchemaConcept("not-existing-label");
    expect(nonPerson).toBe(null);

  }, environment.integrationTestsTimeout());

  test("putEntityType", async () => {
    const tx = await session.open(session.txType.WRITE);
    const personType = await tx.putEntityType("person");
    expect(personType.isSchemaConcept()).toBeTruthy();
    expect(personType.isEntityType()).toBeTruthy();
  }, environment.integrationTestsTimeout());

  test("putRelationshipType", async () => {
    const tx = await session.open(session.txType.WRITE);
    const marriage = await tx.putRelationshipType("marriage");
    expect(marriage.isSchemaConcept()).toBeTruthy();
    expect(marriage.isRelationshipType()).toBeTruthy();
  }, environment.integrationTestsTimeout());

  test("putAttributeType", async () => {
    const tx = await session.open(session.txType.WRITE);
    const attributeType = await tx.putAttributeType("firstname", session.dataType.STRING);
    expect(attributeType.isAttributeType()).toBeTruthy();
  }, environment.integrationTestsTimeout());

  test("putRole", async () => {
    const tx = await session.open(session.txType.WRITE);
    const role = await tx.putRole("father");
    expect(role.isRole()).toBeTruthy();
    expect(role.baseType).toBe("ROLE");
  }, environment.integrationTestsTimeout());
});
