"use strict";const messages=require("../../autogenerated/grakn_pb");function DeleteService(a){this.stub=a}DeleteService.prototype.delete=function(a){const b=new messages.Open,c=new messages.DeleteRequest,d=new messages.Keyspace;return d.setValue(a),b.setKeyspace(d),b.setTxtype(messages.TxType.WRITE),c.setOpen(b),new Promise((a,b)=>{this.stub.delete(c,c=>{c?b(c):a()})})},module.exports=DeleteService;