const gc = require("../src/GraknSession");
const DEFAULT_URI = "localhost:48555";
const DEFAULT_KEYSPACE = "grakn";
const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };
const environment = require('./support/GraknTestEnvironment');

test("Retrieve concept by id", async (done) => {
  try {
    const client = new gc(DEFAULT_URI, environment.newKeyspace());
    const tx = await client.open(client.txType.WRITE);
    await tx.execute("define person sub entity;");
    const insertionResult = await tx.execute("insert $x isa person;");
    const concepts = insertionResult.map(map => Array.from(map.values()));
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
    const tx2 = await client.open(client.txType.WRITE);
    const samePersonDifferentTx = await tx2.getConcept(personId);
    expect(samePersonDifferentTx.id).toBe(personId);

    done();
  } catch (err) {
    console.error(err);
    done.fail(err);
  }
}, environment.integrationTestsTimeout());

test("Retrieve schema concept by label", async (done) => {
  try {
    const client = new gc(DEFAULT_URI, environment.newKeyspace());
    const tx = await client.open(client.txType.WRITE);
    await tx.execute("define person sub entity;");

    // retrieve person in same transaction before committing
    const personType = await tx.getSchemaConcept("person");
    expect(personType.isSchemaConcept()).toBeTruthy();

    // retrieve non existing id should return null
    const nonPerson = await tx.getSchemaConcept("not-existing-label");
    expect(nonPerson).toBe(null);
    await tx.commit();

    // retrieve the same person from different transaction after commit
    const tx2 = await client.open(client.txType.WRITE);
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
    const client = new gc(DEFAULT_URI, environment.newKeyspace());
    const tx = await client.open(client.txType.WRITE);
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
    const client = new gc(DEFAULT_URI, environment.newKeyspace());
    const tx = await client.open(client.txType.WRITE);
    const marriage = await tx.putRelationshipType("marriage");

    expect(marriage.isSchemaConcept()).toBeTruthy();
    expect(marriage.isRelationshipType()).toBeTruthy();

    done();
  } catch (err) {
    console.error(err);
    done.fail(err);
  }
}, environment.integrationTestsTimeout());

test("Put attribute type", async (done) => {
  try {
    const client = new gc(DEFAULT_URI, environment.newKeyspace());
    const tx = await client.open(client.txType.WRITE);
    const attributeType = await tx.putAttributeType("firstname", client.dataType.STRING);
    expect(attributeType.isAttributeType()).toBeTruthy();
    done();
  } catch (err) {
    console.error(err);
    done.fail(err);
  }
}, environment.integrationTestsTimeout());

// test.only("Exception on query leaves tx usable", async (done) => {
//   try {
//     const ks = environment.newKeyspace();
//     let client = new gc(DEFAULT_URI, ks, DEFAULT_CREDENTIALS);
//     const tx = await client.open(client.txType.WRITE);

//     const result = await tx.execute("match $x sub entity; get;");
//     const concepts = result.map(map => Array.from(map.values()));
//     expect(concepts[0].isEntityType()).toBeTruthy();
//     await expect(tx.execute("match $x sub person; net;"))
//       .rejects
//       .toThrow();

//     const result2 = await tx.execute("match $x sub entity; get;");
//     const concepts2 = result2.map(map => Array.from(map.values()));
//     expect(concepts2[0].isEntityType()).toBeTruthy();
//     client.close();
//     done();
//   } catch (err) {
//     console.log(err)
//     done.fail(err);
//   }
// }, 200000);

