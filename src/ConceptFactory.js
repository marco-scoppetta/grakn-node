const SchemaConceptMethods = require("./methods/SchemaConcept");
const RelationshipTypeMethods = require("./methods/RelationshipType");
const ConceptMethods = require("./methods/Concept");
const TypeMethods = require("./methods/Type");
const ThingMethods = require("./methods/Thing");
const AttributeMethods = require("./methods/Attribute");
const RelationshipMethods = require("./methods/Relationship");
const RuleMethods = require("./methods/Rule");
const RoleMethods = require("./methods/Role");
const AttributeTypeMethods = require("./methods/AttributeType");
const EntityTypeMethods = require("./methods/EntityType");


// Empty constructor for now so that we create object and inject/mock
function ConceptFactory() {
}

ConceptFactory.prototype.createConcept = function createConcept(grpcConcept, txService) {
  const conceptId = grpcConcept.getId();
  const state = _buildState(conceptId, txService);
  switch (grpcConcept.getBasetype()) {
    case 0:
      return new Entity(conceptId, state);
      break;
    case 1:
      return new Relationship(conceptId, state);
      break;
    case 2:
      return new Attribute(conceptId, state);
      break;
    case 3:
      return new EntityType(conceptId, state);
      break;
    case 4:
      return new RelationshipType(conceptId, state);
      break;
    case 5:
      return new AttributeType(conceptId, state);
      break;
    case 6:
      return new Role(conceptId, state);
      break;
    case 7:
      return new Rule(conceptId, state);
      break;
    case 8:
      return new MetaType(conceptId, state);
      break;
    default:
      throw "BaseType not recognised.";
  }
}

function _buildState(conceptId, txService) {
  return {
    id: { value: conceptId },
    txService: { value: txService }
  };
}

// Each new object gets created by composing all the methods of super types

function AttributeType(conceptId, state) {
  // Compose methods of super types: Concept , SchemaConcept andType
  const methods = Object.assign(
    ConceptMethods.get(ConceptMethods.THING),
    TypeMethods.get(),
    SchemaConceptMethods.get(),
    AttributeTypeMethods.get()
  );
  return Object.create(methods, state);
}

function RelationshipType(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(ConceptMethods.RELATIONSHIP_TYPE),
    SchemaConceptMethods.get(),
    TypeMethods.get(),
    RelationshipTypeMethods.get()
  );
  return Object.create(methods, state);
}

function EntityType(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(ConceptMethods.ENTITY_TYPE),
    SchemaConceptMethods.get(),
    TypeMethods.get(),
    EntityTypeMethods.get()
  );
  return Object.create(methods, state);
}

function Relationship(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(ConceptMethods.RELATIONSHIP),
    ThingMethods.get(),
    RelationshipMethods.get()
  );
  return Object.create(methods, state);
}

function Attribute(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(ConceptMethods.ATTRIBUTE),
    ThingMethods.get(),
    AttributeMethods.get()
  );
  return Object.create(methods, state);
}

function Entity(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(ConceptMethods.ENTITY),
    ThingMethods.get()
    // There are no specific methods for Entity instance
  );
  return Object.create(methods, state);
}

function Role(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(ConceptMethods.ROLE),
    SchemaConceptMethods.get(),
    RoleMethods.get()
  );
  return Object.create(methods, state);
}

function Rule(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(ConceptMethods.RULE),
    SchemaConceptMethods.get(),
    RuleMethods.get()
  );
  return Object.create(methods, state);
}

function MetaType(conceptId, state) {
  const methods = ConceptMethods.get(ConceptMethods.THING);
  return Object.create(methods, state);
}

module.exports = ConceptFactory;
