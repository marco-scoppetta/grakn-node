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
>>> const GraknClient = require('grakn');
```

Now you can connect to a graph:

```
>>> const graph = new GraknClient('http://localhost:4567', 'keyspace');
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
Execute Graql query (inside an `async` function):

```
const tx = await graph.open(client.txType.WRITE);
const result = await tx.execute("match $x isa person; limit 10; get;");
    for (let map of result) {
        for (let [key, concept] of map) {
            //concept is an Entity object
        }
    }
```

**Concepts hierarchy** 

```
                                         Concept
                                        /       \
                                      /           \
                                    /               \
                                  /                   \
                          SchemaConcept                    Thing
                          /     |    \                    /   |  \
                        /      Rule  Role               /     |    \
                      /                               /       |      \
                     Type                        Entity    Attribute   Relationship
                /     |     \
               /      |       \
             /        |         \
    EntityType     AttributeType  RelationshipType
```
**GraknClient**
  `GraknClient(String URI, String keyspace, {username: String, password: String})`
  **e.g.** `let client = new gc("localhost:48555", "grakn", {username: "Marco", password: "Secret"})`
  
  
 `open(client.txType)` - **Returns:** `GraknTx` object (Tx will be already open)
 **N.I. --**`delete(String keyspace)` - **Returns:** void
 
 **GraknTx**
 
  `execute(String)` - **Returns:** Array of `Map<String, Concept>` (String represents the graql variable)
  **N.I. --**`commit()` - **Returns:** void
  **N.I. --**`getConcept(String conceptId)` - **Returns:** `Concept` object
  **N.I. --**`putEntityType()`
  **N.I. --**`putRelationshipType()`
  **N.I. --**`putAttributeType()`
  **N.I. --**`putRole()`
  **N.I. --**`putRule()`

**Concept**

  `delete()` - **Returns:** void (not tested)
  `isSchemaConcept()` - **Returns:** boolean
   `isType()` - **Returns:** boolean
   `isThing()` - **Returns:** boolean
   `isAttributeType()` - **Returns:** boolean
   `isEntityType()` - **Returns:** boolean
   `isRelationshipType()` - **Returns:** boolean
   `isRole()` - **Returns:** boolean
   `isRule()` - **Returns:** boolean
   `isAttribute()` - **Returns:** boolean
   `isEntity()` - **Returns:** boolean
   `isRelationship()` - **Returns:** boolean
  
  **Schema concept**
  
   `getLabel()` - **Returns:** string
   `setLabel()` - **Returns:** void  (not tested)
   `isImplicit()` - **Returns:** `boolean`
   `sup()` - **Returns:** `null` or `SchemaConcept` object
   `subs()` - **Returns:** Array of `SchemaConcept` objects
   `sups()`- **Returns:** Array of `SchemaConcept` objects
   
  **Thing**
  
   `isInferred()` - **Returns:** `boolean`
   `type()` - **Returns:** `SchemaConcept` object
   `relationships()` - **Returns:** Array of `Relationship` objects
   `attributes()` - **Returns:** Array of `Attribute` objects
   `plays()` - **Returns:** Array of `Role` objects
    **N.I. --**`relationships(...Role)` - **Returns:** Array of `Relationship` objects
    **N.I. --**`keys()` - **Returns:** Array of `Attribute` objects
    **N.I. --**`keys(...Attributetype)` - **Returns:** Array of `Attribute` objects
    **N.I. --**`attribute(Attribute)` - **Returns:** void
    **N.I. --**`deleteAttribute(Attribute)` - **Returns** void
   
  **Attribute**
   
   `dataType()` - **Returns:** `String`
   `getValue()` - **Returns:** `String` or `Number`
   `ownerInstances()` - **Returns:** Array of `Thing` objects
   
  **Relationship**
  
  `allRolePlayers()` - **Returns:** `Map<Role, Set<Thing>>`
  `rolePlayers()` - **Returns:** Array of `Role` objects
   **N.I. --**`rolePlayers(...Role)` - **Returns:** Array of `Role` objects
   **N.I. --**`addRolePlayer(Role, Thing)` - **Returns:**  `Relationship` object
   **N.I. --**`removeRolePlayer(Role, Thing)` - **Returns:**  void
  
  **Type**
  
   **N.I. --**`setAbstract()` - **Returns:** void
  `isAbstract()` - **Returns:** `boolean`
  `plays()` - **Returns:** Array of `Role` objects
  `attributes()` - **Returns:** Array of `AttributeType` objects
  `instances()` - **Returns:** Array of `Thing` objects
  **N.I. --**`keys()` - **Returns:** 
  **N.I. --**`keys(AttributeType)` - **Returns:** 
  **N.I. --**`attribute(AttributeType)` - **Returns:** 
  **N.I. --**`deletePlays(Role)` - **Returns:** 
  **N.I. --**`deleteAttribute(AttributeType)` - **Returns:** 
  **N.I. --**`deleteKey(AttributeType)` - **Returns:** 
  
  **AttributeType**
  
  **N.I. --**`putAttribute()` - **Returns:** 
  **N.I. --**`getAttribute(Value)` - **Returns:** 
  **N.I. --**`getDataType()` - **Returns:** 
  **N.I. --**`getRegex()` - **Returns:** 
  **N.I. --**`setRegex()` - **Returns:** 
   
  **RelationshipType**
  **N.I. --**`addRelationship()` - **Returns:** 
  **N.I. --**`relates()` - **Returns:**  - returns roles
  **N.I. --**`relates(Role)` - **Returns:**  - add new role
  **N.I. --**`deleteRelates(Role)` - **Returns:** 
  
  **EntityType**
  **N.I. --**`addEntity()` - **Returns:** new `Entity` object - creates new entity instance
  
  **Role**
  
  **N.I. --**`relationshipTypes()` - **Returns:**
  **N.I. --**`playedByTypes()` - **Returns:**
  
  **Rule**
  
   **N.I. --**`getWhen()` - **Returns:**
   **N.I. --**`getThen()` - **Returns:**
