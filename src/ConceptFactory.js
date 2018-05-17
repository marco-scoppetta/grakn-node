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
const EntityMethods = require("./methods/Entity");


// Empty constructor for now so that we create object and inject/mock
function ConceptFactory() {
}

ConceptFactory.prototype.createConcept = function createConcept(grpcConcept, txService) {
  const conceptId = grpcConcept.getId().getValue();
  let state;
  switch (grpcConcept.getBasetype()) {
    case 0:
      state = _buildState(conceptId, ConceptMethods.ENTITY, txService);
      return new Entity(conceptId, state);
      break;
    case 1:
      state = _buildState(conceptId, ConceptMethods.RELATIONSHIP, txService);
      return new Relationship(conceptId, state);
      break;
    case 2:
      state = _buildState(conceptId, ConceptMethods.ATTRIBUTE, txService);
      return new Attribute(conceptId, state);
      break;
    case 3:
      state = _buildState(conceptId, ConceptMethods.ENTITY_TYPE, txService);
      return new EntityType(conceptId, state);
      break;
    case 4:
      state = _buildState(conceptId, ConceptMethods.RELATIONSHIP_TYPE, txService);
      return new RelationshipType(conceptId, state);
      break;
    case 5:
      state = _buildState(conceptId, ConceptMethods.ATTRIBUTE_TYPE, txService);
      return new AttributeType(conceptId, state);
      break;
    case 6:
      state = _buildState(conceptId, ConceptMethods.ROLE, txService);
      return new Role(conceptId, state);
      break;
    case 7:
      state = _buildState(conceptId, ConceptMethods.RULE, txService);
      return new Rule(conceptId, state);
      break;
    case 8:
      state = _buildState(conceptId, ConceptMethods.META_TYPE, txService);
      return new MetaSchemaConcept(conceptId, state);
      break;
    default:
      throw "BaseType not recognised.";
  }
}

function _buildState(conceptId, baseType, txService) {
  return {
    id: conceptId,
    baseType: baseType,
    txService: txService
  };
}

// Each new object gets created by composing all the methods of super types

function AttributeType(conceptId, state) {
  // Compose methods of super types: Concept , SchemaConcept andType
  const methods = Object.assign(
    ConceptMethods.get(),
    TypeMethods.get(),
    SchemaConceptMethods.get(),
    AttributeTypeMethods.get()
  );
  const superObj = Object.create(methods);
  return Object.assign(superObj, state);
}

function RelationshipType(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(),
    SchemaConceptMethods.get(),
    TypeMethods.get(),
    RelationshipTypeMethods.get()
  );
  const superObj = Object.create(methods);
  return Object.assign(superObj, state);
}

function EntityType(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(),
    SchemaConceptMethods.get(),
    TypeMethods.get(),
    EntityTypeMethods.get()
  );
  const superObj = Object.create(methods);
  return Object.assign(superObj, state);
}

function Relationship(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(),
    ThingMethods.get(),
    RelationshipMethods.get()
  );
  const superObj = Object.create(methods);
  return Object.assign(superObj, state);
}

function Attribute(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(),
    ThingMethods.get(),
    AttributeMethods.get()
  );
  const superObj = Object.create(methods);
  return Object.assign(superObj, state);
}

function Entity(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(),
    ThingMethods.get(),
    EntityMethods.get()
  );
  const superObj = Object.create(methods);
  return Object.assign(superObj, state);
}

function Role(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(),
    SchemaConceptMethods.get(),
    RoleMethods.get()
  );
  const superObj = Object.create(methods);
  return Object.assign(superObj, state);
}

function Rule(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(),
    SchemaConceptMethods.get(),
    RuleMethods.get()
  );
  const superObj = Object.create(methods);
  return Object.assign(superObj, state);
}

function MetaSchemaConcept(conceptId, state) {
  const methods = Object.assign(
    ConceptMethods.get(),
    SchemaConceptMethods.get(),
  );
  const superObj = Object.create(methods);
  return Object.assign(superObj, state);
}

module.exports = ConceptFactory;
