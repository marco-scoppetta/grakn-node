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
      return new RelationshipType();
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

function _buildState(conceptId, duplex) {
  return {
    id: { value: conceptId },
    stream: { value: duplex }
  };
}

function AttributeType() {}

function RelationshipType() {
  return Object.create;
}

function EntityType() {}

function Relationship() {}

function Attribute() {}

function Entity() {}

function Role() {}

function Rule() {}

function MetaType() {}

module.exports = { createConcept };
