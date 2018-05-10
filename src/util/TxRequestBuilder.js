const messages = require("../autogenerated/grakn_pb");
const conceptMessages = require("../autogenerated/concept_pb");

const UNIT_MESSAGE = new conceptMessages.Unit();
// check if concept messages is necessary!!!!!!!!

function TxRequest(conceptId, conceptMethod) {
  const TxRequest = new messages.TxRequest();
  const runConceptMethodRequest = new messages.RunConceptMethod();
  runConceptMethodRequest.setId(conceptId);
  runConceptMethodRequest.setConceptmethod(conceptMethod);
  TxRequest.setRunconceptmethod(runConceptMethodRequest);
  return TxRequest;
}

const methods = {
  // Concept
  deleteConcept: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setDelete(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  // Schema concept
  getLabel: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetlabel(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  setLabel: function (conceptId, labelValue) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    const labelMessage = new messages.Label();
    labelMessage.setValue(labelValue);
    conceptMethod.setSetlabel(labelMessage);
    return TxRequest(conceptId, conceptMethod);
  },

  isImplicit: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setIsimplicit(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getSubConcepts: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetsubconcepts(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getSuperConcepts: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetsuperconcepts(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getDirectSuperConcept: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetdirectsuperconcept(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  setDirectSuperConcept: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setSetdirectsuperconcept(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },

  // Rule

  getWhen: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetwhen(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getThen: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetthen(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  // Role
  getRelationshipTypesThatRelateRole: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetrelationshiptypesthatrelaterole(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getTypesThatPlayRole: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGettypesthatplayrole(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  // Type

  getInstances: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetinstances(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getAttributeTypes: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetattributetypes(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  setAttributeType: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setSetattributetype(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },
  unsetAttributeType: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setUnsetattributetype(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },
  getKeyTypes: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetkeytypes(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  setKeyType: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setSetkeytype(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },
  unsetKeyType: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setUnsetkeytype(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },
  isAbstract: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setIsabstract(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  setAbstract: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setSetabstract(); // Pass a bool (probably param of method)
    return TxRequest(conceptId, conceptMethod);
  },
  getRolesPlayedByType: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetrolesplayedbytype(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  setRolePlayedByType: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setSetroleplayedbytype(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },
  unsetRolePlayedByType: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setUnsetroleplayedbytype(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },

  // Entity Type

  addEntity: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setAddentity(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  // Relationship Type

  getRelatedRoles: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetrelatedroles(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  setRelatedRole: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setSetrelatedrole(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },

  unsetRelatedRole: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetrelatedroles(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },

  // Attribute type

  putAttribute: function () {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setPutattribute(); // Pass a AttributeValue
    return TxRequest(conceptId, conceptMethod);
  },
  getAttribute: function () {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetattribute(); // Pass a AttributeValue
    return TxRequest(conceptId, conceptMethod);
  },
  getDataTypeOfType: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetdatatypeoftype(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getDataTypeOfAttriubute: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetdatatypeofattribute(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getRegex: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetregex(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  setRegex: function () {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setSetregex(); // Pass a OptionalRegex
    return TxRequest(conceptId, conceptMethod);
  },

  // Thing 

  isInferred: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setIsinferred(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getDirectType: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetdirecttype(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getRelationships: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetrelationships(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getRelationshipsByRoles: function () {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetrelationshipsbyrole(); // Pass Concepts
    return TxRequest(conceptId, conceptMethod);
  },

  getRolesPlayedByThing: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetrolesplayedbything(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getAttributes: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetattributes(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

  getAttributesByTypes: function () {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetattributesbytypes(); // Pass Concepts
    return TxRequest(conceptId, conceptMethod);
  },
  getKeys: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetkeys(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getKeysByTypes: function () {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetkeysbytypes(); // Pass Concepts
    return TxRequest(conceptId, conceptMethod);
  },
  setAttribute: function () {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setSetattribute(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },
  unsetAttribute: function () {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setUnsetattribute(); // Pass a Concept
    return TxRequest(conceptId, conceptMethod);
  },

  // Relationship

  addRelationship: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setAddrelationship(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getRolePlayers: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetroleplayers(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getRolePlayersByRoles: function () {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetroleplayersbyroles(); // Pass Concepts
    return TxRequest(conceptId, conceptMethod);
  },
  setRolePlayer: function () {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setSetroleplayer(); // Pass a RolePlayer
    return TxRequest(conceptId, conceptMethod);
  },
  unsetRolePlayer: function () {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setUnsetroleplayer(); // Pass a RolePlayer
    return TxRequest(conceptId, conceptMethod);
  },

  //Attribute
  getValue: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetvalue(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },
  getOwners: function (conceptId) {
    const conceptMethod = new conceptMessages.ConceptMethod();
    conceptMethod.setGetowners(UNIT_MESSAGE);
    return TxRequest(conceptId, conceptMethod);
  },

};

module.exports = methods;