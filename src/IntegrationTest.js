const GraknClient = require("./GraknClient");

const client = new GraknClient("localhost:48555", "grakn", {
  username: "cassandra",
  password: "cassandra"
});

client.execute("match $x; get;").then(result => {
  result.forEach(map => {
    map.forEach((value, key) => {
      value.getLabel().then(resp => {
        console.log(resp);
      });
    });
  });
});
