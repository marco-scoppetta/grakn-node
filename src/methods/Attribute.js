
const methods = {
  getValue: function () { return this.txService.getValue(this.id); },
  getOwners: function () { return this.txService.getOwners(this.id); },
  isEntity: () => false,
  isRelationship: () => false,
  isAttribute: () => true
};

module.exports = {
  get: function () {
    return methods;
  }
};
