const gc = require("../src/GraknClient");
const DEFAULT_URI = "localhost:48555";
const DEFAULT_KEYSPACE = "grakn";

describe("Test Client opening connection", () => {
  test("GraknClient open request", () => {
    let client = new gc(DEFAULT_URI, DEFAULT_KEYSPACE, {
      username: "cassandra",
      password: "cassandra"
    });
    client.execute("match $x; get;").then(async result => {
      expect(result.length).toBe(6);
      for (let map of result) {
        for (let [key, value] of map) {
          if (value.getBaseType() === "RELATIONSHIP_TYPE") {
            const label = await value.getLabel();
            expect(label).toBe("relationship");
            const isImplicit = await value.isImplicit();
            expect(isImplicit).toBeFalsy();
            // const roles = await value.getRelatedRoles();
            // console.log("Here are the roles" + roles);
          }
        }
      }
    });
  });
});
