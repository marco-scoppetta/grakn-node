
const methods = {
  getLabel: function () { return this.txService.getLabel(this.id); },
  setLabel: function (label) { return this.txService.setLabel(this.id, label); },
  isImplicit: function () { return this.txService.isImplicit(this.id); },
  getSubConcepts: function () { return this.txService.getSubConcepts(this.id); },
  getSuperConcepts: function () { return this.txService.getSuperConcepts(this.id); },
  getDirectSuperConcept: function () { return this.txService.getDirectSuperConcept(this.id); },
  setDirectSuperConcept: function () { return this.txService.setDirectSuperConcept(this.id); }
};

module.exports = {
  get: function () {
    return methods;
  }
};
