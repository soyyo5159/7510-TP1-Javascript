var assert = require("chai").assert;
var should = require('should');

var Parser = require('./parser');

describe("parser functionality",function(){
    it("nothing is recognized",function(){
        function CantRecognize(v){
            this.badValue=v
        }
        CantRecognize.prototype=Object.create(Parser.prototype);
        CantRecognize.prototype.recognizes=function(){
            return false;
        }
        CantRecognize.prototype.cantRecognize=function(){
            return this.badValue;
        }
        assert.equal((new CantRecognize(7)).parse({asd:89}),7);
        assert.equal((new CantRecognize(49)).parse("50"),49);
    })

    describe("an array parser",function(){
        function ArrayParser(v){
            this.badValue=v;
        }
        ArrayParser.prototype=Object.create(Parser.prototype);
        ArrayParser.prototype.recognizes=(x)=> x instanceof Array;
        ArrayParser.prototype.cantRecognize=function(){return this.badValue};
        ArrayParser.prototype.separate=(arr)=>arr;
        ArrayParser.prototype.build=(v)=>v;
        ArrayParser.prototype.parseParts=(x)=>(new String(x)).valueOf();

        it("negate things that aren't arrays",function(){
            assert.equal((new ArrayParser(7)).parse({asd:89}),7);
            assert.equal((new ArrayParser(49)).parse("50"),49);
            assert.equal((new ArrayParser(49)).parse(50),49);
        })

        it("Transform Arrays to Arrays of strings",function(){
            assert.sameOrderedMembers((new ArrayParser(7)).parse([1,2,3,4,5]),["1","2","3","4","5"]);
        })
    })
})