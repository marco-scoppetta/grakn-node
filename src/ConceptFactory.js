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
      return Object.create(entityProto, state);
      break;
    case 1:
      state = _buildState(conceptId, ConceptMethods.RELATIONSHIP, this.txService);
      return Object.create(relationshipProto, state);
      break;
    case 2:
      state = _buildState(conceptId, ConceptMethods.ATTRIBUTE, this.txService);
      return Object.create(attributeProto, state);
      break;
    case 3:
      state = _buildState(conceptId, ConceptMethods.ENTITY_TYPE, this.txService);
      return Object.create(entityTypeProto, state);
      break;
    case 4:
      state = _buildState(conceptId, ConceptMethods.RELATIONSHIP_TYPE, this.txService);
      return Object.create(relationshipTypeProto, state);
      break;
    case 5:
      state = _buildState(conceptId, ConceptMethods.ATTRIBUTE_TYPE, this.txService);
      return Object.create(attributeTypeProto, state);
      break;
    case 6:
      state = _buildState(conceptId, ConceptMethods.ROLE, this.txService);
      return Object.create(roleProto, state);
      break;
    case 7:
      state = _buildState(conceptId, ConceptMethods.RULE, this.txService);
      return Object.create(ruleProto, state);
      break;
    case 8:
      state = _buildState(conceptId, ConceptMethods.META_TYPE, this.txService);
      return Object.create(metaschemaProto, state);
      break;
    default:
      throw "BaseType not recognised.";
  }
}

function _buildState(conceptId, baseType, txService) {
  return {
    id: { value: conceptId, enumerable: true },
    baseType: { value: baseType, enumerable: true },
    txService: { value: txService, enumerable: true }
  };
}

// Each new object gets created by composing all the methods of super types
const attributeTypeProto = Object.assign(
  ConceptMethods.get(),
  TypeMethods.get(),
  SchemaConceptMethods.get(),
  AttributeTypeMethods.get()
);

const relationshipTypeProto = Object.assign(
  ConceptMethods.get(),
  SchemaConceptMethods.get(),
  TypeMethods.get(),
  RelationshipTypeMethods.get()
);

const entityTypeProto = Object.assign(
  ConceptMethods.get(),
  ConceptMethods.get(),
  SchemaConceptMethods.get(),
  TypeMethods.get(),
  EntityTypeMethods.get()
);

const relationshipProto = Object.assign(
  ConceptMethods.get(),
  ThingMethods.get(),
  RelationshipMethods.get()
);

const attributeProto = Object.assign(
  ConceptMethods.get(),
  ThingMethods.get(),
  AttributeMethods.get()
);

const entityProto = Object.assign(
  ConceptMethods.get(),
  ThingMethods.get(),
  EntityMethods.get()
);

const roleProto = Object.assign(
  ConceptMethods.get(),
  SchemaConceptMethods.get(),
  RoleMethods.get()
);

const ruleProto = Object.assign(
  ConceptMethods.get(),
  SchemaConceptMethods.get(),
  RuleMethods.get()
);

const metaschemaProto = Object.assign(
  ConceptMethods.get(),
  SchemaConceptMethods.get(),
);

module.exports = ConceptFactory;
