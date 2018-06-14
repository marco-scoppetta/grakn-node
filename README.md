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
>>> const session = new GraknSession('localhost:48555', 'keyspace');
>>> const graknTx = await session.open(session.txType.WRITE);
```

You can write to the graph:

```
>>> graknTx.execute('insert person sub entity;').then((resp) => { console.log(resp.baseType); });
// "ENTITY_TYPE"
```

Execute Graql query (inside an `async` function):

```
const tx = await session.open(client.txType.WRITE);
const result = await tx.execute("match $x isa person; limit 10; get;");
const concepts = result.map(answerMap => Array.from(answerMap.values())).reduce((a, c) => a.concat(c), []);
// `concepts` will be an array containing 10 Entity objects
```

# API Reference

First create a new GraknSession with 

```
const session = new GraknSession(String URI, String keyspace)
```

on the returned session you will then be able to call the following methods:

**GraknSession**
| Method Name            | Return type | Description                                                            |
| ---------------------- | ----------- | ---------------------------------------------------------------------- |
| `open(session.txType)` | *GraknTx*   | Return a new or existing GraknTx bound to the keyspace of this session |
| **N.I. --**`delete()`  | *void*      | Deletes keyspace of this session                                       |
 

Once obtained a `GraknTx` you will be able to:

 **GraknTx**  
 
| Method Name                                        | Return type                       | Description                                                                                                                                                   |
| -------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `execute(String graqlQuery)`                       | Array of Map<*String*, *Concept*> | Executes a Graql query on the session keyspace. It returns a list of Maps, in each map the key represents the Graql variable specified in the query           |
| `commit()`                                         | *void*                            | Commit current GraknTx, persisting changes in the graph. After committing, the transaction will be closed and you will need to get a new one from the session |
| `getConcept(String conceptId)`                     | *Concept*                         | Retrieves a Concept by ConceptId                                                                                                                              |
| `getSchemaConcept(String label)`                   | *SchemaConcept*                   | Retrieves a SchemaConcept by label                                                                                                                            |
| **N.I. --**`getAttributesByValue(attributeValue)`  | Array of *Attribute*              | Get all Attributes holding the value provided, if any exists                                                                                                  |
| `putEntityType(String label)`                      | *EntityType*                      | Create a new EntityType with super-type entity, or return a pre-existing EntityType with the specified label                                                  |
| `putRelationshipType(String label)`                | *RelationshipType*                | Create a new RelationshipType with super-type relation, or return a pre-existing RelationshipType with the specified label                                    |
| `putAttributeType(String label, session.dataType)` | *AttributeType*                   | Create a new AttributeType with super-type attribute, or return a pre-existing AttributeType with the specified label and DataType                            |
| `putRole(String label)`                            | *Role*                            | Create a Role, or return a pre-existing Role, with the specified label.                                                                                       |
| **N.I. --**`putRule()`                             | *Rule*                            |                                                                                                                                                               |  |

**Concepts hierarchy** 

Grakn is composed of different types of Concepts, that have a specific hierarchy

```
                                         Concept
                                        /       \
                                      /           \
                                    /               \
                                  /                   \
                          SchemaConcept                    Thing
                          /     |    \                    /   |  \
                        /       |     \                 /     |    \
                      /         |      \              /       |      \
                     Type      Rule    Role     Entity    Attribute   Relationship
                /     |     \
               /      |       \
             /        |         \
    EntityType     AttributeType  RelationshipType
