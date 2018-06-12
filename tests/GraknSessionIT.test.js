const gc = require("../src/GraknSession");
const DEFAULT_URI = "localhost:48555";
const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };
const environment = require('./support/GraknTestEnvironment');

const session = new gc(DEFAULT_URI, environment.newKeyspace());

test("Retrieve concept by id", async (done) => {
  try {
    const tx = await session.open(session.txType.WRITE);
    await tx.execute("define person sub entity;");
    const insertionResult = await tx.execute("insert $x isa person;");
    const concepts = insertionResult.map(map => Array.from(map.values())).reduce((a, c) => a.concat(c), []);
    expect(concepts.length).toBe(1);
    const person = concepts[0];
    const personId = person.id;

    // retrieve person in same transaction before committing
    const samePerson = await tx.getConcept(personId);
    expect(samePerson.isThing()).toBeTruthy();
    expect(samePerson.id).toBe(personId);

    // retrieve non existing id should return null
    const nonPerson = await tx.getConcept("not-existing-id");
    expect(nonPerson).toBe(null);
    await tx.commit();

    // retrieve the same person from different transaction after commit
    const tx2 = await session.open(session.txType.WRITE);
    const samePersonDifferentTx = await tx2.getConcept(personId);
    expect(samePersonDifferentTx.id).toBe(personId);

    done();
  } catch (err) {
    console.error(err);
    done.fail(err);
  }
}, environment.integrationTestsTimeout());

test("Ensure no duplicates in metatypes", async (done) => {
  try {
    const tx = await session.open(session.txType.WRITE);
    await tx.execute("define person sub entity;");
    const result = await tx.execute("match $x sub entity; get;");
    const concepts = result.map(map => Array.from(map.values())).reduce((a, c) => a.concat(c), []);
    expect(concepts.length).toBe(2);
    const set = new Set(concepts.map(concept => concept.id));
    expect(set.size).toBe(2);
    done();
  } catch (err) {
    console.error(err);
    done.fail(err);
  }
}, environment.integrationTestsTimeout());

test("Retrieve schema concept by label", async (done) => {
  try {
    const tx = await session.open(session.txType.WRITE);
    await tx.execute("define person sub entity;");

    // retrieve person in same transaction before committing
    const personType = await tx.getSchemaConcept("person");
    expect(personType.isSchemaConcept()).toBeTruthy();

    // retrieve non existing id should return null
    const nonPerson = await tx.getSchemaConcept("not-existing-label");
    expect(nonPerson).toBe(null);
    await tx.commit();

    // retrieve the same person from different transaction after commit
    const tx2 = await session.open(session.txType.WRITE);
    const personType2 = await tx2.getSchemaConcept("person");
    expect(personType2.isSchemaConcept()).toBeTruthy();

    done();
  } catch (err) {
    console.error(err);
    done.fail(err);
  }
}, environment.integrationTestsTimeout());

test("Put entity type by label", async (done) => {
  try {
    const tx = await session.open(session.txType.WRITE);
    const personType = await tx.putEntityType("person");

    expect(personType.isSchemaConcept()).toBeTruthy();
    expect(personType.isEntityType()).toBeTruthy();

    done();
  } catch (err) {
    console.error(err);
    done.fail(err);
  }
}, environment.integrationTestsTimeout());

test("Put relationship type by label", async (done) => {
  try {
    const tx = await session.open(session.txType.WRITE);
    const marriage = await tx.putRelationshipType("marriage");

    expect(marriage.isSchemaConcept()).toBeTruthy();
    expect(marriage.isRelationshipType()).toBeTruthy();

    done();
  } catch (err) {
    console.error(err);
    done.fail(err);
  }
}, environment.integrationTestsTimeout());

test("Put attribute type and getDataType", async (done) => {
  try {
    const tx = await session.open(session.txType.WRITE);
    const attributeType = await tx.putAttributeType("firstname", session.dataType.STRING);
    expect(attributeType.isAttributeType()).toBeTruthy();
    expect(await attributeType.getDataType()).toBe("String");
    done();
  } catch (err) {
    console.error(err);
    done.fail(err);
  }
}, environment.integrationTestsTimeout());

