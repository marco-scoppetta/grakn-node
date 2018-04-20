const gc = require("../src/GraknClient");
const DEFAULT_URI = "localhost:48555";
const DEFAULT_KEYSPACE = "grakn";

// describe("Test Client opening connection", () => {
//   test("GraknClient open request", () => {
//     let client = new gc(DEFAULT_URI, DEFAULT_KEYSPACE, {
//       username: "cassandra",
//       password: "cassandra"
//     });
//     client.execute("match $x; get;").then(async result => {
//       expect(result.length).toBe(6);
//       for (let map of result) {
//         for (let [key, value] of map) {
//           if (value.getBaseType() === "RELATIONSHIP_TYPE") {
//             const label = await value.getLabel();
//             expect(value.isRelationshipType()).toBeTruthy();
//             expect(value.isType()).toBeTruthy();
//             expect(value.isSchemaConcept()).toBeTruthy();
//             expect(value.isThing()).toBeFalsy();
//             expect(value.isAttributeType()).toBeFalsy();
//             expect(value.isEntityType()).toBeFalsy();
//             expect(label).toBe("relationship");
//             const isImplicit = await value.isImplicit();
//             expect(isImplicit).toBeFalsy();
//             const pene = await value.getRelatedRoles();
//             // const roles = await value.getRelatedRoles();
//             // console.log("Here are the roles" + roles);
//           }
//         }
//       }
//     }).catch((err) => {
//       console.log(err);
//     });
//   });
// });

// test("GraknClient open request", async () => {
//   let client = new gc(DEFAULT_URI, "gene", {
//     username: "cassandra",
//     password: "cassandra"
//   });
//   const tx = await client.open();
//   // const tx2 = await client.open().catch(e => {
//   //   console.log(e);
//   // });

//   tx.execute("match $x; get;").then(async result => {
//     // expect(result.length).toBe(6);
//     for (let map of result) {
//       for (let [key, value] of map) {
//         if (value.getBaseType() === "RELATIONSHIP_TYPE") {
//           const label = await value.getLabel();
//           expect(value.isRelationshipType()).toBeTruthy();
//           expect(value.isType()).toBeTruthy();
//           expect(value.isSchemaConcept()).toBeTruthy();
//           expect(value.isThing()).toBeFalsy();
//           expect(value.isAttributeType()).toBeFalsy();
//           expect(value.isEntityType()).toBeFalsy();
//           // expect(label).toBe("relationship");
//           const isImplicit = await value.isImplicit();
//           expect(isImplicit).toBeFalsy();
//           const roles = await value.getRelatedRoles();
//           roles.forEach(async role => {
//             const aaa = await role.getLabel();
//             expect(role.isRole()).toBeTruthy();
//           })
//           // const roles = await value.getRelatedRoles();
//           console.log("Here are the roles" + roles);
//         }
//       }
//     }
//   }).catch((err) => {
//     console.log(err);
//   });

// });


test("GraknClient open request", async () => {
  let client = new gc(DEFAULT_URI, "gene", {
    username: "cassandra",
    password: "cassandra"
  });
  const tx = await client.open(client.txType.WRITE);
  // const tx2 = await client.open().catch(e => {
  //   console.log(e);
  // });

  const result = await tx.execute("match $x isa person; get;").catch((err) => {
    console.log(err);
  });
  try {
    for (let map of result) {
      for (let [key, value] of map) {
        const inferred = await value.isInferred();
        console.log(inferred);
        const relationships = await value.getRolesPlayedByThing();
        relationships.forEach(rel => {
          console.log(rel);
        });
      }
    }

  } catch (err) {
    console.log(err);
  }
});
