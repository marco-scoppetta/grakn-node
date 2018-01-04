# Grakn Node.js Client

A Node.js client for [Grakn](https://grakn.ai)

Requires Grakn 1.0.0

# Installation

To install the Grakn client, simply run:

```
npm install grakn
```

You will also need access to a Grakn database. Head [here](https://grakn.ai/pages/documentation/get-started/setup-guide.html) to get started with Grakn.

# Quickstart

Begin by importing the Grakn graph:

```
>>> const GraknGraph = require('grakn');
```

Now you can connect to a graph:

```
>>> const graph = new GraknGraph('http://localhost:4567', 'keyspace');
```

You can write to the graph:

```
>>> graph.execute('insert person sub entity;').then((resp) => { console.log(resp); });
[]
>>> graph.execute('insert name sub resource, datatype string;').then((resp) => { console.log(resp); });
[]
>>> graph.execute('insert person has name;').then((resp) => { console.log(resp); });
[]
>>> graph.execute('insert $bob isa person, has name "Bob";').then((resp) => { console.log(resp); });
['1234']
```

Or read from it:

```
>>> graph.execute('match $bob isa person, has name $name; select $name;')
         .then((resp) => { console.log(resp); })
         .catch((err) => { console.error(err); });
[{'name': {'isa': 'name', 'id': '3141816', 'value': 'Bob'}}]
```


# API Reference

#### `GraknGraph([uri],[keyspace])`

Constructor function that accepts two optional parameters:

- **uri**: default `http://localhost:4567`. URI of running graph.
- **keyspace**: default `grakn`. Keyspace name.

---

#### `execute(query, [params])`

It executes query against the running graph. It returns a Promise.

- **params** is an object which contains optional parameters to apply to the current transaction:
    - **infer**: Determine if inference must be used for the current query [default is **true**]. 
    - **multi**: Allow multiple queries to be executed in one single request/transaction [default is **false**].
    - **defineAllVars**: Define all anonymous variables in the query [default is **false**]. 
            E.g. `match ($x,$y); get;` would also return the anonymous relationship variable.
    - **loading**: Used to check if serialisation of results is needed. When set to `true`, the endpoint will not return a formatted response. [default is **false**]
    - **txType**: Transaction type. The following are valid value: 
        `graph.txType.WRITE` - Type of transaction that allows reading and writing on the graph. It also performs all the consistency checks and validations.  [This is the **default** value.]
        `graph.txType.READ` - Type of transaction that only allows reading from the graph. It also performs all the consistency checks and validations.
        `graph.txType.BATCH` - Type of transaction that allows reading and writing on the graph. It skips some consistency checks to allow faster writes to graph. Useful for for batch loading.
---