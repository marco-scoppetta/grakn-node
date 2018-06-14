
function GraknTx(graknGrpcService) {
    this.graknGrpcService = graknGrpcService;
}

GraknTx.prototype.execute = function executeQuery(query) {
    return this.graknGrpcService.execute(query);
};

GraknTx.prototype.commit = function () {
    return this.graknGrpcService.commit();
}
GraknTx.prototype.getConcept = function (conceptId) {
    return this.graknGrpcService.getConcept(conceptId);
}
GraknTx.prototype.getSchemaConcept = function (label) {
    return this.graknGrpcService.getSchemaConcept(label);
}
GraknTx.prototype.getAttributesByValue = function (attributeValue) {
    return this.graknGrpcService.getAttributesByValue(attributeValue);
}
GraknTx.prototype.putEntityType = function (label) {
    return this.graknGrpcService.putEntityType(label);
}
GraknTx.prototype.putRelationshipType = function (label) {
    return this.graknGrpcService.putRelationshipType(label);
}
GraknTx.prototype.putAttributeType = function (value, type) {
    return this.graknGrpcService.putAttributeType(value, type);
}
GraknTx.prototype.putRole = function (label) {
    return this.graknGrpcService.putRole(label);
}
GraknTx.prototype.putRule = function (rule) {
    return this.graknGrpcService.putRule(rule);
}

module.exports = GraknTx;