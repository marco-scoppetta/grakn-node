const gc = require("../src/GraknClient");

// describe('Test Graph constructor', () => {
//     test('Graph initialised with default values', () => {
//         let client = new gc();
//         expect(('execute' in graph)).toBeTruthy();
//         expect(graph.keyspace).toBe('grakn');
//         expect(graph.queryEndpoint).toBe('/kb/grakn/graql');
//         expect(graph.uri).toBe('http://localhost:4567');
//     });

//     test('Graph accepts two arguments', () => {
//         let graph = new gc('http://www.nasa.gov','nasa');
//         expect(graph.keyspace).toBe('nasa');
//         expect(graph.queryEndpoint).toBe('/kb/nasa/graql');
//         expect(graph.uri).toBe('http://www.nasa.gov');
//     });
// });
const DEFAULT_URI = "localhost:48555";
const DEFAULT_KEYSPACE = "grakn";

describe("Test Client opening connection", () => {
  test("GraknClient open request", () => {
    let client = new gc(DEFAULT_URI, DEFAULT_KEYSPACE, {
      username: "cassandra",
      password: "cassandra"
    });
    client.execute("match $x; get;").then(async result => {
      for (let map of result) {
        for (let [key, value] of map) {
          const label = await value.getLabel();
          console.log("dio porco: " + label);
        }
      }

      console.log("done" + result);
    });
  });
});
