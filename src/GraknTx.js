
function GraknTx(graknGrpcService) {
    this.graknGrpcService = graknGrpcService;
}

GraknTx.prototype.execute = function executeQuery(query) {
    return this.graknGrpcService.execute(query);
};

GraknTx.prototype.commit = async function () {
    await this.graknGrpcService.commit();
    return this.close();
}
GraknTx.prototype.getConcept = function (conceptId) {
    return this.graknGrpcService.getConcept(conceptId);
}
GraknTx.prototype.getSchemaConcept = function (label) {
    return this.graknGrpcService.getSchemaConcept(label);
}
GraknTx.prototype.getAttributesByValue = function (attributeValue, dataType) {
    return this.graknGrpcService.getAttributesByValue(attributeValue, dataType);
}
GraknTx.prototype.putEntityType = function (label) {
    return this.graknGrpcService.putEntityType(label);
}
GraknTx.prototype.putRelationshipType = function (label) {
    return this.graknGrpcService.putRelationshipType(label);
}
GraknTx.prototype.putAttributeType = function (value, dataType) {
    return this.graknGrpcService.putAttributeType(value, dataType);
}
GraknTx.prototype.putRole = function (label) {
    return this.graknGrpcService.putRole(label);
}
GraknTx.prototype.putRule = function (rule) {
    return this.graknGrpcService.putRule(rule);
}
GraknTx.prototype.close = function () {
    return this.graknGrpcService.close();
}

module.exports = GraknTx;