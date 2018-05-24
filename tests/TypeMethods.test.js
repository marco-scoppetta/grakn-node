// const gc = require("../src/GraknClient");
// const DEFAULT_URI = "localhost:48555";
// const DEFAULT_KEYSPACE = "grakn";
// const DEFAULT_CREDENTIALS = { username: "cassandra", password: "cassandra" };


// test.only("Entity methods", async (done) => {
//     try {
//         let client = new gc(DEFAULT_URI, "gene", DEFAULT_CREDENTIALS);
//         const tx = await client.open(client.txType.WRITE);

//         const result = await tx.execute("match $x sub person; limit 1; get;");
//         for (let map of result) {
//             for (let [key, subEntity] of map) {
//                 expect(subEntity.isType()).toBeTruthy();
//                 const roles = await subEntity.plays();
//                 roles.forEach(role => {
//                     expect(role.isRole()).toBeTruthy();
//                 })
//                 const attrTypes = await subEntity.attributes();
//                 attrTypes.forEach(att => {
//                     expect(att.isAttributeType()).toBeTruthy();
//                 })
//                 const instances = await subEntity.instances();
//                 instances.forEach(instance => {
//                     expect(instance.isThing()).toBeTruthy();
//                 });
//             }
//         }
//         done();
//     } catch (err) {
//         done.fail(err);
//     }
// });


// // AttributeType test

// // RelationshipType test

// // EntityType test
