var assert = require("chai").assert;
var should = require('should');
var ChainableParser = require('./chainableParser');

describe("ChainableParser can be chained",function(){
    function ArrayParser(){};
    ArrayParser.prototype=Object.create(ChainableParser.prototype);
    ArrayParser.prototype.recognizes=(x)=>x instanceof Array;
    ArrayParser.prototype.separate=(x)=>x;
    ArrayParser.prototype.build=(x)=>x;
    ArrayParser.prototype.nextParser={
        parse:(str)=>str.split(",")
    }
    ArrayParser.prototype.generalParser={
        parse:(str)=>[str]
    }

    it("generalParser used",function(){
        assert.sameDeepOrderedMembers((new ArrayParser()).parse([1,2,3]),[[1],[2],[3]]);
    })
    it("nextParser used",function(){
        assert.sameOrderedMembers((new ArrayParser()).parse("1,2,3"),["1","2","3"]);
    })


})