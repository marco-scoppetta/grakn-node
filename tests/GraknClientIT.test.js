const gc = require("../src/GraknClient");
const DEFAULT_URI = "localhost:48555";
const DEFAULT_KEYSPACE = "grakn";
const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };

test("Retrieve schema concepts in empty graph", (done) => {
  let client = new gc(DEFAULT_URI, "emptykeyspace", DEFAULT_CREDENTIALS);
  client.execute("match $x; get;").then(async result => {
    expect(result.length).toBe(6);
    done();
  }).catch((err) => {
    done.fail(err);
  });
});

test("Relationship concept in empty graph", (done) => {
  let client = new gc(DEFAULT_URI, "emptykeyspace", DEFAULT_CREDENTIALS);
  client.execute("match $x sub relationship; get;").then(async result => {
    expect(result.length).toBe(1);
    for (let map of result) {
      for (let [key, value] of map) {
        const label = await value.getLabel();
        expect(value.isRelationshipType()).toBeTruthy();
        expect(value.isType()).toBeTruthy();
        expect(value.isSchemaConcept()).toBeTruthy();
        expect(value.isThing()).toBeFalsy();
        expect(value.isAttributeType()).toBeFalsy();
        expect(value.isEntityType()).toBeFalsy();
        expect(label).toBe("relationship");
        const isImplicit = await value.isImplicit();
        expect(isImplicit).toBeFalsy();
      }
    }
    done();
  }).catch((err) => {
    done.fail(err);
  });
});

// test("Relationship instance methods", async () => {
//   try {
//     let client = new gc(DEFAULT_URI, "gene", DEFAULT_CREDENTIALS);
//     const tx = await client.open(client.txType.WRITE);

//     const result = await tx.execute("match $x isa marriage; limit 1; get;").catch((err) => {
//       console.log(err);
//     });
//     for (let map of result) {
//       for (let [key, marriage] of map) {
//         expect(marriage.isThing()).toBeTruthy();
//         expect(marriage.isRelationship()).toBeTruthy();
//         expect(marriage.isEntity()).toBeFalsy();
//         expect(marriage.isAttribute()).toBeFalsy();

//         const relationships = await value.getRolesPlayedByThing();
//         relationships.forEach(async rel => {
//           const labb = await rel.getLabel();
//           console.log(labb);
//         });
//       }
//     }
//     console.log()
//   } catch (err) {
//     console.log(err);
//   }
// });
