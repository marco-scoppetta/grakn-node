
const methods = {
  putAttribute: function () { return this.txService.putAttribute(this.id); },
  getAttributes: function () { return this.txService.getAttributes(this.id); },
  getDataTypeOfType: function () { return this.txService.getDataTypeOfType(this.id); },
  getDataTypeOfAttribute: function () { return this.txService.getDataTypeOfAttribute(this.id); },
  getRegex: function () { return this.txService.getRegex(this.id); },
  setRegex: function () { return this.txService.setRegex(this.id); }
};

module.exports = {
  get: function () {
    return methods;
  }
};
