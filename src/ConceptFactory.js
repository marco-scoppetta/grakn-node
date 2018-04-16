const MethodBuilder = require("./MethodBuilder");

function createConcept(grpcConcept, communicator) {
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
      return new RelationshipType(grpcConcept.getId(), communicator);
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
      return;
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
  getLabel: function() {
    const getLabelMethod = MethodBuilder.getLabel(this.id);
    return this.communicator.send(getLabelMethod).then(resp => {
      return resp
        .getConceptresponse()
        .getLabel()
        .getValue();
    });
  },
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

function _buildState(conceptId, communicator) {
  return {
    id: { value: conceptId },
    communicator: { value: communicator }
  };
}

// Each new object gets created by composing all the methods of super types

function AttributeType() {}

function RelationshipType(conceptId, communicator) {
  // Compose methods of super types: Concept and Type
  const methods = Object.assign(
    ConceptMethods("RELATIONSHIP_TYPE"),
    TypeMethods,
    SchemaConceptMethods,
    RelationshipTypeMethods
  );
  return Object.create(methods, _buildState(conceptId, communicator));
}

function EntityType() {}

function Relationship() {}

function Attribute() {}

function Entity() {}

function Role() {}

function Rule() {}

function MetaType() {}

module.exports = { createConcept };
