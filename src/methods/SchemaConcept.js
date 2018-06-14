
const methods = {
  getLabel: function () { return this.graknGrpcService.getLabel(this.id); },
  setLabel: function (label) { return this.graknGrpcService.setLabel(this.id, label); },
  isImplicit: function () { return this.graknGrpcService.isImplicit(this.id); },
  subs: function () { return this.graknGrpcService.getSubConcepts(this.id); },
  sups: function () { return this.graknGrpcService.getSuperConcepts(this.id); },
  sup: function (type) {
    if (type) {
      return this.graknGrpcService.setDirectSuperConcept(this.id, type);
    } else {
      return this.graknGrpcService.getDirectSuperConcept(this.id);
    }
  }
};

module.exports = {
  get: function () {
    return methods;
  }
};