```


**Concept** 

These methods are available on every type of `Concept` 

| Method Name            | Return type | Description                                      |
| ---------------------- | ----------- | ------------------------------------------------ |
| `delete()`             | *void*      | Delete concept                                   |
| `isSchemaConcept()`    | *Boolean*   | Check whether this Concept is a SchemaConcept    |
| `isType() `            | *Boolean*   | Check whether this Concept is a Type             |
| `isThing() `           | *Boolean*   | Check whether this Concept is a Thing            |
| `isAttributeType()`    | *Boolean*   | Check whether this Concept is an AttributeType   |
| `isEntityType() `      | *Boolean*   | Check whether this Concept is an EntityType      |
| `isRelationshipType()` | *Boolean*   | Check whether this Concept is a RelationshipType |
| `isRole()`             | *Boolean*   | Check whether this Concept is a Role             |
| `isRule()`             | *Boolean*   | Check whether this Concept is a Rule             |
| `isAttribute()`        | *Boolean*   | Check whether this Concept is an Attribute       |
| `isEntity()`           | *Boolean*   | Check whether this Concept is a Entity           |
| `isRelationship()`     | *Boolean*   | Check whether this Concept is a Relationship     |
  
  **Schema concept**  

A `SchemaConcept` concept has all the `Concept` methods plus the following:

| Method Name    | Return type                | Description                                                                                                                                                          |
| -------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getLabel()`   | *String*                   | Get label of this SchemaConcept                                                                                                                                      |
| `setLabel()`   | *void*                     | Set label of this SchemaConcept                                                                                                                                      |
| `isImplicit()` | *Boolean*                  | Returns `true` when the SchemaConcept is implicit, i.e. when it's been created by Grakn and not explicitly by the user, `false` when explicitly created by the user. |
| `sup(Type)`    | *void*                     | Set direct super SchemaConcept of this SchemaConcept                                                                                                                 |
| `sup()`        | *SchemaConcept*  or *null* | Get direct super SchemaConcept of this SchemaConcept                                                                                                                 |
| `subs()`       | Array of *SchemaConcept*   | Get all indirect subs of this SchemaConcept.                                                                                                                         |
| `sups()`       | Array of *SchemaConcept*   | Get all indirect sups of this SchemaConcept.                                                                                                                         |
   
  **Thing** 

 A `Thing` concept has all the `Concept` methods plus the following: 

 | Method Name                         | Return type             | Description                                                                                                                                                                       |
 | ----------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
 | `isInferred()`                      | *Boolean*               | Returns `true` if this Thing is inferred by Reasoner, `false` otherwise                                                                                                           |
 | `type()`                            | *Type*                  | Returns a Type which is the type of this Thing. This Thing is an instance of that type.                                                                                           |
 | `relationships(...Role)`            | Array of *Relationship* | Returns Relationships which this Thing takes part in, which may **optionally** be narrowed to a particular set according to the Roles you are interested in                       |
 | `attributes(...AttributeType)`      | Array of *Attribute*    | Returns Attributes attached to this Thing, which may **optionally** be narrowed to a particular set according to the AttributeTypes you are interested in                         |
 | `plays()`                           | Array of *Role*         | Returns the Roles that this Thing is currently playing                                                                                                                            |
 | **N.I. --**`keys(...Attributetype)` | Array of *Attribute*    | Returns a collection of Attribute attached to this Thing as a key, which may **optionally** be narrowed to a particular set according to the AttributeTypes you are interested in |
 | `attribute(Attribute)`              | *void*                  | Attaches the provided Attribute to this Thing                                                                                                                                     |
 | `deleteAttribute(Attribute)`        | *void*                  | Removes the provided Attribute from this Thing                                                                                                                                    |
   
  **Attribute** 

  An `Attribute` concept has all the `Thing` methods plus the following:

  
 | Method Name        | Return type      | Description                                               |
 | ------------------ | ---------------- | --------------------------------------------------------- |
 | `dataType()`       | *String*         | Returns DataType of this Attribute                        |
 | `getValue()`       | *String*         | Get value of this Attribute                               |
 | `ownerInstances()` | Array of *Thing* | Returns the set of all Things that possess this Attribute |
   
  **Relationship**  

A `Relationship` concept has all the `Thing` methods plus the following:

  
| Method Name                     | Return type               | Description                                                                                              |
| ------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------- |
| `allRolePlayers()`              | Map<*Role*, Set<*Thing*>> | Returns a Map that links all the Roles of this Relationship to all the Things that are playing each Role |
| `rolePlayers(...Role)`          | Array of *Thing*          | Returns a list of every Thing involved in this Relationship, optionally filtered by Roles played         |
| `addRolePlayer(Role, Thing)`    | *void*                    | Expands this Relationship to include a new role player (Thing) which is playing a specific Role          |
| `removeRolePlayer(Role, Thing)` | *void*                    | Removes the Thing which is playing a Role in this Relationship.                                          |  |

    NB: There are no specific methods for `Entity` concept.

  **Type**  

