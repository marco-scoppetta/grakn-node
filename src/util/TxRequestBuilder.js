const messages = require("../autogenerated/grakn_pb");
const ConceptsBaseType = require("../methods/Concept");

const UNIT_MESSAGE = new messages.Unit();

function TxRequest(conceptId, conceptMethod) {
  const idMessage = new messages.ConceptId();
  idMessage.setValue(conceptId);
  const TxRequest = new messages.TxRequest();
  const runConceptMethodRequest = new messages.RunConceptMethod();
  runConceptMethodRequest.setId(idMessage);
  runConceptMethodRequest.setConceptmethod(conceptMethod);
  TxRequest.setRunconceptmethod(runConceptMethodRequest);
  return TxRequest;
}

// Helper function

function convertBaseType(baseType) {
  switch (baseType) {
    case ConceptsBaseType.ATTRIBUTE: return messages.BaseType.ATTRIBUTE; break;
    case ConceptsBaseType.ATTRIBUTE_TYPE: return messages.BaseType.ATTRIBUTE_TYPE; break;
    case ConceptsBaseType.ENTITY: return messages.BaseType.ENTITY; break;
    case ConceptsBaseType.ENTITY_TYPE: return messages.BaseType.ENTITY_TYPE; break;
    case ConceptsBaseType.RELATIONSHIP: return messages.BaseType.RELATIONSHIP; break;
    case ConceptsBaseType.RELATIONSHIP_TYPE: return messages.BaseType.RELATIONSHIP_TYPE; break;
    case ConceptsBaseType.ROLE: return messages.BaseType.ROLE; break;
    case ConceptsBaseType.RULE: return messages.BaseType.RULE; break;
    case ConceptsBaseType.META_TYPE: return messages.BaseType.META_TYPE; break;
  }
}

function toGrpcConcept(conceptObject) {
  const conceptMessage = new messages.Concept();
  const conceptIdMessage = new messages.ConceptId();
  conceptIdMessage.setValue(conceptObject.id);
  conceptMessage.setId(conceptIdMessage);
  conceptMessage.setBasetype(convertBaseType(conceptObject.baseType));
  return conceptMessage;
}

const methods = {
  // Concept
  deleteConcept: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setDelete(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  // Schema concept
  getLabel: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetlabel(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  setLabel: function (conceptId, labelValue) {
    const conceptMethod = new messages.ConceptMethod();
    const labelMessage = new messages.Label();
    labelMessage.setValue(labelValue);
    conceptMethod.setSetlabel(labelMessage);
    return TxRequest(conceptId, conceptMethod);
  },

  isImplicit: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setIsimplicit(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getSubConcepts: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetsubconcepts(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getSuperConcepts: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetsuperconcepts(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getDirectSuperConcept: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetdirectsuperconcept(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  setDirectSuperConcept: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setSetdirectsuperconcept(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },

  // Rule

  getWhen: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetwhen(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getThen: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetthen(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  // Role
  getRelationshipTypesThatRelateRole: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetrelationshiptypesthatrelaterole(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getTypesThatPlayRole: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGettypesthatplayrole(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  // Type

  getInstances: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetinstances(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getAttributeTypes: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetattributetypes(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  setAttributeType: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setSetattributetype(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },
  unsetAttributeType: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setUnsetattributetype(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },
  getKeyTypes: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetkeytypes(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  setKeyType: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setSetkeytype(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },
  unsetKeyType: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setUnsetkeytype(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },
  isAbstract: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setIsabstract(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  setAbstract: function (conceptId, bool) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setSetabstract(bool);
    return TxRequest(conceptId, conceptMethod);
  },
  getRolesPlayedByType: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetrolesplayedbytype(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  setRolePlayedByType: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setSetroleplayedbytype(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },
  unsetRolePlayedByType: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setUnsetroleplayedbytype(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },

  // Entity Type

  addEntity: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setAddentity(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  // Relationship Type

  getRelatedRoles: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetrelatedroles(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  setRelatedRole: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setSetrelatedrole(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },

  unsetRelatedRole: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetrelatedroles(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },

  // Attribute type

  putAttribute: function (conceptId, dataType, value) {
    const conceptMethod = new messages.ConceptMethod();
    const attributeValue = new messages.AttributeValue();
    switch (dataType) {
      case 0: attributeValue.setString(value); break;
      case 1: attributeValue.setBoolean(value); break;
      case 2: attributeValue.setInteger(value); break;
      case 3: attributeValue.setLong(value); break;
      case 4: attributeValue.setFloat(value); break;
      case 5: attributeValue.setDouble(value); break;
      case 6: attributeValue.setDate(value); break;
    }
    conceptMethod.setPutattribute(attributeValue);
    return TxRequest(conceptId, conceptMethod);
  },
  getAttribute: function () {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetattribute(); // Pass a AttributeValue
    return TxRequest(conceptId, conceptMethod);
  },
  getDataTypeOfType: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetdatatypeoftype(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getRegex: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetregex(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  setRegex: function () {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setSetregex(); // Pass a OptionalRegex
    return TxRequest(conceptId, conceptMethod);
  },

  // Thing 

  isInferred: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setIsinferred(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getDirectType: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetdirecttype(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getRelationships: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetrelationships(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getRelationshipsByRoles: function (conceptId, roles) {
    const conceptsMessage = new messages.Concepts();
    const conceptMethod = new messages.ConceptMethod();
    const grpcConcepts = roles.map(role => toGrpcConcept(role))
    conceptsMessage.setConceptList(grpcConcepts);
    conceptMethod.setGetrelationshipsbyroles(conceptsMessage); // Pass Concepts
    return TxRequest(conceptId, conceptMethod);
  },

  getRolesPlayedByThing: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetrolesplayedbything(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getAttributes: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetattributes(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getAttributesByTypes: function () {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetattributesbytypes(); // Pass Concepts
    return TxRequest(conceptId, conceptMethod);
  },
  getKeys: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetkeys(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getKeysByTypes: function () {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetkeysbytypes(); // Pass Concepts
    return TxRequest(conceptId, conceptMethod);
  },
  setAttribute: function (conceptId, attribute) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setSetattribute(toGrpcConcept(attribute)); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },
  unsetAttribute: function (conceptId, attribute) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setUnsetattribute(toGrpcConcept(attribute));
    return TxRequest(conceptId, conceptMethod);
  },

  // Relationship

  addRelationship: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setAddrelationship(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getRolePlayers: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetroleplayers(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getRolePlayersByRoles: function () {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetroleplayersbyroles(); // Pass Concepts
    return TxRequest(conceptId, conceptMethod);
  },
  setRolePlayer: function () {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setSetroleplayer(); // Pass a RolePlayer
    return TxRequest(conceptId, conceptMethod);
  },
  unsetRolePlayer: function () {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setUnsetroleplayer(); // Pass a RolePlayer
    return TxRequest(conceptId, conceptMethod);
  },

  //Attribute
  getValue: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetvalue(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getOwners: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetowners(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getDataTypeOfAttribute: function (conceptId) {
    const conceptMethod = new messages.ConceptMethod();
    conceptMethod.setGetdatatypeofattribute(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

};

module.exports = methods;
