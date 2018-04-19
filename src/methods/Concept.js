const MethodBuilder = require("../util/MethodBuilder");

const THING = "THING";
const ATTRIBUTE_TYPE = "ATTRIBUTE_TYPE";
const RELATIONSHIP_TYPE = "RELATIONSHIP_TYPE";
const ENTITY_TYPE = "ENTITY_TYPE";
const ENTITY = "ENTITY";
const ATTRIBUTE = "ATTRIBUTE";
const RELATIONSHIP = "RELATIONSHIP";
const ROLE = "ROLE";
const RULE = "RULE";

const SCHEMA_CONCEPTS = new Set([
  RULE,
  ROLE,
  ATTRIBUTE_TYPE,
  RELATIONSHIP_TYPE,
  ENTITY_TYPE
]);

const TYPES = new Set([ATTRIBUTE_TYPE, RELATIONSHIP_TYPE, ENTITY_TYPE]);

const THINGS = new Set([ATTRIBUTE, RELATIONSHIP, ATTRIBUTE, ENTITY]);

const methods = function (baseType) {
  return {
    delete: function () {
      const deleteMethod = MethodBuilder.delete(this.id);
      return this.communicator.send(deleteMethod);
    },
    getBaseType: function () {
      return baseType;
    },
    isSchemaConcept: () => SCHEMA_CONCEPTS.has(baseType),
    isType: () => TYPES.has(baseType),
    isThing: () => THINGS.has(baseType),
    isAttributeType: () => baseType === ATTRIBUTE_TYPE,
    isEntityType: () => baseType === ENTITY_TYPE,
    isRelationshipType: () => baseType === RELATIONSHIP_TYPE,
    isRole: () => baseType === ROLE,
    isRule: () => baseType === RULE,
    isAttribute: () => baseType === ATTRIBUTE,
    isEntity: () => baseType === ENTITY,
    isRelationship: () => baseType === RELATIONSHIP
  };
};

module.exports = {
  get: function (baseType) {
    return methods(baseType);
  },
  THING,
  ATTRIBUTE,
  ATTRIBUTE_TYPE,
  ROLE,
  RULE,
  RELATIONSHIP,
  RELATIONSHIP_TYPE,
  ENTITY,
  ENTITY_TYPE
};
