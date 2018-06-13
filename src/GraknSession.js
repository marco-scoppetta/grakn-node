const GraknTx = require("./GraknTx");
const messages = require("./autogenerated/grakn_pb");
const services = require("./autogenerated/grakn_grpc_pb");
const grpc = require("grpc");
const TxService = require("./TxService");

function GraknSession(uri, keyspace, credentials) {
  this.keyspace = keyspace;
  this.credentials = credentials;
  this.stub = new services.GraknClient(
    uri,
    grpc.credentials.createInsecure()
  );
}

/**
 * Create new GraknTx and send Open request to make it ready to be used.
 * @param {*} txType Type of transaction to open
 * @returns GraknTx
 */

GraknSession.prototype.open = async function (txType) {
  const txService = new TxService(this.stub);
  // These initialisations are here to avoid asynchronous calls inside GraknTx constructor.
  await txService.openTx(this.keyspace, txType, this.credentials);
  const tx = new GraknTx(txService);
  return tx;
}

GraknSession.prototype.txType = {
  READ: messages.TxType.READ,
  WRITE: messages.TxType.WRITE,
  BATCH: messages.TxType.BATCH
};

GraknSession.prototype.dataType = {
  STRING: messages.DataType.STRING,
  BOOLEAN: messages.DataType.BOOLEAN,
  INTEGER: messages.DataType.INTEGER,
  LONG: messages.DataType.LONG,
  FLOAT: messages.DataType.FLOAT,
  DOUBLE: messages.DataType.DOUBLE,
  DATE: messages.DataType.DATE
};

GraknSession.prototype.close = function close() {
  this.stub.close();
}

module.exports = GraknSession;