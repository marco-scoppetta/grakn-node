
const methods = {
  isEntity: () => true,
  isRelationship: () => false,
  isAttribute: () => false
};

module.exports = {
  get: function () {
    return methods;
  }
};
