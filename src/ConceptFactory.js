const MethodBuilder = require("./MethodBuilder");

function createConcept(grpcConcept, stream) {
  switch (grpcConcept.getBasetype()) {
    case 0:
      return new Entity();
      break;
    case 1:
      return new Relationship();
      break;
    case 2:
      return new Attribute();
      break;
    case 3:
      return new EntityType();
      break;
    case 4:
      return new RelationshipType(grpcConcept.getId(), stream);
      break;
    case 5:
      return new AttributeType();
      break;
    case 6:
      return new Role();
      break;
    case 7:
      return new Rule();
      break;
    case 8:
      return new MetaType();
      break;
    default:
      throw "BaseType not recognised.";
  }
}

const ConceptMethods = function(baseType) {
  return {
    delete: function() {
      const deleteMethod = MethodBuilder.delete(this.id);
      this.stream.write(deleteMethod);
    },
    getBaseType: function() {
      return baseType;
    }
  };
};

const TypeMethods = {
  getInstances: function() {},
  isType: function() {
    return true;
  }
};

const SchemaConceptMethods = {
  getLabel: function() {},
  setLabel: function() {},
  isImplicit: function() {},
  getSubConcepts: function() {},
  getSuperConcepts: function() {},
  getDirectSuperConcept: function() {},
  setDirectSuperConcept: function() {},
  isSchemaConcept: function() {
    return true;
  }
};

const RelationshipTypeMethods = {
  getRelatedRoles: function() {},
  setRelatedRole: function() {},
  unsetRelatedRole: function() {}
};

function _buildState(conceptId, duplex) {
  return {
    id: { value: conceptId },
    stream: { value: duplex }
  };
}

// Each new object gets created by composing all the methods of super types

function AttributeType() {}

function RelationshipType(conceptId, stream) {
  // Compose methods of super types: Concept and Type
  const methods = Object.assign(
    ConceptMethods("RELATIONSHIP_TYPE"),
    TypeMethods,
    SchemaConceptMethods,
    RelationshipTypeMethods
  );
  return Object.create(methods, _buildState(conceptId, stream));
}

function EntityType() {}

function Relationship() {}

function Attribute() {}

function Entity() {}

function Role() {}

function Rule() {}

function MetaType() {}

module.exports = { createConcept };
