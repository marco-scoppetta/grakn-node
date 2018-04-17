const MethodBuilder = require("../MethodBuilder");

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
  getMethods: function(baseType) {
    return methods(baseType);
  }
};
