const MethodBuilder = require("../util/MethodBuilder");
const GrpcIterator = require("../util/GrpcIterator");

const methods = {
  getRelatedRoles: function() {
    const getRelatedRolesMethod = MethodBuilder.getRelatedRoles(this.id);
    return this.communicator.send(getRelatedRolesMethod).then(async result => {
      const iterator = new GrpcIterator.GrpcConceptIterator(
        result.getConceptresponse().getIteratorid(),
        this.communicator
      );
      const role = await iterator.nextResult();
      return result;
    });
  },
  setRelatedRole: function() {},
  unsetRelatedRole: function() {}
};

module.exports = {
  get: function() {
    return methods;
  }
};
