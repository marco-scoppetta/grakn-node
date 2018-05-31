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
const TxService = require("./TxService");

// Empty constructor for now so that we create object and inject/mock
function ConceptFactory(txService) {
  this.txService = txService;
}

ConceptFactory.prototype.createConcept = function createConcept(grpcConcept) {
  const conceptId = grpcConcept.getId().getValue();
  let state;
  switch (grpcConcept.getBasetype()) {
    case 0:
      state = _buildState(conceptId, ConceptMethods.ENTITY, this.txService);
      return Object.assign(entityProto, state);
      break;
    case 1:
      state = _buildState(conceptId, ConceptMethods.RELATIONSHIP, this.txService);
      return Object.assign(relationshipProto, state);
      break;
    case 2:
      state = _buildState(conceptId, ConceptMethods.ATTRIBUTE, this.txService);
      return Object.assign(attributeProto, state);
      break;
    case 3:
      state = _buildState(conceptId, ConceptMethods.ENTITY_TYPE, this.txService);
      return Object.assign(entityTypeProto, state);
      break;
    case 4:
      state = _buildState(conceptId, ConceptMethods.RELATIONSHIP_TYPE, this.txService);
      return Object.assign(relationshipTypeProto, state);
      break;
    case 5:
      state = _buildState(conceptId, ConceptMethods.ATTRIBUTE_TYPE, this.txService);
      return Object.assign(attributeTypeProto, state);
      break;
    case 6:
      state = _buildState(conceptId, ConceptMethods.ROLE, this.txService);
      return Object.assign(roleProto, state);
      break;
    case 7:
      state = _buildState(conceptId, ConceptMethods.RULE, this.txService);
      return Object.assign(ruleProto, state);
      break;
    case 8:
      state = _buildState(conceptId, ConceptMethods.META_TYPE, this.txService);
      return Object.assign(metaschemaProto, state);
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
const attributeTypeProto = Object.create(Object.assign(
  ConceptMethods.get(),
  TypeMethods.get(),
  SchemaConceptMethods.get(),
  AttributeTypeMethods.get()
));

const relationshipTypeProto = Object.create(Object.assign(
  ConceptMethods.get(),
  SchemaConceptMethods.get(),
  TypeMethods.get(),
  RelationshipTypeMethods.get()
));

const entityTypeProto = Object.create(Object.assign(
  ConceptMethods.get(),
  ConceptMethods.get(),
  SchemaConceptMethods.get(),
  TypeMethods.get(),
  EntityTypeMethods.get()
));

const relationshipProto = Object.create(Object.assign(
  ConceptMethods.get(),
  ThingMethods.get(),
  RelationshipMethods.get()
));

const attributeProto = Object.create(Object.assign(
  ConceptMethods.get(),
  ThingMethods.get(),
  AttributeMethods.get()
));

const entityProto = Object.create(Object.assign(
  ConceptMethods.get(),
  ThingMethods.get(),
  EntityMethods.get()
));

const roleProto = Object.create(Object.assign(
  ConceptMethods.get(),
  SchemaConceptMethods.get(),
  RoleMethods.get()
));

const ruleProto = Object.create(Object.assign(
  ConceptMethods.get(),
  SchemaConceptMethods.get(),
  RuleMethods.get()
));

const metaschemaProto = Object.create(Object.assign(
  ConceptMethods.get(),
  SchemaConceptMethods.get(),
));

module.exports = ConceptFactory;
