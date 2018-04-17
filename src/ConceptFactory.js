const SchemaConcept = require("./methods/SchemaConcept");
const RelationshipType = require("./methods/RelationshipType");
const Concept = require("./methods/Concept");
const Type = require("./methods/Type");

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
    Concept.getMethods("ATTRIBUTE_TYPE"),
    Type.getMethods(),
    SchemaConcept.getMethods()
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function RelationshipType(conceptId, communicator) {
  const methods = Object.assign(
    Concept.getMethods("RELATIONSHIP_TYPE"),
    SchemaConcept.getMethods(),
    Type.getMethods(),
    RelationshipType.getMethods()
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function EntityType(conceptId, communicator) {
  const methods = Object.assign(
    Concept.getMethods("ENTITY_TYPE"),
    SchemaConcept.getMethods(),
    Type.getMethods()
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function Relationship(conceptId, communicator) {}

function Attribute(conceptId, communicator) {}

function Entity(conceptId, communicator) {}

function Role(conceptId, communicator) {
  const methods = Object.assign(
    Concept.getMethods("ROLE"),
    SchemaConcept.getMethods()
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function Rule(conceptId, communicator) {
  const methods = Object.assign(
    ConceptMethods("RULE"),
    SchemaConcept.getMethods()
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function MetaType(conceptId, communicator) {
  const methods = ConceptMethods("THING");
  return Object.create(methods, _buildState(conceptId, communicator));
}

module.exports = { createConcept };
