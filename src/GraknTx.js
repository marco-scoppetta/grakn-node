const GrpcCommunicator = require("./util/GrpcCommunicator");
const ConceptFactory = require("./ConceptFactory");
const TxService = require("./TxService");

function GraknTx(client, keyspace, credentials) {
    this.client = client;
    this.txService = null;
    this._isOpen = false;
    this.credentials = credentials;
    this.keyspace = keyspace;
}

GraknTx.prototype.execute = async function executeQuery(query) {
    return await this.txService.execute(query);
};

GraknTx.prototype.open = async function (txType) {
    if (this._isOpen) throw "Transaction is already open.";
    if (!this.txService) {
        const communicator = new GrpcCommunicator(this.client.tx());
        const conceptFactory = new ConceptFactory(this.communicator);
        this.txService = new TxService(communicator, conceptFactory);
    }
    await this.txService.openTx(this.keyspace, txType, this.credentials)
        .then(() => { this._isOpen = true; })
        .catch((e) => {
            throw e;
        });
};

GraknTx.prototype.commit = async function () {
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

GraknTx.prototype.isOpen = function () { return this._isOpen; }



module.exports = GraknTx;