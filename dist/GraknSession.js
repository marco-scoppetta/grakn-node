"use strict";function _asyncToGenerator(a){return function(){var b=a.apply(this,arguments);return new Promise(function(a,c){function d(e,f){try{var g=b[e](f),h=g.value}catch(a){return void c(a)}return g.done?void a(h):Promise.resolve(h).then(function(a){d("next",a)},function(a){d("throw",a)})}return d("next")})}}const grpc=require("grpc"),GraknTx=require("./GraknTx"),services=require("./autogenerated/grakn_grpc_pb"),TxService=require("./service/Tx/TxService"),DeleteService=require("./service/Delete/DeleteService");function GraknSession(a,b,c){this.keyspace=b,this.credentials=c,this.stub=new services.GraknClient(a,grpc.credentials.createInsecure()),this.deleteService=new DeleteService(this.stub)}GraknSession.prototype.transaction=(()=>{var a=_asyncToGenerator(function*(a){const b=new TxService(this.stub.tx());yield b.openTx(this.keyspace,a,this.credentials).catch(function(a){throw a});const c=new GraknTx(b);return c});return function(){return a.apply(this,arguments)}})(),GraknSession.prototype.deleteKeyspace=function(){return this.deleteService.delete(this.keyspace)},GraknSession.prototype.close=function(){grpc.closeClient(this.stub)},module.exports=GraknSession;