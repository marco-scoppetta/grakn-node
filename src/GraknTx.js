
function GraknTx(txService) {
    this.txService = txService;
}

GraknTx.prototype.execute = async function executeQuery(query) {
    return await this.txService.execute(query);
};

GraknTx.prototype.commit = async function () {
    return this.txService.commit();
}
GraknTx.prototype.getConcept = async function () {
}
GraknTx.prototype.getSchemaConcept = async function () {
}
GraknTx.prototype.getAttributesByValue = async function () {
}
GraknTx.prototype.putEntityType = async function () {
}
GraknTx.prototype.putRelationshipType = async function () {
}
GraknTx.prototype.putAttributeType = async function () {
}
GraknTx.prototype.putRole = async function () {
}
GraknTx.prototype.putRule = async function () {
}

module.exports = GraknTx;