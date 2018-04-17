const MethodBuilder = require("../util/MethodBuilder");

const methods = function(baseType) {
  return {
    delete: function() {
      const deleteMethod = MethodBuilder.delete(this.id);
      return this.communicator.send(deleteMethod);
    },
    getBaseType: function() {
      return baseType;
    }
  };
};

module.exports = {
  get: function(baseType) {
    return methods(baseType);
  }
};
