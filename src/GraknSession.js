const GraknTx = require("./GraknTx");
const messages = require("./autogenerated/grakn_pb");
const services = require("./autogenerated/grakn_grpc_pb");
const grpc = require("grpc");
const GraknGrpcService = require("./GraknGrpcService");

function GraknSession(uri, keyspace, credentials) {
  this.keyspace = keyspace;
  this.credentials = credentials;
  this.stub = new services.GraknClient(uri, grpc.credentials.createInsecure());
}

/**
 * Create new GraknTx and send Open request to make it ready to be used.
 * @param {*} txType Type of transaction to open
 * @returns GraknTx
 */

GraknSession.prototype.open = async function (txType) {
  const graknGrpcService = new GraknGrpcService(this.stub.tx());
  await graknGrpcService.openTx(this.keyspace, txType, this.credentials);
  const tx = new GraknTx(graknGrpcService);
  return tx;
}

GraknSession.prototype.deleteKeyspace = function () {
  const openRequest = new messages.Open();
  const deleteRequest = new messages.DeleteRequest();
  const messageKeyspace = new messages.Keyspace();
  messageKeyspace.setValue(this.keyspace);
  openRequest.setKeyspace(messageKeyspace);
  openRequest.setTxtype(messages.TxType.WRITE);
  deleteRequest.setOpen(openRequest);
  return new Promise((resolve, reject) => {
    this.stub.delete(deleteRequest, (err) => {
      if (err) reject(err);
      else resolve();
    });
  })
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
  grpc.closeClient(this.stub);
}

module.exports = GraknSession;
