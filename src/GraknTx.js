
function GraknTx(txService) {
    this.txService = txService;
}

GraknTx.prototype.execute = async function executeQuery(query) {
    return await this.txService.execute(query);
};

GraknTx.prototype.commit = async function () {
    return this.txService.commit();
}
GraknTx.prototype.getConcept = async function (conceptId) {
    return this.txService.getConcept(conceptId);
}
GraknTx.prototype.getSchemaConcept = async function (label) {
    return this.txService.getSchemaConcept(label);
}
GraknTx.prototype.getAttributesByValue = async function (attributeValue) {
    return this.txService.getAttributesByValue(attributeValue);
}
GraknTx.prototype.putEntityType = async function (label) {
    return this.txService.putEntityType(label);
}
GraknTx.prototype.putRelationshipType = async function (label) {
    return this.txService.putRelationshipType(label);
}
GraknTx.prototype.putAttributeType = async function (attributeType) {
    return this.txService.putAttributeType(attributeType);
}
GraknTx.prototype.putRole = async function (label) {
    return this.txService.putRole(label);
}
GraknTx.prototype.putRule = async function (rule) {
    return this.txService.putRule(rule);
}

module.exports = GraknTx;