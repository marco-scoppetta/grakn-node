"use strict";const GraknSession=require("./GraknSession"),messages=require("./autogenerated/grakn_pb");module.exports={session:(a,b,c)=>new GraknSession(a,b,c)},module.exports.dataType={STRING:messages.DataType.STRING,BOOLEAN:messages.DataType.BOOLEAN,INTEGER:messages.DataType.INTEGER,LONG:messages.DataType.LONG,FLOAT:messages.DataType.FLOAT,DOUBLE:messages.DataType.DOUBLE,DATE:messages.DataType.DATE},module.exports.txType={READ:messages.TxType.READ,WRITE:messages.TxType.WRITE,BATCH:messages.TxType.BATCH};