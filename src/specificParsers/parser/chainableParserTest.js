var assert = require("chai").assert;
var should = require('should');
var ChainableParser = require('./chainableParser');

describe("ChainableParser can be chained",function(){
    function ArrayParser(){};
    ArrayParser.prototype=Object.create(ChainableParser.prototype);
    ArrayParser.prototype.recognizes=(x)=>/\./.test(x);
    ArrayParser.prototype.separate=(x)=>x.split(".");
    ArrayParser.prototype.build=(x)=>x;
    ArrayParser.prototype.nextParser={
        parse:(str)=>str.split(",")
    }
    ArrayParser.prototype.cantRecognize=()=>"NOPE";



    it("nextParser used",function(){
        assert.deepEqual((new ArrayParser()).parse("1,2,3.a,b,c"),[["1","2","3"],["a","b","c"]]);
    })
    it("can't parse",function(){
        assert.deepEqual((new ArrayParser()).parse("1,2,3"),"NOPE");
    })


})