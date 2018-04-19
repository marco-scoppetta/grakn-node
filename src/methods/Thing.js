const MethodBuilder = require("../util/MethodBuilder");
const GrpcIterator = require("../util/GrpcIterator");

const methods = {
  isInferred: function () {
    const isInferredMethod = MethodBuilder.isInferred(this.id);
    return this.communicator.send(isInferredMethod)
      .then(resp => resp.getConceptresponse().getBool())
      .catch(e => { throw e; });
  },
  getDirectType: function () { },
  getRelationships: function () {
    const getRelationshipsMethod = MethodBuilder.getRelationships(this.id);
    return _executeAndParse(this.communicator, this.conceptFactory, getRelationshipsMethod);
  },
  getRelationshipsByRole: function () { },
  getRolesPlayedByThing: function () {
    const getRolesPlayedByThingMethod = MethodBuilder.getRolesPlayedByThing(this.id);
    return _executeAndParse(this.communicator, this.conceptFactory, getRolesPlayedByThingMethod);
  },
  getAttributes: function () { },
  getAttributesByTypes: function () { },
  getKeys: function () { },
  getKeysByTypes: function () { },
  setAttribute: function () { },
  unsetAttribute: function () { }
};

// Create module that contains both communicator and concept factory

//This method should be move to an Helper class!
function _executeAndParse(communicator, conceptFactory, method) {
  return communicator
    .send(method)
    .then(async result => {
      const iterator = new GrpcIterator.GrpcConceptIterator(
        result.getConceptresponse().getIteratorid(),
        communicator
      );
      return await _buildConcepts(iterator, communicator, conceptFactory);
    });
}

async function _buildConcepts(iterator, communicator, factory) {
  const concepts = [];
  let concept = await iterator.nextResult().catch(e => { throw e; });
  while (concept) {
    concepts.push(factory.createConcept(concept, communicator, factory));
    concept = await iterator.nextResult().catch(e => { throw e; });
  }
  return concepts;
}

module.exports = {
  get: function () {
    return methods;
  }
};
