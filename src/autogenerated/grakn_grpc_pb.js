// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var grakn_pb = require('./grakn_pb.js');
var concept_pb = require('./concept_pb.js');
var iterator_pb = require('./iterator_pb.js');

function serialize_ai_grakn_rpc_generated_DeleteRequest(arg) {
  if (!(arg instanceof grakn_pb.DeleteRequest)) {
    throw new Error('Expected argument of type ai.grakn.rpc.generated.DeleteRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_ai_grakn_rpc_generated_DeleteRequest(buffer_arg) {
  return grakn_pb.DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ai_grakn_rpc_generated_DeleteResponse(arg) {
  if (!(arg instanceof grakn_pb.DeleteResponse)) {
    throw new Error('Expected argument of type ai.grakn.rpc.generated.DeleteResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_ai_grakn_rpc_generated_DeleteResponse(buffer_arg) {
  return grakn_pb.DeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ai_grakn_rpc_generated_TxRequest(arg) {
  if (!(arg instanceof grakn_pb.TxRequest)) {
    throw new Error('Expected argument of type ai.grakn.rpc.generated.TxRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_ai_grakn_rpc_generated_TxRequest(buffer_arg) {
  return grakn_pb.TxRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ai_grakn_rpc_generated_TxResponse(arg) {
  if (!(arg instanceof grakn_pb.TxResponse)) {
    throw new Error('Expected argument of type ai.grakn.rpc.generated.TxResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_ai_grakn_rpc_generated_TxResponse(buffer_arg) {
  return grakn_pb.TxResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GraknService = exports.GraknService = {
  //
  // Represents a full transaction. The stream of `TxRequest`s must begin with a `Open` message.
  // When the call is completed, the transaction will always be closed, with or without a `Commit` message.
  tx: {
    path: '/ai.grakn.rpc.generated.Grakn/Tx',
    requestStream: true,
    responseStream: true,
    requestType: grakn_pb.TxRequest,
    responseType: grakn_pb.TxResponse,
    requestSerialize: serialize_ai_grakn_rpc_generated_TxRequest,
    requestDeserialize: deserialize_ai_grakn_rpc_generated_TxRequest,
    responseSerialize: serialize_ai_grakn_rpc_generated_TxResponse,
    responseDeserialize: deserialize_ai_grakn_rpc_generated_TxResponse,
  },
  //
  // Delete a keyspace.
  delete: {
    path: '/ai.grakn.rpc.generated.Grakn/Delete',
    requestStream: false,
    responseStream: false,
    requestType: grakn_pb.DeleteRequest,
    responseType: grakn_pb.DeleteResponse,
    requestSerialize: serialize_ai_grakn_rpc_generated_DeleteRequest,
    requestDeserialize: deserialize_ai_grakn_rpc_generated_DeleteRequest,
    responseSerialize: serialize_ai_grakn_rpc_generated_DeleteResponse,
    responseDeserialize: deserialize_ai_grakn_rpc_generated_DeleteResponse,
  },
};

exports.GraknClient = grpc.makeGenericClientConstructor(GraknService);
