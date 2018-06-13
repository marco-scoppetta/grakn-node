# Grakn Node.js Client

A Node.js client for [Grakn](https://grakn.ai)

Requires Grakn 1.2.0

# Installation

To install the Grakn client, simply run:

```
npm install grakn
```

You will also need access to a Grakn database. Head [here](https://grakn.ai/pages/documentation/get-started/setup-guide.html) to get started with Grakn.

# Quickstart

Begin by importing the Grakn session:

```
>>> const GraknSession = require('grakn');
```

Now you can create a new session and open a new Grakn transaction:

```
>>> const session = new GraknSession('http://localhost:4567', 'keyspace');
>>> const graknTx = await session.open(session.txType.WRITE);
```

You can write to the graph:

```
>>> graknTx.execute('insert person sub entity;').then((resp) => { console.log(resp.baseType); });
// "ENTITY_TYPE"
```


# API Reference
Execute Graql query (inside an `async` function):

```
const tx = await session.open(client.txType.WRITE);
const result = await tx.execute("match $x isa person; limit 10; get;");
const concepts = result.map(answerMap => Array.from(answerMap.values())).reduce((a, c) => a.concat(c), []);
// `concepts` will be an array containing 10 Entity obbjects
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
**GraknSession**

  `GraknSession(String URI, String keyspace, {username: String, password: String})` 
  **e.g.** `const session = new GraknSession("localhost:48555", "grakn")`  
  
  
 `open(session.txType)` - **Returns:** `GraknTx` object   
 **N.I. --**`delete(String keyspace)` - **Returns:** void 
 
 **GraknTx**  
 
  `execute(String graqlQuery)` - **Returns:** Array of `Map<String, Concept>` (key of the map represents the graql variable)  
  `commit()` - **Returns:** void  
  `getConcept(String conceptId)` - **Returns:** `Concept` object or `null`  
  `getSchemaConcept(String label)` - **Returns:** `Concept` object or `null`  
  **N.I. --**`getAttributesByValue(attributeValue)` - **Returns:** Array of `Attribute` objects   
  `putEntityType(String label)` - **Returns:** `EntityType` object  
  `putRelationshipType(String label)`- **Returns:** `RelationshipType` object   
  `putAttributeType(String label, session.dataType)`- **Returns:** `AttributeType` object   
  `putRole(String label)` - **Returns:** `Role` object   
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
   `setLabel()` - **Returns:** void   
   `isImplicit()` - **Returns:** `boolean`  
   `sup(Type)` - (setter) **Returns:** `null` object  
   `sup()` - **Returns:** `null` or `SchemaConcept` object  
   `subs()` - **Returns:** Array of `SchemaConcept` objects   
   `sups()`- **Returns:** Array of `SchemaConcept` objects  
   
  **Thing** 
  
   `isInferred()` - **Returns:** `boolean`  
   `type()` - **Returns:** `SchemaConcept` object   
   `relationships()` - **Returns:** Array of `Relationship` objects   
   `attributes()` - **Returns:** Array of `Attribute` objects   
   `plays()` - **Returns:** Array of `Role` objects   
   `relationships(...Role)` - **Returns:** Array of `Relationship` objects  
    **N.I. --**`keys()` - **Returns:** Array of `Attribute` objects   
    **N.I. --**`keys(...Attributetype)` - **Returns:** Array of `Attribute` objects   
    `attribute(Attribute)` - **Returns:** void 
    `deleteAttribute(Attribute)` - **Returns** void 
   
  **Attribute** 
   
   `dataType()` - **Returns:** `String`   
   `getValue()` - **Returns:** `String` or `Number`   
   `ownerInstances()` - **Returns:** Array of `Thing` objects   
   
  **Relationship**  
  
  `allRolePlayers()` - **Returns:** `Map<Role, Set<Thing>>`   
  `rolePlayers()` - **Returns:** Array of `Thing` objects   
  `rolePlayers(...Role)` - **Returns:** Array of `Thing` objects, filtered by `Role`  
  `addRolePlayer(Role, Thing)` - **Returns:**  `void`      
  `removeRolePlayer(Role, Thing)` - **Returns:**  `void`    
  
  **Type**  
  
  `setAbstract(boolean)` - **Returns:** void   
  `isAbstract()` - **Returns:** `boolean`   
  `plays()` - **Returns:** Array of `Role` objects  
  `plays(Role)` - **Returns:** `void`   
  `attributes()` - **Returns:** Array of `AttributeType` objects  
  `instances()` - **Returns:** Array of `Thing` objects   
  `keys()` - **Returns:** Array of `AttributeType` objects    
  `key(AttributeType)` - **Returns:**  `void`  
  `attribute(AttributeType)` - **Returns:** `void`  
  `deletePlays(Role)` - **Returns:** `void`  
  `deleteAttribute(AttributeType)` - **Returns:** `void`  
  `deleteKey(AttributeType)` - **Returns:** `void`  
  
  **AttributeType**
  
  `putAttribute(value)` - **Returns:**  new `Attribute` object
  `getAttribute(Value)` - **Returns:**  `Attribute` object or `null`
  `getDataType()` - **Returns:** `String`   
  **N.I. --**`getRegex()` - **Returns:**  
  **N.I. --**`setRegex()` - **Returns:**  
   
  **RelationshipType**  
  `addRelationship()` - **Returns:** `Relationship` object   
  `relates()` - **Returns:**  - Array of `Role` objects     
  `relates(Role)` - **Returns:**  - `void`    
  `deleteRelates(Role)` - **Returns:** `void`  
  
  **EntityType**  
  `addEntity()` - **Returns:** new `Entity` object  

  **Role**  
  
  `relationshipTypes()` - **Returns:** Array of `RelationshipType` objects  
  `playedByTypes()` - **Returns:** Array of `Type` objects  
  
  **Rule**    
  
   **N.I. --**`getWhen()` - **Returns:**  
   **N.I. --**`getThen()` - **Returns:**  
