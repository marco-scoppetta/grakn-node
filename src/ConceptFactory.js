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

function createConcept(grpcConcept, communicator) {
  const conceptId = grpcConcept.getId();
  switch (grpcConcept.getBasetype()) {
    case 0:
      return new Entity(conceptId, communicator);
      break;
    case 1:
      return new Relationship(conceptId, communicator);
      break;
    case 2:
      return new Attribute(conceptId, communicator);
      break;
    case 3:
      return new EntityType(conceptId, communicator);
      break;
    case 4:
      return new RelationshipType(conceptId, communicator);
      break;
    case 5:
      return new AttributeType(conceptId, communicator);
      break;
    case 6:
      return new Role(conceptId, communicator);
      break;
    case 7:
      return new Rule(conceptId, communicator);
      break;
    case 8:
      return new MetaType(conceptId, communicator);
      break;
    default:
      throw "BaseType not recognised.";
  }
}

function _buildState(conceptId, communicator) {
  return {
    id: { value: conceptId },
    communicator: { value: communicator }
  };
}

// Each new object gets created by composing all the methods of super types

function AttributeType(conceptId, communicator) {
  // Compose methods of super types: Concept , SchemaConcept andType
  const methods = Object.assign(
    ConceptMethods.get("ATTRIBUTE_TYPE"),
    TypeMethods.get(),
    SchemaConceptMethods.get(),
    AttributeTypeMethods.get()
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function RelationshipType(conceptId, communicator) {
  const methods = Object.assign(
    ConceptMethods.get("RELATIONSHIP_TYPE"),
    SchemaConceptMethods.get(),
    TypeMethods.get(),
    RelationshipTypeMethods.get()
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function EntityType(conceptId, communicator) {
  const methods = Object.assign(
    ConceptMethods.get("ENTITY_TYPE"),
    SchemaConceptMethods.get(),
    TypeMethods.get(),
    EntityTypeMethods.get()
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function Relationship(conceptId, communicator) {
  const methods = Object.assign(
    ConceptMethods.get("RELATIONSHIP"),
    ThingMethods.get(),
    RelationshipMethods.get()
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function Attribute(conceptId, communicator) {
  const methods = Object.assign(
    ConceptMethods.get("ATTRIBUTE"),
    ThingMethods.get(),
    AttributeMethods.get()
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function Entity(conceptId, communicator) {
  const methods = Object.assign(
    ConceptMethods.get("ENTITY"),
    ThingMethods.get()
    // There are no specific methods for Entity instance
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function Role(conceptId, communicator) {
  const methods = Object.assign(
    ConceptMethods.get("ROLE"),
    SchemaConceptMethods.get(),
    RoleMethods.get()
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function Rule(conceptId, communicator) {
  const methods = Object.assign(
    ConceptMethods.get("RULE"),
    SchemaConceptMethods.get(),
    RuleMethods.get()
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function MetaType(conceptId, communicator) {
  const methods = ConceptMethods.get("THING");
  return Object.create(methods, _buildState(conceptId, communicator));
}

module.exports = { createConcept };