A `Type` concept has all the `SchemaConcept` methods plus the following:

  
| Method Name                      | Return type              | Description                                                                                                                    |
| -------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `setAbstract(Boolean)`           | *void*                   | Sets the Type to be abstract - which prevents it from having any instances                                                     |
| `isAbstract()`                   | *Boolean*                | Returns `true` if the type is set to abstract, `false` otherwise                                                               |
| `plays()`                        | Array of *Role*          | Returns all the Roles which instances of this Type can indirectly play                                                         |
| `plays(Role)`                    | *void*                   | Add a new Role to the ones that the instances of this Type are allowed to play                                                 |
| `attributes()`                   | Array of *AttributeType* | The AttributeTypes which this Type is linked with.                                                                             |
| `instances()`                    | Array of *Thing*         | Get all indirect instances of this Type                                                                                        |
| `keys()`                         | Array of *AttributeType* | The AttributeTypes which this Type is linked with as a key                                                                     |
| `key(AttributeType)`             | *void*                   | Creates an implicit RelationshipType which allows this Type and a AttributeType to be linked in a strictly one-to-one mapping. |
| `attribute(AttributeType)`       | *void*                   | Add a new AttributeType which the instances of this Type are allowed to have attached to themselves                            |
| `deletePlays(Role)`              | *void*                   | Delete a Role from the ones that the instances of this Type are allowed to play                                                |
| `deleteAttribute(AttributeType)` | *void*                   | Delete AttributeType from the ones that the instances of this Type are allowed to have attached to themselves                  |
| `deleteKey(AttributeType)`       | *void*                   | Delete AttributeType from available keys                                                                                       |
  
  **AttributeType**

  An `AttributeType` concept has all the `Type` methods plus the following:

  
  | Method Name             | Return type           | Description                                                                                                                                              |
  | ----------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `putAttribute(value)`   | *Attribute*           | Returns new or existing Attribute of this type with the provided value. The value provided must conform to the DataType specified for this AttributeType |
  | `getAttribute(value)`   | *Attribute* or *null* | Returns the Attribute with the provided value or null if no such Attribute exists                                                                        |
  | `getDataType()`         | *String*              | Get the data type to which instances of the AttributeType must have                                                                                      |
  | **N.I. --**`getRegex()` | *String* or *null*    | Retrieve the regular expression to which instances of this AttributeType must conform to, or `null` if no regular expression is set                      |
  | **N.I. --**`setRegex()` | *void*                | Set the regular expression that instances of the AttributeType must conform to                                                                           |
   
  **RelationshipType**  

  A `RelationshipType` concept has all the `Type` methods plus the following:
 
 | Method Name           | Return type     | Description                                                                          |
 | --------------------- | --------------- | ------------------------------------------------------------------------------------ |
 | `addRelationship()`   | *Relationship*  | Creates and returns a new Relationship instance, whose direct type will be this type |
 | `relates()`           | Array of *Role* | Returns a list of the RoleTypes which make up this RelationshipType                  |
 | `relates(Role)`       | *void*          | Sets a new Role for this RelationshipType                                            |
 | `deleteRelates(Role)` | *void*          | Delete a Role from this RelationshipType                                             |
  
  **EntityType**  

  An `EntityType` concept has all the `Type` methods plus the following:

  | Method Name   | Return type | Description                                                                    |
  | ------------- | ----------- | ------------------------------------------------------------------------------ |
  | `addEntity()` | *Entity*    | Creates and returns a new Entity instance, whose direct type will be this type |


  **Role**  

  A `Role` concept has all the `SchemaConcept` methods plus the following:
  
| Method Name           | Return type                 | Description                                                 |
| --------------------- | --------------------------- | ----------------------------------------------------------- |
| `relationshipTypes()` | Array of *RelationshipType* | Returns the RelationshipTypes that this Role takes part in. |
| `playedByTypes()`     | Array of *Type*             | Returns a collection of the Types that can play this Role   |
  
  **Rule**  

A `Rule` concept has all the `SchemaConcept` methods plus the following:  
  
| Method Name             | Return type        | Description                                                                                                |
| ----------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------- |
| **N.I. --** `getWhen()` | *String* or *null* | Retrieves the when part of this Rule. When this query is satisfied the "then" part of the rule is executed |
| **N.I. --** `getThen()` | *String* or *null* | Retrieves the then part of this Rule. This query is executed when the "when" part of the rule is satisfied |
